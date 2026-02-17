import {
  featuredProject,
  projectItems,
  type ProjectItem,
} from '@/data/dashboard/content';
import { SectionLabel } from './SectionLabel';

function ProjectListItem({ item }: { item: ProjectItem }) {
  return (
    <div className="flex gap-5">
      {/* Thumbnail placeholder */}
      <div className="h-40 w-40 shrink-0 rounded-lg bg-neutral-700 dark:bg-neutral-600" />

      <div className="flex flex-col justify-center gap-3">
        <span className="text-base font-bold text-foreground dark:text-white">
          {item.category}
        </span>
        <h3 className="text-lg font-normal text-foreground dark:text-white">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

export function FeaturedProjectsSection() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-3">
          <SectionLabel className="text-foreground">
            Projects & Campaigns
          </SectionLabel>

          <h2 className="max-w-md text-2xl font-normal text-foreground sm:text-3xl">
            Driving change through action
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {/* Large featured tile */}
          <div className="relative flex min-h-[28rem] items-end overflow-hidden rounded-lg bg-neutral-700 dark:bg-neutral-600">
            <div className="relative z-10 flex flex-col gap-4 p-6">
              <span className="text-base font-bold text-white">
                {featuredProject.category}
              </span>
              <h3 className="max-w-sm text-2xl font-normal text-white sm:text-3xl">
                {featuredProject.title}
              </h3>
            </div>
          </div>

          {/* Stacked list */}
          <div className="flex flex-col gap-6">
            {projectItems.map((item) => (
              <ProjectListItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
