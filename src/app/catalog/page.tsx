import type { Metadata } from "next";
import { CatalogGrid } from "@/components/catalog-grid";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Still photographs of the work.",
};

export default function CatalogPage() {
  return <CatalogGrid />;
}
