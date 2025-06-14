"use client";

import ProjectListItem from './_components/ProjectListItem';
import React, { useState, useMemo, useEffect, useRef, useImperativeHandle } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Settings, User, Plus, Sun, Moon, Check, Trash2, Edit, Search, Briefcase, Bell, Filter, ListFilter, Users as UsersIcon, FileText, Activity, GripVertical,
  Calendar as CalendarIcon, UploadCloud as UploadIcon, X as XIcon, Paperclip as PaperclipIcon } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { addDays, format, parseISO, isValid } from "date-fns";
import { Project, ProjectFormHandle } from './_components/interface';
import ProjectFormFields from './_components/ProjectFormFields';
import ProjectDetailPane from './_components/ProjectDetailPane';
import { MOCK_PROJECTS } from './_components/const'; // Assuming this is the path to your mock data

// --- Main Dashboard Page Component ---
export default function MarketingProtocolHomePage(): React.ReactElement {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Theme toggle not implemented in UI
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('endDate'); // Default sort by end date
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const createFormRef = useRef<ProjectFormHandle>(null);

  useEffect(() => {
    if (projects.length > 0 && selectedProjectId === null) {
        setSelectedProjectId(projects[0].id);
    }
     if (selectedProjectId && !projects.find(p => p.id === selectedProjectId)) {
         setSelectedProjectId(projects[0]?.id ?? null);
     }
  }, [projects, selectedProjectId]);

  const handleSelectProject = (projectId: string): void => {
    setSelectedProjectId(projectId);
  };

  const handleCreateProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = createFormRef.current?.getFormData();
    if (!formData) {
      console.error("Failed to get form data for new project.");
      return;
    }

    const { name, description, date, teamMemberIds, newlyAddedFiles } = formData;

    const newProject: Project = {
      id: `p${Date.now()}`,
      name: name || 'Untitled Project',
      description: description || '',
      startDate: date?.from ? format(date.from, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      endDate: date?.to ? format(date.to, "yyyy-MM-dd") : format(addDays(date?.from || new Date(), 30), "yyyy-MM-dd"),
      status: 'Planning',
      progress: 0,
      team: teamMemberIds,
      files: newlyAddedFiles.map(file => ({ name: file.name, url: '#', type: file.type, size: file.size })), // Placeholder URL
      tasks: [],
      lastActivity: `Project created ${format(new Date(), "PPpp")}`,
      createdAt: format(new Date(), "yyyy-MM-dd"),
    };
  
    // --- Optional: axios POST to save remotely ---
    // try {
    //   const response = await axios.post('http://localhost:3001/projects', newProject);
    //   console.log('Server response:', response.data);
    //   // If using server-generated ID, update newProject.id = response.data.id;
    // } catch (err: any) {
    //   console.error('Failed to sync project with server:', err);
    // }
  
    setProjects(prevProjects => [newProject, ...prevProjects]);
    setIsCreateDialogOpen(false);
    setSelectedProjectId(newProject.id);
  };

  const handleUpdateProject = (updatedProject: Project) => {
      setProjects(prevProjects =>
          prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p)
      );
      setSelectedProjectId(updatedProject.id);
  };

  const handleDeleteProject = (projectId: string) => {
       setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
  };

  const selectedProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) ?? null;
  }, [selectedProjectId, projects]);

  const filteredAndSortedProjects = useMemo(() => {
        let currentProjects = [...projects];

        if (filterStatus === 'ongoing') {
            currentProjects = currentProjects.filter(p => p.status !== 'Completed');
        } else if (filterStatus === 'completed') {
            currentProjects = currentProjects.filter(p => p.status === 'Completed');
        }

        currentProjects.sort((a, b) => {
            if (sortBy === 'endDate') {
                const dateA = a.endDate ? parseISO(a.endDate).getTime() : 0;
                const dateB = b.endDate ? parseISO(b.endDate).getTime() : 0;
                if (isNaN(dateA) && isNaN(dateB)) return 0;
                if (isNaN(dateA)) return 1;
                if (isNaN(dateB)) return -1;
                return dateA - dateB;
            } else if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'status') {
                 return a.status.localeCompare(b.status);
            }
            return 0;
        });
        return currentProjects;
  }, [projects, filterStatus, sortBy]);

  // Default initial data for the create form
  const createFormInitialData = {
    name: "",
    description: "",
    dateRange: { from: new Date(), to: addDays(new Date(), 30) },
    teamMemberIds: [],
    initialClientFiles: []
  };

  return (
    <div
  className={`
    flex flex-col h-full max-h-screen
    ${isDarkMode ? 'dark' : ''} 
    text-foreground font-sans overflow-hidden
  `}
>
  <div className="flex-1 container mx-auto grid grid-cols-1 md:grid-cols-7 gap-4 overflow-hidden">
    {/* Project List Column (2/5) */}
    <div className="col-span-1 md:col-span-2 flex flex-col gap-4 overflow-hidden bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-300 dark:border-gray-700">
      <div className="flex items-center justify-between gap-2 shrink-0">
        <h2 className="text-lg font-semibold text-foreground">
          Projects ({filteredAndSortedProjects.length})
        </h2>
        <div className="flex items-center gap-1">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger
              className="h-8 w-[100px] text-xs"
              aria-label="Filter by status"
            >
              <ListFilter className="h-3 w-3" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-2 pr-1">
        <AnimatePresence>
          {filteredAndSortedProjects.length > 0 ? (
            filteredAndSortedProjects.map((project) => (
              <ProjectListItem
                key={project.id}
                project={project}
                isSelected={project.id === selectedProjectId}
                onSelect={handleSelectProject}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 text-muted-foreground text-sm"
            >
              No projects match the current filter.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-auto shrink-0 pt-2">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="default" className="w-full shadow-sm group cursor-pointer">
              <Plus className="mr-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:rotate-90" />
              Create New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[520px]">
            <form onSubmit={handleCreateProject}>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Fill in the details below to start a new project. Click create when you're done.
                </DialogDescription>
              </DialogHeader>
              <ProjectFormFields
                ref={createFormRef}
                initialData={createFormInitialData}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Create Project</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>

    {/* Project Detail Pane (3/5) */}
    <div className="col-span-1 md:col-span-5 h-full overflow-hidden">
      <ProjectDetailPane
        project={selectedProject}
        onProjectUpdate={handleUpdateProject}
        onProjectDelete={handleDeleteProject}
      />
    </div>
  </div>
</div>

  );
}

// InputWithIcon component (can be kept if used elsewhere, or removed if not)
// For this example, it's not directly used by the main dashboard logic shown.
// interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
//     icon: React.ReactNode;
// }
// const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>( /* ... implementation ... */ );
// InputWithIcon.displayName = "InputWithIcon";
