"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Phone, X } from "lucide-react";
import { site } from "@/lib/site-config";
import { Button, type ButtonVariant } from "./Button";

/**
 * "Call" opens a bottom sheet: mobile or landline.
 * Falls back to a plain tel: link when JS is off (the trigger is a link).
 */
export function CallSheet({
  variant = "secondary",
  label = "Call",
  className = "",
  unstyled = false,
}: {
  variant?: ButtonVariant;
  label?: string;
  className?: string;
  /** Render the trigger as a plain button so parents can style it fully. */
  unstyled?: boolean;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {unstyled ? (
          <button type="button" className={className}>
            <Phone aria-hidden className="size-5" strokeWidth={1.75} />
            {label}
          </button>
        ) : (
          <Button variant={variant} className={className}>
            <Phone aria-hidden className="size-[18px]" strokeWidth={1.75} />
            {label}
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-night/60" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-lg rounded-t-[24px] bg-white p-6 pb-[max(24px,env(safe-area-inset-bottom))] shadow-lg focus:outline-none"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="t-h3 text-ink">Call Penguin Hospital</Dialog.Title>
            <Dialog.Close
              className="grid size-12 place-items-center rounded-full border border-line text-ink-2"
              aria-label="Close"
            >
              <X aria-hidden className="size-5" strokeWidth={1.75} />
            </Dialog.Close>
          </div>
          <div className="mt-5 grid gap-3">
            <a
              href={`tel:${site.phone.tel}`}
              className="flex min-h-14 items-center justify-between rounded-input border border-line px-5 text-[17px] font-semibold text-ink no-underline"
            >
              <span>
                Mobile <span className="block text-[14px] font-normal text-ink-2">{site.phone.display}</span>
              </span>
              <Phone aria-hidden className="size-5 text-blue" strokeWidth={1.75} />
            </a>
            <a
              href={`tel:${site.landline.tel}`}
              className="flex min-h-14 items-center justify-between rounded-input border border-line px-5 text-[17px] font-semibold text-ink no-underline"
            >
              <span>
                Landline{" "}
                <span className="block text-[14px] font-normal text-ink-2">{site.landline.display}</span>
              </span>
              <Phone aria-hidden className="size-5 text-blue" strokeWidth={1.75} />
            </a>
          </div>
          <p className="mt-4 text-[14px] text-ink-2">{site.emergencyOpen}.</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
