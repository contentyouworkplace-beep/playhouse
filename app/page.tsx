import { getContent } from "@/lib/data/store";
import HomeClient from "./HomeClient";

export const revalidate = 0; // Ensure fresh updates immediately

export default function Page() {
  const content = getContent();
  return <HomeClient content={content} />;
}
