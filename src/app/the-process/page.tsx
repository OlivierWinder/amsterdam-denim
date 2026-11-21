import type { Metadata } from "next";
import { ProcessSlides } from "@/components/process-slides";

export const metadata: Metadata = {
  title: "The process",
  description:
    "Consultation, pattern, fittings, cutting, and finishing — one pair at a time in Amsterdam.",
};

export default function TheProcessPage() {
  return <ProcessSlides />;
}
