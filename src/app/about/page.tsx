import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "About",
  description:
    "A denim workshop in Amsterdam. Pairs are measured, cut, and sewn in-house.",
};

export default function AboutPage() {
  return (
    <PageShell title="About">
      <p>
        I work from the city I was born in, Amsterdam. I work from a small
        studio with capacity to make only one pair at a time. I don’t outsource
        any of the labour.
      </p>
      <p>
        In 2021 I started making my own pants, simply because I rarely liked the
        cuts available from ready-to-wear or vintage garments. After journeying
        into traditional tailoring first, I eventually made myself a proper pair
        of jeans. In doing so I realised the value and the joy of being in
        control of each detail of a pair of jeans.
      </p>
      <p>
        As I started out, requests from friends and family came in to make pairs
        of jeans for them. Eventually these requests grew until I saw an
        opportunity to make some money on the side, which is still how I see it.
      </p>
      <p>
        Making jeans is labour-intensive, especially with a multiple-fitting
        approach. My goal, however, is for people to wear something I make and
        to keep my garments in their closets forever. I know how a good pair of
        pants makes one feel. I do believe a good pair of jeans makes or breaks
        some days.
      </p>
    </PageShell>
  );
}
