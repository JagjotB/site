import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type CollectionNavigationProps = {
  label?: string;
};

export function CollectionNavigation({
  label = "Collection",
}: CollectionNavigationProps) {
  return (
    <nav className="collection-nav" aria-label="Collection navigation">
      <Link href="/collection" className="collection-nav__back">
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
        <span>{label}</span>
      </Link>
    </nav>
  );
}
