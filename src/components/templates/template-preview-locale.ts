import {
  defaultLocale,
  launchLocales,
  type Locale
} from "../../lib/i18n/config";

export type PreviewLocale = Locale;

type PreviewLabels = {
  allTemplates: string;
  back: string;
  categoryLabels: Record<string, string>;
  desktop: string;
  disclosureBody: string;
  disclosureLabel: string;
  fictionalDemo: string;
  fullScreen: string;
  fullScreenTitle: string;
  home: string;
  iframeTitle: (brandName: string) => string;
  mobile: string;
  pageNumber: (number: number) => string;
  previewPage: string;
  previewWidth: string;
  returnToControls: string;
  skipControls: string;
  tablet: string;
};

export const previewLabels: Record<PreviewLocale, PreviewLabels> = {
  en: {
    allTemplates: "All templates",
    back: "Back",
    categoryLabels: {
      hotel: "hotel",
      dentist: "dentist",
      "beauty-salon": "beauty salon",
      restaurant: "restaurant",
      bar: "bar",
      shop: "shop"
    },
    desktop: "Desktop",
    disclosureBody:
      "Fictional demonstration. Forms validate locally and do not send or store information.",
    disclosureLabel: "Template demonstration notice",
    fictionalDemo: "fictional demonstration",
    fullScreen: "Full screen",
    fullScreenTitle: "Open the fictional site without preview controls",
    home: "Home",
    iframeTitle: (brandName) => `${brandName} website preview`,
    mobile: "Mobile",
    pageNumber: (number) => `Page ${number}`,
    previewPage: "Preview page",
    previewWidth: "Preview width",
    returnToControls: "Return to preview controls",
    skipControls: "Skip preview controls",
    tablet: "Tablet"
  },
  ka: {
    allTemplates: "ყველა შაბლონი",
    back: "უკან",
    categoryLabels: {
      hotel: "სასტუმრო",
      dentist: "სტომატოლოგია",
      "beauty-salon": "სილამაზის სალონი",
      restaurant: "რესტორანი",
      bar: "ბარი",
      shop: "მაღაზია"
    },
    desktop: "კომპიუტერი",
    disclosureBody:
      "ეს გამოგონილი, ინგლისურენოვანი დემონსტრაციაა. ფორმები მონაცემებს მხოლოდ ადგილობრივად ამოწმებს და არაფერს აგზავნის ან ინახავს.",
    disclosureLabel: "შაბლონის დემონსტრაციის შეტყობინება",
    fictionalDemo: "ინგლისურენოვანი გამოგონილი დემონსტრაცია",
    fullScreen: "სრულ ეკრანზე",
    fullScreenTitle: "გამოგონილი საიტის გახსნა მართვის ღილაკების გარეშე",
    home: "მთავარი",
    iframeTitle: (brandName) => `${brandName} — ვებსაიტის წინასწარი ნახვა`,
    mobile: "მობილური",
    pageNumber: (number) => `გვერდი ${number}`,
    previewPage: "წინასწარი ნახვის გვერდი",
    previewWidth: "წინასწარი ნახვის სიგანე",
    returnToControls: "წინასწარი ნახვის მართვის ღილაკებთან დაბრუნება",
    skipControls: "წინასწარ ნახვაზე გადასვლა",
    tablet: "ტაბლეტი"
  },
  ru: {
    allTemplates: "Все шаблоны",
    back: "Назад",
    categoryLabels: {
      hotel: "отель",
      dentist: "стоматология",
      "beauty-salon": "салон красоты",
      restaurant: "ресторан",
      bar: "бар",
      shop: "магазин"
    },
    desktop: "Компьютер",
    disclosureBody:
      "Это вымышленная демонстрация на английском языке. Формы проверяют данные только локально и ничего не отправляют и не сохраняют.",
    disclosureLabel: "Уведомление о демонстрационном шаблоне",
    fictionalDemo: "вымышленная демонстрация на английском языке",
    fullScreen: "На весь экран",
    fullScreenTitle: "Открыть вымышленный сайт без элементов управления",
    home: "Главная",
    iframeTitle: (brandName) => `Предпросмотр сайта ${brandName}`,
    mobile: "Телефон",
    pageNumber: (number) => `Страница ${number}`,
    previewPage: "Страница предпросмотра",
    previewWidth: "Ширина предпросмотра",
    returnToControls: "Вернуться к элементам управления",
    skipControls: "Перейти к предпросмотру",
    tablet: "Планшет"
  },
  tr: {
    allTemplates: "Tüm şablonlar",
    back: "Geri",
    categoryLabels: {
      hotel: "otel",
      dentist: "diş kliniği",
      "beauty-salon": "güzellik salonu",
      restaurant: "restoran",
      bar: "bar",
      shop: "mağaza"
    },
    desktop: "Masaüstü",
    disclosureBody:
      "Bu İngilizce hazırlanmış kurgusal bir demodur. Formlar verileri yalnızca yerel olarak doğrular; hiçbir bilgiyi göndermez veya saklamaz.",
    disclosureLabel: "Şablon demo bildirimi",
    fictionalDemo: "İngilizce kurgusal demo",
    fullScreen: "Tam ekran",
    fullScreenTitle: "Kurgusal siteyi önizleme kontrolleri olmadan aç",
    home: "Ana sayfa",
    iframeTitle: (brandName) => `${brandName} web sitesi önizlemesi`,
    mobile: "Mobil",
    pageNumber: (number) => `Sayfa ${number}`,
    previewPage: "Önizleme sayfası",
    previewWidth: "Önizleme genişliği",
    returnToControls: "Önizleme kontrollerine dön",
    skipControls: "Önizlemeye geç",
    tablet: "Tablet"
  }
};

export function parsePreviewLocale(
  value: string | string[] | null | undefined
): PreviewLocale {
  const candidate = Array.isArray(value) ? value[0] : value;

  return launchLocales.includes(candidate as Locale)
    ? (candidate as PreviewLocale)
    : defaultLocale;
}

export function previewPageLabel(
  locale: PreviewLocale,
  page: { slug: string; label: string },
  index: number
) {
  if (!page.slug) return previewLabels[locale].home;
  return locale === "en"
    ? page.label
    : previewLabels[locale].pageNumber(index + 1);
}

type NativeNavigationIntent = {
  type: string;
  button: number;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  target?: string;
};

export function shouldCarryPreviewLocale({
  type,
  button,
  metaKey = false,
  ctrlKey = false,
  shiftKey = false,
  altKey = false,
  target = ""
}: NativeNavigationIntent) {
  if (type === "auxclick" && button === 1) return true;

  return (
    type === "click" &&
    button === 0 &&
    (metaKey ||
      ctrlKey ||
      shiftKey ||
      altKey ||
      (target !== "" && target !== "_self"))
  );
}

function normalizedHash(hash: string) {
  if (!hash) return "";
  return hash.startsWith("#") ? hash : `#${hash}`;
}

function queryString(params: URLSearchParams) {
  const value = params.toString();
  return value ? `?${value}` : "";
}

function previewPath(templateId: string, slug: string) {
  return `/preview/${templateId}${slug ? `/${slug}` : ""}`;
}

function demoPath(templateId: string, slug: string) {
  return `/template-sites/${templateId}${slug ? `/${slug}` : ""}`;
}

export function splitPreviewSuffix(search: string, hash: string) {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const localeValue = params
    .getAll("locale")
    .find((value) => launchLocales.includes(value as Locale));
  const locale = parsePreviewLocale(localeValue);
  params.delete("locale");

  return {
    locale,
    demoSearch: queryString(params),
    hash: normalizedHash(hash)
  };
}

export function buildPreviewHref(
  templateId: string,
  slug: string,
  locale: PreviewLocale,
  demoSearch = "",
  hash = ""
) {
  const suffix = splitPreviewSuffix(demoSearch, hash);
  const params = new URLSearchParams();
  params.append("locale", locale);

  new URLSearchParams(suffix.demoSearch.slice(1)).forEach((value, key) => {
    params.append(key, value);
  });

  return `${previewPath(templateId, slug)}${queryString(params)}${suffix.hash}`;
}

export function buildDemoHref(
  templateId: string,
  slug: string,
  demoSearch = "",
  hash = ""
) {
  const suffix = splitPreviewSuffix(demoSearch, hash);
  return `${demoPath(templateId, slug)}${suffix.demoSearch}${suffix.hash}`;
}

export function buildLocalizedDemoHref(
  templateId: string,
  slug: string,
  locale: PreviewLocale,
  demoSearch = "",
  hash = ""
) {
  const suffix = splitPreviewSuffix(demoSearch, hash);
  const params = new URLSearchParams();
  params.append("locale", locale);

  new URLSearchParams(suffix.demoSearch.slice(1)).forEach((value, key) => {
    params.append(key, value);
  });

  return `${demoPath(templateId, slug)}${queryString(params)}${suffix.hash}`;
}
