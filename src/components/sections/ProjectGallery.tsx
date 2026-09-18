type ProjectGalleryProps = {
  images: string[];
  projectTitle: string;
};

function ProjectGallery({
  images,
  projectTitle,
}: ProjectGalleryProps) {
  if (!images.length) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center border border-white/10 bg-[#111]">
        <span className="text-center text-xs uppercase tracking-[0.25em] text-white/20">
          Project visuals coming soon
        </span>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {images.map((image, index) => (
        <figure
          key={image}
          className="group overflow-hidden border border-white/10 bg-[#111]"
        >
          <img
            src={image}
            alt={`${projectTitle} project screenshot ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
          />
        </figure>
      ))}
    </div>
  );
}

export default ProjectGallery;