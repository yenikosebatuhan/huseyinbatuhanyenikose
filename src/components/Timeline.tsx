// 'use client' removed for static export compatibility
// import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import { TimelineItem } from '@/types/timeline';
import { Dictionary } from '@/lib/i18n';

interface TimelineProps {
  items: TimelineItem[];
  dict: Dictionary;
}

export function Timeline({ items, dict }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative opacity-100"
          >
            {/* Timeline dot */}
            <div className="absolute left-2 md:left-6 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1/2" />

            <div className="ml-12 md:ml-16">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {item.date}
                    </div>
                  </div>

                  {item.subtitle && (
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.subtitle}
                    </p>
                  )}

                  {item.location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {item.location}
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>

                  {item.tags && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
