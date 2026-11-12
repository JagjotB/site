import type { ElementType, ReactNode } from "react";

type EditorialHeadingProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function EditorialHeading({
  as: Tag = "h1",
  children,
  className = "",
}: EditorialHeadingProps) {
  return <Tag className={`editorial-heading ${className}`}>{children}</Tag>;
}
