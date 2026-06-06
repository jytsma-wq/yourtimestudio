import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/content/messages/en.json';
import { AuditRequestForm } from '../AuditRequestForm';

jest.mock('@/lib/recaptcha-client', () => ({
  getRecaptchaToken: jest.fn(() => Promise.resolve('test-recaptcha-token')),
  recaptchaScriptSrc: '',
}));

const auditValidation = {
  name_required: 'Name is required',
  business_required: 'Business name is required',
  email_required: 'Email is required',
  sector_required: 'Please select a sector',
  website_required: 'Website URL is required',
} as const;

function renderAuditRequestForm() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <AuditRequestForm />
    </NextIntlClientProvider>
  );
}

async function chooseSector(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('combobox', { name: /your sector/i }));
  await user.click(await screen.findByRole('option', { name: messages.contactPage.sectors[0] }));
}

async function fillRequiredAuditFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), 'Mariam K.');
  await user.type(screen.getByLabelText(/business name/i), 'Seafront Rooms');
  await user.type(screen.getByLabelText(/email address/i), 'mariam@example.com');
  await user.type(screen.getByLabelText(/website url/i), 'https://example.com');
  await chooseSector(user);
}

describe('AuditRequestForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('shows validation errors when required fields are missing', async () => {
    const user = userEvent.setup();
    renderAuditRequestForm();

    await user.click(screen.getByRole('button', { name: /request website audit/i }));

    expect(await screen.findByText(auditValidation.name_required)).toBeVisible();
    expect(screen.getByText(auditValidation.business_required)).toBeVisible();
    expect(screen.getByText(auditValidation.email_required)).toBeVisible();
    expect(screen.getByText(auditValidation.sector_required)).toBeVisible();
    expect(screen.getByText(auditValidation.website_required)).toBeVisible();
  });

  it('ignores honeypot submissions before calling the API', async () => {
    const user = userEvent.setup();
    const { container } = renderAuditRequestForm();

    fireEvent.change(container.querySelector('input[name="website_check"]')!, {
      target: { value: 'bot-filled-value' },
    });

    await user.click(screen.getByRole('button', { name: /request website audit/i }));

    await waitFor(() => expect(global.fetch).not.toHaveBeenCalled());
    expect(screen.queryByText(auditValidation.name_required)).not.toBeInTheDocument();
  });

  it('shows the success message after a successful submission', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    renderAuditRequestForm();

    await fillRequiredAuditFields(user);
    await user.click(screen.getByRole('button', { name: /request website audit/i }));

    expect(await screen.findByText(messages.auditPage.form.success)).toBeVisible();
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/audits',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('test-recaptcha-token'),
      })
    );
  });
});
