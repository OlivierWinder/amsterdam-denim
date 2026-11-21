"use server";

export type InquiryState = {
  ok: boolean;
  error?: string;
} | null;

function asText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const name = asText(formData.get("name"));
  const email = asText(formData.get("email"));
  const note = asText(formData.get("note"));

  if (!name || !email || !note) {
    return {
      ok: false,
      error: "Please fill in your name, email, and a short note.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "That email does not look right." };
  }

  if (note.length > 4000) {
    return { ok: false, error: "Please keep the note a bit shorter." };
  }

  // No database. Inquiries are accepted in-memory for this local slice.
  console.info("Inquiry received", { name, email, note });

  return { ok: true };
}
