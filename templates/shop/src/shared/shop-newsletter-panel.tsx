import { createFormValidation } from "@website-template-factory/content";
import { ManagedForm, type FormFieldConfig } from "@website-template-factory/ui";

type NewsletterContent = {
  title: string;
  description: string;
  fields: readonly FormFieldConfig[];
  submitLabel: string;
  successMessage: string;
  emptySelectLabel?: string;
  validation: {
    required: string;
    email: string;
    numberMin: string;
  };
};

type ShopNewsletterPanelProps = {
  newsletter: NewsletterContent;
  className: string;
};

export function ShopNewsletterPanel({ newsletter, className }: ShopNewsletterPanelProps) {
  return (
    <div className={className}>
      <ManagedForm
        title={newsletter.title}
        description={newsletter.description}
        fields={newsletter.fields}
        submitLabel={newsletter.submitLabel}
        successMessage={newsletter.successMessage}
        validationMessages={createFormValidation(newsletter.validation)}
        className="border-0 p-0"
        {...(newsletter.emptySelectLabel ? { emptySelectLabel: newsletter.emptySelectLabel } : {})}
      />
    </div>
  );
}
