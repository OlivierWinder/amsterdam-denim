import type { Metadata } from "next";
import { StyleSlides } from "@/components/style-slides";

export const metadata: Metadata = {
  title: "Style",
  description:
    "Cuts, fit, features and fabric for a bespoke pair, made in Amsterdam.",
};

export default function StylesPage() {
  return <StyleSlides />;
}
