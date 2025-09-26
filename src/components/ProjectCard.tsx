import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { Project } from '@/types/project';
import { Dictionary } from '@/lib/i18n';

interface ProjectCardProps {
  project: Project;
  dict: Dictionary;
  locale: string;
  index?: number;
}

export function ProjectCard({ project, dict, locale, index = 0 }: ProjectCardProps) {
  const title = locale === 'tr' && project.title_tr ? project.title_tr : project.title;
  const summary = locale === 'tr' && project.summary_tr ? project.summary_tr : project.summary;

  // Extract domain tags for filtering
  const domainTags = project.tags.filter(tag => tag.startsWith('domain:'));
  const techTags = project.tags.filter(tag => tag.startsWith('tech:'));

  return (
    <div className="h-full">
      <Link href={`/projects/${project.slug}`}>
        <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden">
          {/* Cover Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.cover}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Domain badges overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {domainTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-background/80 text-foreground text-xs"
                >
                  {dict.projects.domains[tag.replace('domain:', '') as keyof typeof dict.projects.domains] || tag}
                </Badge>
              ))}
            </div>
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                <Calendar className="h-4 w-4" />
                {new Date(project.date).getFullYear()}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {summary}
            </p>

            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {techTags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag.replace('tech:', '')}
                </Badge>
              ))}
              {techTags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{techTags.length - 3}
                </Badge>
              )}
            </div>

            {/* Read more link */}
            <div className="flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
              {dict.common.readMore}
              <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
