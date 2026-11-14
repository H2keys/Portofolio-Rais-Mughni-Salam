export function ProjectGallery({ images }) {
  if (!images || !images.length) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {images.map((image, index) => (
        <img
          key={`${image}-${index}`}
          src={image}
          alt={`Project gallery ${index + 1}`}
          className="h-64 w-full rounded-[22px] border border-white/10 object-cover md:h-80"
          loading="lazy"
        />
      ))}
    </div>
  );
}
