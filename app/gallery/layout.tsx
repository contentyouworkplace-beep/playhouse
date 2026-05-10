import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gallery | Playhouse Nursery UAE",
  description:
    "Browse the Playhouse Nursery gallery — our classrooms, play areas, events, and happy children across all UAE branches.",
  path: "/gallery",
  keywords: ["Playhouse Nursery gallery", "nursery photos UAE", "nursery classroom photos"],
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
