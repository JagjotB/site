type ArchiveLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function ArchiveLabel({ children, className = "" }: ArchiveLabelProps) {
  return <p className={`archive-label ${className}`}>{children}</p>;
}
