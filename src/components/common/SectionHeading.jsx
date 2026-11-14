export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignClasses = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl';

  return (
    <div className={alignClasses}>
      {eyebrow && <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[#d6a15b]">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold tracking-[-0.06em] text-[#f6f2ea] sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base text-[#c7c2b8] sm:text-lg">{description}</p>}
    </div>
  );
}
