export type ProcessStep = {
  id: string;
  title: string;
  paragraphs: string[];
  /** YouTube video id only (not a full URL). Leave empty until Olivier pastes one. */
  youtubeId: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "consultation-and-measurements",
    title: "Consultation and Measurements",
    youtubeId: "",
    paragraphs: [
      "The making of your jeans start with a consultation. During, we discuss what the perfect jeans are for you. We go through style options and decide on a fabric. After I take your measurements (you will wear a fitting trouser) and I get to drafting the pattern.",
    ],
  },
  {
    id: "pattern-drafting",
    title: "Pattern Drafting",
    youtubeId: "",
    paragraphs: [
      "I draw the pattern from scratch. Every measurement I take finds itself back on the pattern.",
    ],
  },
  {
    id: "fitting-and-adjusting",
    title: "Fitting and Adjusting",
    youtubeId: "",
    paragraphs: [
      "From the pattern I sew a toile. We then fit this toile, check for fit and adjust accordingly. This process can take up multiple weeks and can require three appointments. Speed is not important here, getting the fit RIGHT is.",
    ],
  },
  {
    id: "cutting",
    title: "Cutting",
    youtubeId: "T_wtRbt0kIs",
    paragraphs: [
      "When the pattern is finalised. I cut the denim. I cut and sew all jeans by hand from my studio in Amsterdam.",
    ],
  },
  {
    id: "sewing",
    title: "Sewing",
    youtubeId: "v_MPnkrsUhY",
    paragraphs: [
      "Naturally, after cutting the denim I get to sewing. I sew the jeans nearly to completion: ready for the final fitting.",
    ],
  },
  {
    id: "final-fitting",
    title: "Final Fitting",
    youtubeId: "53hMByk2g1A",
    paragraphs: [
      "During the final fitting I check if the waist fits snug. And I throughly check the placement of the back pockets. The position of the back pockets affect the silhouette of the back of the pants greatly. We also decide on the desired length.",
    ],
  },
  {
    id: "sewing-completion",
    title: "Sewing",
    youtubeId: "-aq6XotlsCY",
    paragraphs: [
      "After deciding on possible fit adjustments, pocket placement and the pant length, I sew the jeans to completion and add the finishing details and hardware.",
    ],
  },
  {
    id: "pickup-or-dropoff",
    title: "Pickup or Dropoff",
    youtubeId: "UOMax5pxBww",
    paragraphs: [
      "Pickup can take place at my studio or I can drop the jeans off at a desired location.",
    ],
  },
];
