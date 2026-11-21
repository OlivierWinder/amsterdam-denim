"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitInquiry, type InquiryState } from "@/lib/actions";

export function InquiryForm() {
  const [state, setState] = useState<InquiryState>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const next = await submitInquiry(state, new FormData(e.currentTarget));
    setState(next);
    setPending(false);
  }

  if (state?.ok) {
    return (
      <p
        role="status"
        className="border-border bg-muted/60 rounded-md border px-3 py-3 text-[18px]"
      >
        Received. I will write back about a time to come in.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-serif text-[18px] font-normal">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          className="h-9 bg-background font-serif"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="font-serif text-[18px] font-normal">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-9 bg-background font-serif"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="note" className="font-serif text-[18px] font-normal">
          Note
        </Label>
        <Textarea
          id="note"
          name="note"
          required
          rows={6}
          placeholder="What you want made, whether this is a first pair, and when you can visit Amsterdam."
          className="min-h-32 bg-background font-serif text-[18px]"
        />
      </div>
      {state?.error ? (
        <p role="alert" className="text-destructive text-[18px]">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-9 px-4 font-serif">
        {pending ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}
