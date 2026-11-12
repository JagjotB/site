"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Bookmark, Copy, Headphones, Pause, Play, RotateCcw, Share2, Volume2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { experience } from "@/content/experience";
import { formatTime } from "@/lib/media";

type VoiceExperienceProps = {
  recording?: string;
  transcript?: string;
  waveform?: readonly number[];
  developmentFixture?: string;
};

type SaveStatus = "idle" | "shared" | "copied" | "failed";

const decorativeWave = [18, 26, 13, 38, 22, 48, 31, 61, 27, 43, 72, 36, 55, 30, 66, 42, 78, 50, 35, 64, 29, 52, 24, 43, 19, 34, 16, 27, 13];

function Waveform({ values = decorativeWave, active = 0 }: { values?: readonly number[]; active?: number }) {
  return (
    <div className="voice-waveform" aria-hidden="true">
      {values.map((height, index) => (
        <span key={`${height}-${index}`} className={index / values.length <= active ? "is-active" : ""} style={{ height: `${Math.max(8, Math.min(100, height))}%` }} />
      ))}
    </div>
  );
}

function AudioPlayer({ source, transcript, waveform, onClose }: VoiceExperienceProps & { source: string; onClose: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  function setupAudioGraph() {
    const audio = audioRef.current;
    if (!audio || contextRef.current) return;
    const context = new AudioContext();
    const analyser = context.createAnalyser();
    analyser.fftSize = 256;
    const sourceNode = context.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    analyser.connect(context.destination);
    contextRef.current = context;
    analyserRef.current = analyser;
  }

  function drawLiveWaveform() {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const drawing = canvas.getContext("2d");
    if (!drawing) return;
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
      canvas.width = width * ratio;
      canvas.height = height * ratio;
    }
    drawing.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawing.clearRect(0, 0, width, height);
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(data);
    const bars = 58;
    const gap = 3;
    const barWidth = Math.max(1, (width - gap * (bars - 1)) / bars);
    for (let index = 0; index < bars; index += 1) {
      const sample = data[Math.floor((index / bars) * data.length)] / 128 - 1;
      const amplitude = Math.max(3, Math.abs(sample) * height * 1.6);
      drawing.fillStyle = index / bars <= current / Math.max(duration, 1) ? "#C8AB7A" : "rgba(200,171,122,.22)";
      drawing.fillRect(index * (barWidth + gap), height / 2 - amplitude / 2, barWidth, amplitude);
    }
    if (playing) animationRef.current = requestAnimationFrame(drawLiveWaveform);
  }

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    setupAudioGraph();
    if (audio.paused) {
      await contextRef.current?.resume();
      await audio.play();
    } else {
      audio.pause();
    }
  }

  useEffect(() => {
    if (playing) drawLiveWaveform();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // The drawing loop intentionally follows live media state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, current, duration]);

  useEffect(() => () => void contextRef.current?.close(), []);

  return (
    <motion.section className="voice-listening" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} aria-label="Private recording player">
      <button className="voice-listening__back" type="button" onClick={onClose}><ArrowLeft aria-hidden="true" /> Keep for later</button>
      <span className="voice-listening__label"><Volume2 aria-hidden="true" /> A recording from me</span>
      <h1>{experience.voice.title}</h1>
      <h2>Press play when it’s quiet.</h2>
      <audio
        ref={audioRef}
        src={source}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      <div className="audio-player__visual">
        {waveform && !playing ? <Waveform values={waveform} active={duration ? current / duration : 0} /> : <canvas ref={canvasRef} aria-label="Live audio waveform" />}
      </div>
      {failed ? (
        <p className="voice-listening__error" role="status">The recording could not be loaded. Try this page again when you have a stronger connection.</p>
      ) : (
        <>
          <div className="audio-player__timeline">
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.01"
              value={current}
              aria-label="Recording progress"
              onChange={(event) => {
                const next = Number(event.target.value);
                if (audioRef.current) audioRef.current.currentTime = next;
                setCurrent(next);
              }}
              style={{ "--audio-progress": `${duration ? (current / duration) * 100 : 0}%` } as React.CSSProperties}
            />
            <span>{formatTime(current)} / {formatTime(duration)}</span>
          </div>
          <div className="audio-player__controls">
            <button type="button" className="audio-play" onClick={togglePlayback} aria-label={playing ? "Pause recording" : "Play recording"}>
              {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>
            <div><span>{playing ? "Playing" : current > 0 ? "Paused" : "Ready"}</span><p>In my own words.</p></div>
            <button type="button" className="audio-replay" onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0; setCurrent(0); }} aria-label="Replay from the beginning"><RotateCcw aria-hidden="true" /></button>
          </div>
        </>
      )}
      {transcript ? (
        <div className="audio-transcript">
          <button type="button" onClick={() => setShowTranscript((value) => !value)}>{experience.voice.transcriptLabel}</button>
          {showTranscript ? <p>{transcript}</p> : null}
        </div>
      ) : null}
    </motion.section>
  );
}

export function VoiceExperience({ recording, transcript, waveform, developmentFixture }: VoiceExperienceProps) {
  const [effectiveRecording, setEffectiveRecording] = useState(recording);
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (recording || !developmentFixture) return;
    if (new URLSearchParams(window.location.search).get("audioFixture") !== "1") return;
    const timer = window.setTimeout(() => setEffectiveRecording(developmentFixture), 0);
    return () => window.clearTimeout(timer);
  }, [developmentFixture, recording]);

  async function copyLink() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const field = document.createElement("textarea");
        field.value = window.location.href;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("Copy command was rejected");
      }
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  async function keepMessage() {
    setStatus("idle");
    if (!navigator.share) {
      await copyLink();
      return;
    }
    try {
      await navigator.share({ title: "The Art of Us · My Voice", text: "A private recording for a quieter moment.", url: window.location.href });
      setStatus("shared");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await copyLink();
    }
  }

  return (
    <AnimatePresence mode="wait">
      {listening && effectiveRecording ? (
        <AudioPlayer key="player" source={effectiveRecording} transcript={transcript} waveform={waveform} onClose={() => setListening(false)} />
      ) : (
        <motion.section key="invitation" className="voice-keepsake" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: reduceMotion ? 0 : 0.6 }} aria-label="A private message to keep">
          <div className="voice-keepsake__plate">
            <header className="voice-keepsake__identity">
              <span>The sound-wave plaque</span>
              <h1>{experience.voice.title}</h1>
              <p>{experience.voice.heading}</p>
            </header>
            <Waveform />
            <strong>For a quieter moment.</strong>
          </div>
          <div className="voice-keepsake__copy">
            <p>{experience.voice.lead}</p>
            <span>{experience.voice.body}</span>
          </div>
          <div className="voice-keepsake__actions">
            <button type="button" className="voice-save" onClick={keepMessage}><Bookmark aria-hidden="true" />{experience.voice.saveAction}</button>
            <button type="button" className="voice-copy" onClick={copyLink}><Copy aria-hidden="true" />{experience.voice.copyAction}</button>
          </div>
          <p className={`voice-save-status voice-save-status--${status}`} aria-live="polite">
            {status === "shared" ? experience.voice.savedFeedback : status === "copied" ? experience.voice.copiedFeedback : status === "failed" ? experience.voice.copyFailure : "Save it to Notes, Messages, or your bookmarks."}
          </p>
          {effectiveRecording ? (
            <button type="button" className="voice-listen" onClick={() => setListening(true)}><Headphones aria-hidden="true" />{experience.voice.listenAction}</button>
          ) : (
            <p className="voice-unavailable">{experience.voice.unavailable}</p>
          )}
          <Link href="/collection" className="voice-return"><ArrowLeft aria-hidden="true" />{experience.voice.returnAction}</Link>
          <span className="voice-share-meaning"><Share2 aria-hidden="true" /> This saves the page link. The audio stays online.</span>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
