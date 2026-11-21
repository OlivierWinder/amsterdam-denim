import { withBase } from "@/lib/base-path";

export type StyleStill = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type StyleSlide = {
  id: string;
  heading: string;
  kicker?: string;
  paragraphs: string[];
  list?: string[];
  closer?: string;
  stills: StyleStill[];
};

const catalog = (
  file: string,
  caption: string,
  alt = caption
): StyleStill => ({
  src: withBase(`/catalog/${file}`),
  alt,
  caption,
  width: 1080,
  height: 1350,
});

export const bespokeParagraphs = [
  "I make bespoke jeans from Japanese selvedge denim. Bespoke meaning that a pair is made for one person, from a pattern where every line drawn comes from a direct measurement of your body.",
  "This style guide is meant to serve as the backbone of what I offer. I am not limited to specific styles. Any request of cut, fit and detail can be fulfilled, and I will cater to.",
  "For an overview of all standard construction details, see overview.",
];

export const bespokeJumps = [
  { href: "#cuts", label: "Cuts" },
  { href: "#the-rise", label: "Fit and Shape" },
  { href: "#button-fly", label: "Features" },
  { href: "#standard-jeans", label: "Standard Jeans" },
] as const;

export const styleSlides: StyleSlide[] = [
  {
    id: "cuts",
    heading: "Cuts",
    paragraphs: [
      "I roughly distinguish between four cuts: bootcut, straight, slim straight and wide. The main difference between these cuts is the difference in proportion between the thigh, knee and hem.",
      "I usually cut in a style that is more modern compared to most ready-to-wear, standard-size jeans. This ‘modern cut’ is characterised by a closer fit throughout the seat, a high rise and a waistline that sits on the hip.",
    ],
    stills: [
      catalog("catalog-01.jpg", "BOOTCUT", "Bootcut jean"),
      catalog("catalog-04.jpg", "STRAIGHT", "Straight jean"),
      catalog("catalog-07.jpg", "SLIM STRAIGHT", "Slim straight jean"),
      catalog("catalog-13.jpg", "WIDE", "Wide jean"),
    ],
  },
  {
    id: "the-rise",
    heading: "Fit and Shape",
    kicker: "RISE",
    paragraphs: [
      "The rise is the distance between the waist and the crotch. I distinguish between a low rise, medium rise and high rise.",
    ],
    stills: [
      catalog("catalog-05.jpg", "LOW RISE"),
      catalog("catalog-08.jpg", "MEDIUM RISE"),
      catalog("catalog-11.jpg", "HIGH RISE"),
    ],
  },
  {
    id: "waist-height",
    heading: "Fit and Shape",
    kicker: "WAIST HEIGHT",
    paragraphs: [
      "Related to the rise but slightly different is the waist height of the jeans. A jean can be high waisted, or low(er) waisted. While jeans back in the days usually sat around waist height, contemporary most jeans sit on the high hip, or low hip for lower waisted models.",
    ],
    stills: [
      catalog("catalog-09.jpg", "HIGH WAIST"),
      catalog("catalog-14.jpg", "HIGH HIP"),
      catalog("catalog-16.jpg", "LOW HIP"),
    ],
  },
  {
    id: "inseam-length",
    heading: "Fit and Shape",
    kicker: "INSEAM LENGTH",
    paragraphs: [
      "Some lengths of pants work better with specific shapes, such as a bootcut works well with a stack. And a broken style works with any cut. The hem can also hit exactly at the ankle, being a clean break. As selvedge denim often gets worn with a cuff, this cuff can be accounted for by elongating the pant leg.",
    ],
    stills: [
      catalog("catalog-06.jpg", "STACK"),
      catalog("catalog-12.jpg", "CLEAN BREAK"),
      catalog("catalog-15.jpg", "CUFF"),
    ],
  },
  {
    id: "button-fly",
    heading: "Features",
    kicker: "BUTTON FLY",
    paragraphs: [
      "All jeans use Japanese hardware worth showing. I can make a pair with a traditional one piece button fly or an exposed button fly.",
      "Standard Buttons are either silver donut buttons, or raw brass donut buttons. More types of buttons are available, but will need to be ordered from Japan on request.",
    ],
    stills: [
      {
        src: "/features/exposed-button-fly.jpg",
        alt: "Exposed button fly",
        caption: "EXPOSED BUTTON FLY",
        width: 1080,
        height: 1350,
      },
      catalog("catalog-10.jpg", "BUTTON FLY", "Copper button fly"),
    ],
  },
  {
    id: "back-pockets",
    heading: "Features",
    kicker: "BACK POCKETS",
    paragraphs: [
      "Back pockets can come standard or with a flap.",
    ],
    stills: [
      {
        src: "/features/regular-back-pockets.jpg",
        alt: "Regular back pockets",
        caption: "REGULAR BACK POCKETS",
        width: 4032,
        height: 3024,
      },
      {
        src: "/features/back-pocket-with-flap.jpg",
        alt: "Back pocket with flap",
        caption: "BACK POCKET WITH FLAP",
        width: 4032,
        height: 3024,
      },
    ],
  },
  {
    id: "fabric",
    heading: "Fabric",
    paragraphs: [
      "I use Japanese Selvedge denim sourced and sold by denim.lab. Selvedge denim is woven on traditional shuttle looms, producing a tightly finished edge (the selvedge) along both sides of the fabric. This edge does not fray and is therefore used as the outseam of the pant legs. The fabrics I select range from 13oz to 17oz, these weights are wearable and with enough wear can bring out high contrast fades. Selvedge denim is about embracing imperfections in its fabric, from the nap and slub in the raw fabric to the fades and repairs. Admiring these personal imperfections are precisely what make a pair of jeans, a good pair of jeans. Let alone, jeans that one can and will want to wear for many years, only becoming more special as time passes.",
      "Available fabrics: Cobra 500, Okayama 500, Draggar 300",
    ],
    stills: [
      catalog("catalog-02.jpg", "COBRA 500", "Selvedge denim close-up"),
      catalog("catalog-03.jpg", "OKAYAMA 500", "Hardware on denim"),
      catalog("catalog-15.jpg", "DRAGGAR 300", "Selvedge outseam"),
    ],
  },
  {
    id: "standard-jeans",
    heading: "Standard Jeans",
    paragraphs: [],
    list: [
      "5 pocket jean made from Japanese Selvedge denim",
      "Selvedge belt loops",
      "Selvedge button fly",
      "Selvedge waist band",
      "Heavy cotton pocket bags",
      "French seamed pockets",
      "Bias bound upper side seam",
      "Japanese buttons and rivets",
      "Red Leather patch",
    ],
    closer: "The inside of these jeans look just as good as the outside.",
    stills: [
      catalog("catalog-01.jpg", "FIVE POCKET"),
      catalog("catalog-08.jpg", "WAIST BAND"),
      catalog("catalog-11.jpg", "CONSTRUCTION"),
      catalog("catalog-16.jpg", "FINISHED PAIR"),
    ],
  },
];
