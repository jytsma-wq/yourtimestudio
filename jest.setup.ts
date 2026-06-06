import '@testing-library/jest-dom';
import React from 'react';
import testMessages from './src/content/messages/en.json';

function getNestedMessage(messages: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, messages);
}

class MockPointerEvent extends MouseEvent {
  pointerId = 1;
  pointerType = 'mouse';
}

Object.defineProperty(window, 'PointerEvent', {
  writable: true,
  value: window.PointerEvent || MockPointerEvent,
});

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value:
    window.ResizeObserver ||
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
});

Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(window.HTMLElement.prototype, 'hasPointerCapture', {
  writable: true,
  value: jest.fn(() => false),
});

Object.defineProperty(window.HTMLElement.prototype, 'setPointerCapture', {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(window.HTMLElement.prototype, 'releasePointerCapture', {
  writable: true,
  value: jest.fn(),
});

jest.doMock('@/lib/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) =>
    React.createElement('a', { href, ...props }, children),
  redirect: jest.fn(),
  usePathname: () => '/',
  useRouter: () => ({
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.doMock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
  useTranslations: (namespace = '') => (key: string) => {
    const message = getNestedMessage(testMessages, namespace ? `${namespace}.${key}` : key);

    if (typeof message === 'string') {
      return message;
    }

    if (typeof message === 'number') {
      return String(message);
    }

    return `${namespace}.${key}`;
  },
}));

jest.doMock('next/script', () => function MockScript(props: React.ScriptHTMLAttributes<HTMLScriptElement>) {
  return React.createElement('script', props);
});
