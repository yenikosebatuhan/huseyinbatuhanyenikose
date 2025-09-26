import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// MDX content will be rendered directly with custom components
// import { MDXRemote } from 'next-mdx-remote/rsc';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/i18n';
import { Project } from '@/types/project';

// MDX Components
const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mb-6">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold mb-4 mt-8">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold mb-3 mt-6">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-muted-foreground">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
  ),
};

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      title: `${data.title} - Projects`,
      description: data.summary,
    };
  } catch {
    return {
      title: 'Project Not Found',
    };
  }
}

export async function generateStaticParams() {
  const projectsDir = path.join(process.cwd(), 'content', 'projects');

  try {
    const files = fs.readdirSync(projectsDir);
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        slug: file.replace('.mdx', ''),
      }));
  } catch {
    return [];
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const dict = await getDictionary('en'); // Default to English

  try {
    const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const project: Project = {
      ...data,
      slug,
    } as Project;

    // Extract domain tags for display
    const domainTags = project.tags.filter(tag => tag.startsWith('domain:'));
    const techTags = project.tags.filter(tag => tag.startsWith('tech:'));

    return (
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="ghost">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>

          {/* Project Header */}
          <div className="mb-12">
            {/* Cover Image */}
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Domain badges overlay */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                {domainTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-background/90 text-foreground text-sm"
                  >
                    {dict.projects.domains[tag.replace('domain:', '') as keyof typeof dict.projects.domains] || tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{project.summary}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(project.date).getFullYear()}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {techTags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag.replace('tech:', '')}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 md:min-w-[200px]">
                <Button asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Project Content */}
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none">
                {/* Render MDX content as HTML for static export compatibility */}
                <div className="space-y-6">
                  {content.split('\n\n').map((paragraph, index) => {
                    // Simple markdown-like rendering
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-semibold mb-4 mt-8">{paragraph.replace('## ', '')}</h2>;
                    }
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={index} className="text-xl font-semibold mb-3 mt-6">{paragraph.replace('### ', '')}</h3>;
                    }
                    if (paragraph.startsWith('- ')) {
                      return <ul key={index} className="list-disc pl-6 mb-4">
                        {paragraph.split('\n').map((item, i) =>
                          item.startsWith('- ') ? <li key={i} className="text-muted-foreground">{item.replace('- ', '')}</li> : null
                        )}
                      </ul>;
                    }
                    if (paragraph.trim()) {
                      return <p key={index} className="mb-4 text-muted-foreground leading-relaxed">{paragraph}</p>;
                    }
                    return null;
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading project:', error);
    notFound();
  }
}
