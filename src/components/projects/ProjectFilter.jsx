export function ProjectFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onChange(category.id)}
          className={`rounded-full border px-4 py-2 text-sm transition ${
            activeCategory === category.id
              ? 'border-[#d6a15b]/40 bg-[#d6a15b]/10 text-[#f2e7d3]'
              : 'border-white/10 bg-transparent text-[#d8d2c8] hover:border-white/20 hover:text-[#f7f3ee]'
          }`}
          aria-pressed={activeCategory === category.id}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
