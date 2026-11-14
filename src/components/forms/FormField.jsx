export function FormField({ label, name, type = 'text', value, onChange, error, placeholder, required }) {
  const id = name;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-[#e8e0d4]">
        {label} {required && <span className="text-[#d6a15b]">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          className="rounded-2xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-[#f5f0e7] placeholder:text-[#827f78] focus:border-[#d6a15b] focus:outline-none"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="rounded-2xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-[#f5f0e7] placeholder:text-[#827f78] focus:border-[#d6a15b] focus:outline-none"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-[#ffb8a3]">
          {error}
        </p>
      )}
    </div>
  );
}
