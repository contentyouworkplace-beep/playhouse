import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Playhouse Nursery | Abu Dhabi & Dubai",
  description:
    "Contact Playhouse Nursery to book a visit, ask admissions questions, or connect with our Khalidiya, Al Reem, and Mirdif branches.",
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
