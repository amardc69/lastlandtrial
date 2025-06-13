import React from 'react';
import { parseISO, format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, CalendarClock } from 'lucide-react';
import { ProjectListItemProps } from './interface';
import { getStatusBadgeVariant } from './const';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"


const ProjectListItem: React.FC<ProjectListItemProps> = ({ project, isSelected, onSelect }) => {
  const statusStyle = getStatusBadgeVariant(project.status);
  const formattedEndDate = project.endDate ? format(parseISO(project.endDate), 'MMM dd, yyyy') : 'N/A';
  const formattedStartDate = project.startDate ? format(parseISO(project.startDate), 'MMM dd, yyyy') : 'N/A';

  return (
    <Card
        className={`cursor-pointer border-dashed transition-all min-h-[100px] duration-200 ease-in-out shadow-none hover:shadow-md ${
          isSelected
            ? 'border-primary dark:border-primary bg-primary/5 dark:bg-primary/10 shadow-md'
            : 'border border-gray-300 dark:border-gray-300'
        } overflow-hidden`}
        onClick={() => onSelect(project.id)}
        role="button"
        aria-pressed={isSelected}
        aria-label={`Select project: ${project.name}`}
      >
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base font-semibold leading-tight text-gray-900 dark:text-gray-100 group-hover:text-primary">
            {project.name}
          </CardTitle>
          <Badge variant={statusStyle.variant} className={`whitespace-nowrap text-xs shrink-0 ${statusStyle.className}`}>  
            {project.status === 'Completed' && <Check className="mr-1 h-3 w-3" />}
            {project.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-1 space-y-2">
        <div className="flex items-center text-xs text-muted-foreground gap-2">
          <CalendarClock className="h-3.5 w-3.5 shrink-0" />
          <span>{formattedStartDate} - {formattedEndDate}</span>
        </div>

        <div className="mt-4">
          <Progress value={project.progress} className="h-1.5" aria-label={`${project.progress}% complete`} />
          <span className="text-xs text-muted-foreground mt-1 block">{project.progress}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectListItem;
