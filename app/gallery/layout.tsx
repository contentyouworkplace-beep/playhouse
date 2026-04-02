import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gallery | Hadeed Transport UAE",
  description:
    "Browse the Hadeed Transport gallery — our equipment, vehicles, facilities, and operations across the UAE.",
  path: "/gallery",
  keywords: ["Hadeed Transport gallery", "logistics photos UAE", "transport equipment photos"],
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
