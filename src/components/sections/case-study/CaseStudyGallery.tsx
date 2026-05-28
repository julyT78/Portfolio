import Image from "next/image";
import type { ProjectData } from "@/data/projects";

type Props = {
  project: ProjectData;
  galleryLabel: string;
};

export function CaseStudyGallery({ project, galleryLabel }: Props) {
  if (!project.gallery || project.gallery.length === 0) return null;

  return (
    <section className="bg-canvas py-20 border-t border-ink/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <p className="font-eyebrow text-ink/40 mb-10">{galleryLabel}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {project.gallery.map((src, i) => (
            <div
              key={src}
              className={`relative rounded-[16px] overflow-hidden bg-ink/5 ${
                i === 0 && project.gallery!.length >= 3
                  ? "sm:col-span-2 aspect-[16/7]"
                  : "aspect-[16/10]"
              }`}
            >
              <Image
                src={src}
                alt={`${project.title} — visuel ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 640px"
                className="object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
