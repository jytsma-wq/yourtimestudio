type LocationBlockProps = {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  hours?: readonly string[];
  note?: string;
};

export function LocationBlock({ name, address, phone, email, hours, note }: LocationBlockProps) {
  return (
    <address className="not-italic">
      <h3 className="[font-family:var(--wtf-font-heading,inherit)] text-xl font-semibold">
        {name}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--wtf-color-muted-foreground,#475569)]">
        {address}
      </p>
      <div className="mt-4 grid gap-2 text-sm">
        {phone ? <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a> : null}
        {email ? <a href={`mailto:${email}`}>{email}</a> : null}
      </div>
      {hours ? (
        <ul className="mt-4 grid gap-1 text-sm text-[var(--wtf-color-muted-foreground,#475569)]">
          {hours.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {note ? (
        <p className="mt-4 text-sm text-[var(--wtf-color-muted-foreground,#475569)]">{note}</p>
      ) : null}
    </address>
  );
}
