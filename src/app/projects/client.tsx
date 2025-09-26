'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard';
import { Dictionary, getLocaleFromPathname } from '@/lib/i18n';
import { Project } from '@/types/project';

interface ProjectsClientProps {
  allProjects: Project[];
  dict: Dictionary;
}

export function ProjectsClient({ allProjects, dict }: ProjectsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);

  // Available domain filters
  const domainFilters = [
    { key: 'uav', label: dict.projects.domains.uav },
    { key: 'qa', label: dict.projects.domains.qa },
    { key: 'ai', label: dict.projects.domains.ai },
    { key: 'web', label: dict.projects.domains.web },
    { key: 'game', label: dict.projects.domains.game },
    { key: 'medical', label: dict.projects.domains.medical },
    { key: 'innovation', label: currentLocale === 'tr' ? 'İnovasyon' : 'Innovation' },
  ];

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      // Search filter
      const matchesSearch = searchTerm === '' ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchTerm.toLowerCase());

      // Domain filter
      const matchesDomain = selectedDomains.length === 0 ||
        selectedDomains.some(domain =>
          project.tags.some(tag => tag === `domain:${domain}`)
        );

      return matchesSearch && matchesDomain;
    });
  }, [searchTerm, selectedDomains, allProjects]);

  const toggleDomain = (domain: string) => {
    setSelectedDomains(prev =>
      prev.includes(domain)
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDomains([]);
  };

  // Color mappings for different project domains
  const getDomainColor = (tags: string[]) => {
    if (tags.some(tag => tag === 'domain:uav')) return 'from-blue-500 to-purple-600';
    if (tags.some(tag => tag === 'domain:qa')) return 'from-green-500 to-emerald-600';
    if (tags.some(tag => tag === 'domain:ai')) return 'from-orange-500 to-red-600';
    if (tags.some(tag => tag === 'domain:web')) return 'from-purple-500 to-pink-600';
    if (tags.some(tag => tag === 'domain:game')) return 'from-yellow-500 to-orange-600';
    if (tags.some(tag => tag === 'domain:innovation')) return 'from-amber-500 to-yellow-600';
    return 'from-gray-500 to-gray-600';
  };

  const getDomainIcon = (tags: string[]) => {
    if (tags.some(tag => tag === 'domain:uav')) return '🚁';
    if (tags.some(tag => tag === 'domain:qa')) return '🔍';
    if (tags.some(tag => tag === 'domain:ai')) return '🤖';
    if (tags.some(tag => tag === 'domain:web')) return '💻';
    if (tags.some(tag => tag === 'domain:game')) return '🎮';
    if (tags.some(tag => tag === 'domain:innovation')) return '🔬';
    return '⚡';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            {currentLocale === 'tr' ? 'Projelerim' : 'My Projects'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {currentLocale === 'tr' 
              ? 'Test mühendisliği ve kalite güvencesi odaklı projeler, AI çözümleri, eğitim platformları ve yazılım geliştirme deneyimleri'
              : 'Test engineering and quality assurance focused projects, AI solutions, educational platforms and software development experiences'
            }
          </p>
        </div>

        {/* Project Cards Grid - Simplified visual layout (no heavy overlays) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.slug} 
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProject(project)}
            >
              {/* Color strip */}
              <div className={`h-2 w-full bg-gradient-to-r ${getDomainColor(project.tags)}`} />

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {project.tags.filter(tag => tag.startsWith('domain:')).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                      >
                        {tag.replace('domain:', '').toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(project.date).getFullYear()}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.filter(tag => tag.startsWith('tech:')).slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs"
                    >
                      {tag.replace('tech:', '')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {currentLocale === 'tr' ? 'İşbirliği yapmak ister misiniz?' : 'Interested in collaborating?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {currentLocale === 'tr' 
                ? 'Yeni projeler ve fırsatlar hakkında konuşmaya her zaman açığım'
                : 'I\'m always open to discussing new projects and opportunities'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                <a href="mailto:byenikose@gmail.com">
                  {currentLocale === 'tr' ? 'İletişime Geç' : 'Get In Touch'}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/resume">
                  {currentLocale === 'tr' ? 'Özgeçmiş Görüntüle' : 'View Resume'}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedProject(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {selectedProject.tags.filter(tag => tag.startsWith('domain:')).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      >
                        {tag.replace('domain:', '').toUpperCase()}
                      </span>
                    ))}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(selectedProject.date).getFullYear()}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  
                  {/* Patent specific info */}
                  {selectedProject.isPatent && (
                    <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 text-sm font-medium mb-1">
                        <span>📋</span>
                        {currentLocale === 'tr' ? 'Patent Bilgileri' : 'Patent Information'}
                      </div>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        <strong>{currentLocale === 'tr' ? 'Patent No:' : 'Patent No:'}</strong> {selectedProject.patentNumber}
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        <strong>{currentLocale === 'tr' ? 'Yayın Tarihi:' : 'Published:'}</strong> {selectedProject.publishDate}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {currentLocale === 'tr' ? 'Açıklama' : 'Description'}
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {/* Always use detailed content in modal, not summary */}
                    {currentLocale === 'tr' && selectedProject.content_tr ? selectedProject.content_tr : selectedProject.content}
                  </div>
                </div>

                {/* Patent Abstract */}
                {selectedProject.isPatent && selectedProject.abstract && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {currentLocale === 'tr' ? 'Özet (Abstract)' : 'Abstract'}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {currentLocale === 'tr' && selectedProject.abstract_tr ? selectedProject.abstract_tr : selectedProject.abstract}
                    </p>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {currentLocale === 'tr' ? 'Teknolojiler' : 'Technologies'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.filter(tag => tag.startsWith('tech:')).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium"
                      >
                        {tag.replace('tech:', '')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
