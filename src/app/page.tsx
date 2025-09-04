// src/app/page.tsx
import AppClient from "./AppClient";

export const metadata = {
  title: "AI Talent Shortlisting Demo",
  description:
    "An interactive demo showing how AI can help recruiters shortlist candidates faster. Built for Owow Talents.",
};

export default function Page() {
  return <AppClient />;
}

