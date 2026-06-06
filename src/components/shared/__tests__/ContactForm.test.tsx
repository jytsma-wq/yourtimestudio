import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/content/messages/en.json';
import { ContactForm } from '../ContactForm';

jest.mock('@/lib/recaptcha-client', () => ({
  getRecaptchaToken: jest.fn(() => Promise.resolve('test-recaptcha-token')),
  recaptchaScriptSrc: '',
}));

function renderContactForm() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <ContactForm />
    </NextIntlClientProvider>
  );
}

async function fillRequiredContactFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), 'Mariam K.');
  await user.type(screen.getByLabelText(/email address/i), 'mariam@example.com');
  await user.type(screen.getByLabelText(/message/i), 'I need a faster booking path.');
}

describe('ContactForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('shows validation errors when required fields are missing', async () => {
    const user = userEvent.setup();
    renderContactForm();

    await user.click(screen.getByRole('button', { name: /send project request/i }));

    expect(await screen.findByText(messages.contactPage.form.name_required)).toBeVisible();
    expect(screen.getByText(messages.contactPage.form.email_required)).toBeVisible();
    expect(screen.getByText(messages.contactPage.form.message_required)).toBeVisible();
  });

  it('ignores honeypot submissions before calling the API', async () => {
    const user = userEvent.setup();
    const { container } = renderContactForm();

    await fillRequiredContactFields(user);
    fireEvent.change(container.querySelector('input[name="honeypot"]')!, {
      target: { value: 'bot-filled-value' },
    });

    await user.click(screen.getByRole('button', { name: /send project request/i }));

    await waitFor(() => expect(global.fetch).not.toHaveBeenCalled());
    expect(screen.queryByText(messages.contactPage.form.success_title)).not.toBeInTheDocument();
  });

  it('shows the success message after a successful submission', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    renderContactForm();

    await fillRequiredContactFields(user);
    await user.click(screen.getByRole('button', { name: /send project request/i }));

    expect(await screen.findByText(messages.contactPage.form.success_title)).toBeVisible();
    expect(screen.getByText(messages.contactPage.form.success_body)).toBeVisible();
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/leads',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('test-recaptcha-token'),
      })
    );
  });
});
