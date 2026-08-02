import { AlertCircle } from 'lucide-react';

const formInboxEmail = 'hello@batumilighthouse.com';

type FormInboxUnavailableNoticeProps = {
  id: string;
  message: string;
};

export function FormInboxUnavailableNotice({
  id,
  message,
}: FormInboxUnavailableNoticeProps) {
  const emailIndex = message.indexOf(formInboxEmail);
  const beforeEmail = emailIndex >= 0 ? message.slice(0, emailIndex) : `${message} `;
  const afterEmail = emailIndex >= 0
    ? message.slice(emailIndex + formInboxEmail.length)
    : '';

  return (
    <div
      id={id}
      className="flex items-start gap-3 border border-brand-serene-coral/40 bg-brand-serene-coral/10 p-4 text-sm text-foreground"
      role="status"
      aria-live="polite"
    >
      <AlertCircle
        className="mt-0.5 size-5 shrink-0 text-brand-serene-coral-darken"
        aria-hidden="true"
      />
      <p className="leading-relaxed">
        {beforeEmail}
        <a
          href={`mailto:${formInboxEmail}`}
          className="font-semibold underline underline-offset-4 hover:text-brand-serene-coral-darken"
        >
          {formInboxEmail}
        </a>
        {afterEmail}
      </p>
    </div>
  );
}
