import { withBase } from "@/lib/base-path";

export type CatalogView = {
  src: string;
  alt: string;
};

export type CatalogStill = {
  src: string;
  alt: string;
  live?: boolean;
  views?: CatalogView[];
  copy?: string;
};

export const catalogStills: CatalogStill[] = [
  {
    src: withBase("/catalog/front.jpg"),
    alt: "Dark denim, front view, black leather jacket against a brick wall",
    live: true,
    copy: "Luca wears the Camaro 14oz denim with an exposed button fly and flap back pockets. Luca requested that his jean fitted snug but comfortable around the seat and hips, with a medium rise and a relaxed shape throughout the leg. Luca prefers to wear his jeans with stacking.",
    views: [
      {
        src: withBase("/catalog/front.jpg"),
        alt: "Dark denim, front view, black leather jacket against a brick wall",
      },
      {
        src: withBase("/catalog/side.jpg"),
        alt: "Dark denim, side view, black leather jacket against a brick wall",
      },
      {
        src: withBase("/catalog/back.jpg"),
        alt: "Dark denim, back view, black leather jacket against a brick wall",
      },
    ],
  },
  { src: withBase("/catalog/catalog-01.jpg"), alt: "Front pocket and fly of a dark indigo pair" },
  { src: withBase("/catalog/catalog-02.jpg"), alt: "Close weave of selvedge denim" },
  { src: withBase("/catalog/catalog-03.jpg"), alt: "Brass donut buttons on a button fly" },
  { src: withBase("/catalog/catalog-04.jpg"), alt: "Back pocket on a dark pair" },
  { src: withBase("/catalog/catalog-05.jpg"), alt: "Open fly showing the pocket bag" },
  { src: withBase("/catalog/catalog-06.jpg"), alt: "Selvedge cuff at the hem" },
  { src: withBase("/catalog/catalog-07.jpg"), alt: "Seat and back pockets" },
  { src: withBase("/catalog/catalog-08.jpg"), alt: "Waistband and belt loops" },
  { src: withBase("/catalog/catalog-09.jpg"), alt: "Inseam and topstitching" },
  { src: withBase("/catalog/catalog-10.jpg"), alt: "Copper button fly" },
  { src: withBase("/catalog/catalog-11.jpg"), alt: "Side seam and pocket bag" },
  { src: withBase("/catalog/catalog-12.jpg"), alt: "Hem and chainstitch" },
  { src: withBase("/catalog/catalog-13.jpg"), alt: "Yoke and back rise" },
  { src: withBase("/catalog/catalog-14.jpg"), alt: "Coin pocket" },
  { src: withBase("/catalog/catalog-15.jpg"), alt: "Selvedge outseam" },
  { src: withBase("/catalog/catalog-16.jpg"), alt: "Finished pair, folded" },
];
