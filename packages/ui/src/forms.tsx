"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";

import { cx } from "./cx";

export type FormFieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "time" | "number" | "textarea" | "select";
  required?: boolean;
  options?: readonly string[];
  helperText?: string;
};

type ManagedFormProps = {
  title: string;
  description?: string;
  fields: readonly FormFieldConfig[];
  submitLabel: string;
  successMessage: string;
  emptySelectLabel?: string;
  validationMessages?: {
    required?: string;
    email?: string;
    numberMin?: string;
  };
  className?: string;
};

function formatValidationMessage(message: string, field: string, min?: number) {
  return message.replace("{field}", field).replace("{min}", String(min ?? 1));
}

export function ManagedForm({
  title,
  description,
  fields,
  submitLabel,
  successMessage,
  emptySelectLabel = "Select an option",
  validationMessages,
  className
}: ManagedFormProps) {
  const initialValues = useMemo(
    () => Object.fromEntries(fields.map((field) => [field.name, ""])) as Record<string, string>,
    [fields]
  );
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const formInstanceId = useId();
  const successRef = useRef<HTMLParagraphElement>(null);

  const fieldId = (name: string) => `${formInstanceId}-${name}-field`;

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  function updateValue(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function validate() {
    const nextErrors: Record<string, string> = {};

    for (const field of fields) {
      const value = values[field.name]?.trim() ?? "";

      if (field.required && !value) {
        nextErrors[field.name] = validationMessages?.required
          ? formatValidationMessage(validationMessages.required, field.label)
          : `${field.label} is required.`;
      } else if (field.type === "email" && value && !value.includes("@")) {
        nextErrors[field.name] = validationMessages?.email ?? "Enter a valid email address.";
      } else if (field.type === "number" && value && Number(value) < 1) {
        nextErrors[field.name] = validationMessages?.numberMin
          ? formatValidationMessage(validationMessages.numberMin, field.label, 1)
          : `${field.label} must be at least 1.`;
      }
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      return;
    }

    setSubmitted(false);
    const firstInvalidField = fields.find((field) => Boolean(nextErrors[field.name]));
    if (firstInvalidField) {
      window.requestAnimationFrame(() => {
        document.getElementById(fieldId(firstInvalidField.name))?.focus();
      });
    }
  }

  return (
    <form
      className={cx("border border-[var(--wtf-color-border,#dbe3ef)] p-5", className)}
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <h2 className="[font-family:var(--wtf-font-heading,inherit)] text-2xl font-semibold">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-[var(--wtf-color-muted-foreground,#475569)]">
            {description}
          </p>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4">
        {fields.map((field) => {
          const error = errors[field.name];
          const inputId = fieldId(field.name);
          const helperId = `${formInstanceId}-${field.name}-helper`;
          const errorId = `${formInstanceId}-${field.name}-error`;
          const describedBy = [field.helperText ? helperId : null, error ? errorId : null]
            .filter(Boolean)
            .join(" ");

          return (
            <div key={field.name}>
              <label className="text-sm font-semibold" htmlFor={inputId}>
                {field.label}
                {field.required ? <span aria-hidden="true"> *</span> : null}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={inputId}
                  name={field.name}
                  className="mt-2 min-h-28 w-full border border-[var(--wtf-color-border,#dbe3ef)] bg-[var(--wtf-color-surface,#fff)] px-3 py-3 text-sm text-[var(--wtf-color-foreground,#111827)] focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
                  value={values[field.name] ?? ""}
                  required={field.required}
                  aria-required={field.required || undefined}
                  aria-invalid={Boolean(error)}
                  aria-describedby={describedBy || undefined}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                />
              ) : field.type === "select" ? (
                <select
                  id={inputId}
                  name={field.name}
                  className="mt-2 min-h-11 w-full border border-[var(--wtf-color-border,#dbe3ef)] bg-[var(--wtf-color-surface,#fff)] px-3 py-2 text-sm text-[var(--wtf-color-foreground,#111827)] focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
                  value={values[field.name] ?? ""}
                  required={field.required}
                  aria-required={field.required || undefined}
                  aria-invalid={Boolean(error)}
                  aria-describedby={describedBy || undefined}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                >
                  <option value="">{emptySelectLabel}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={inputId}
                  name={field.name}
                  type={field.type}
                  className="mt-2 min-h-11 w-full border border-[var(--wtf-color-border,#dbe3ef)] bg-[var(--wtf-color-surface,#fff)] px-3 py-2 text-sm text-[var(--wtf-color-foreground,#111827)] focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
                  value={values[field.name] ?? ""}
                  min={field.type === "number" ? 1 : undefined}
                  required={field.required}
                  aria-required={field.required || undefined}
                  aria-invalid={Boolean(error)}
                  aria-describedby={describedBy || undefined}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                />
              )}
              {field.helperText ? (
                <p
                  id={helperId}
                  className="mt-1 text-xs text-[var(--wtf-color-muted-foreground,#475569)]"
                >
                  {field.helperText}
                </p>
              ) : null}
              {error ? (
                <p
                  id={errorId}
                  role="alert"
                  className="mt-1 text-sm font-semibold text-[var(--wtf-color-error,#b91c1c)]"
                >
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center bg-[var(--wtf-color-button,#111827)] px-4 py-2 text-sm font-semibold text-[var(--wtf-color-button-foreground,#fff)] transition focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)] focus:ring-offset-2"
      >
        {submitLabel}
      </button>

      {submitted ? (
        <p
          ref={successRef}
          className="mt-4 border border-[var(--wtf-color-success,#15803d)] px-3 py-2 text-sm font-semibold text-[var(--wtf-color-success,#15803d)] outline-none"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          tabIndex={-1}
        >
          {successMessage}
        </p>
      ) : null}
    </form>
  );
}

export function ContactForm(props: Omit<ManagedFormProps, "submitLabel" | "successMessage">) {
  return (
    <ManagedForm
      {...props}
      submitLabel="Send message"
      successMessage="Message received. This demo keeps the response local."
    />
  );
}

export function BookingForm(props: Omit<ManagedFormProps, "submitLabel" | "successMessage">) {
  return (
    <ManagedForm
      {...props}
      submitLabel="Request booking"
      successMessage="Booking request received. This is a local demo state."
    />
  );
}

export function ReservationForm(
  props: Omit<ManagedFormProps, "submitLabel" | "successMessage"> & { successMessage?: string }
) {
  return (
    <ManagedForm
      {...props}
      submitLabel="Request reservation"
      successMessage={
        props.successMessage ?? "Reservation request received. This is a local demo state."
      }
    />
  );
}

export function AppointmentForm(props: Omit<ManagedFormProps, "submitLabel" | "successMessage">) {
  return (
    <ManagedForm
      {...props}
      submitLabel="Request appointment"
      successMessage="Appointment request received. This is a local demo state."
    />
  );
}

export function NewsletterForm() {
  return (
    <ManagedForm
      title="Join the list"
      description="Collect email interest without blocking the primary conversion flow."
      fields={[{ name: "email", label: "Email", type: "email", required: true }]}
      submitLabel="Subscribe"
      successMessage="Subscribed locally for this demo."
    />
  );
}
