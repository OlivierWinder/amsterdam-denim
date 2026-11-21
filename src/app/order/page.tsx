import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Order",
  description:
    "The price of a bespoke pair starts at €350. Book a consultation in Amsterdam.",
};

export default function OrderPage() {
  return (
    <PageShell title="Order">
      <p>
        The price of a bespoke pair of jeans starts at €350,- depending on the
        features and any additional requests. Use this form below to schedule a
        consultation and measurements appointment with me. This is free of
        charge. Appointments can be made in my studio in the city center of
        Amsterdam or at another preferred location in Amsterdam.
      </p>
      <p>
        Before this appointment I advise to have a look at the{" "}
        <Link
          href="/styles"
          className="underline underline-offset-4 transition-opacity hover:opacity-50"
        >
          styles page
        </Link>{" "}
        to gain insights on your preferences. Booking an appointment for
        consultations and measurements with me is free of charge.
      </p>
      <InquiryForm />
    </PageShell>
  );
}
