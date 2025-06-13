import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { parseISO, format, addDays } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Briefcase, Check, FileText, Activity, Edit, Trash2, Plus, CalendarClock } from 'lucide-react';
import { Project, ClientFile, ProjectDetailPaneProps, ProjectFormHandle } from './interface';
import { getStatusBadgeVariant, MOCK_USERS } from './const';
import ProjectFormFields from './ProjectFormFields';

const ProjectDetailPane: React.FC<ProjectDetailPaneProps> = ({ project, onProjectUpdate, onProjectDelete }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const editFormRef = useRef<ProjectFormHandle>(null);

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = editFormRef.current?.getFormData();
    if (!formData || !project) {
      console.error('Form data or project not available for edit.');
      return;
    }

    const { name, description, date, teamMemberIds, newlyAddedFiles, currentClientFiles } = formData;

    const updatedProjectFiles: ClientFile[] = [
      ...currentClientFiles,
      ...newlyAddedFiles.map(file => ({
        name: file.name,
        url: '#',
        type: file.type,
        size: file.size,
      })),
    ];

    const updatedProject: Project = {
      ...project,
      name: name || project.name,
      description: description || project.description,
      startDate: date?.from ? format(date.from, 'yyyy-MM-dd') : project.startDate,
      endDate: date?.to ? format(date.to, 'yyyy-MM-dd') : project.endDate,
      status: project.status,
      team: teamMemberIds,
      files: updatedProjectFiles,
      lastActivity: `Project details updated ${format(new Date(), 'PPpp')}`,
    };

    onProjectUpdate(updatedProject);
    setIsEditDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (project) {
      onProjectDelete(project.id);
      setIsDeleteDialogOpen(false);
    }
  };

  if (!project) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
        <Briefcase className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">Select a project</h3>
        <p className="text-sm text-muted-foreground mt-1">Choose a project from the list to view its details here.</p>
      </div>
    );
  }

  const statusStyle = getStatusBadgeVariant(project.status);
  const formattedStartDate = project.startDate ? format(parseISO(project.startDate), 'MMM dd, yyyy') : 'N/A';
  const formattedEndDate = project.endDate ? format(parseISO(project.endDate), 'MMM dd, yyyy') : 'N/A';
  const formattedCreatedAt = project.createdAt ? format(parseISO(project.createdAt), 'MMM dd, yyyy') : 'N/A';

  const projectFormData = {
    name: project.name,
    description: project.description,
    dateRange: {
      from: project.startDate ? parseISO(project.startDate) : new Date(),
      to: project.endDate
        ? parseISO(project.endDate)
        : addDays(project.startDate ? parseISO(project.startDate) : new Date(), 30),
    },
    teamMemberIds: project.team,
    initialClientFiles: project.files,
  };

  return (
    <>
      <motion.div
        key={project.id}
        initial={{ opacity: 0.8, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="h-full flex flex-col bg-white overflow-hidden gap-4"
      >
        {/* Header */}
        <div className="p-6 border rounded-2xl border-gray-300 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">{project.name}</h2>
            <div className="flex items-center gap-3 mt-3">
              <Badge variant={statusStyle.variant} className={`text-xs ${statusStyle.className}`}>
                {project.status === 'Completed' && <Check className="mr-1 h-3 w-3" />}
                {project.status}
              </Badge>
              <CalendarClock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{formattedStartDate} - {formattedEndDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                aria-label="Edit Project"
                onClick={() => setIsEditDialogOpen(true)}
                className='cursor-pointer'
                >
                <Edit className="h-4 w-4" />
            </Button>
            <Button
                variant="destructive"
                size="icon"
                aria-label="Delete Project"
                onClick={() => setIsDeleteDialogOpen(true)}
                className='cursor-pointer'
                >
                <Trash2 className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-2xl">
          <Tabs defaultValue="overview" className="p-4 sm:p-6 h-full flex flex-col">
            {/* Tabs Navigation */}
            <TabsList className="shrink-0 self-start mb-6 grid w-full grid-cols-3 sm:w-auto sm:inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-900 data-[state=active]:shadow-sm">
                <FileText className="h-4 w-4 mr-2" />Overview
              </TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-900 data-[state=active]:shadow-sm">
                <Check className="h-4 w-4 mr-2" />Tasks
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-900 data-[state=active]:shadow-sm">
                <Activity className="h-4 w-4 mr-2" />Activity
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="flex-1 space-y-4 mt-2">
              {/* Description Section */}
              <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">Description</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 prose prose-sm dark:prose-invert max-w-none">
                  {project.description || 'No description provided for this project.'}
                </p>
              </div>

              {/* Details Section */}
              <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-3">Details</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Start Date:</span>
                    <span>{formattedStartDate}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">End Date:</span>
                    <span>{formattedEndDate}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Created:</span>
                    <span>{formattedCreatedAt}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Last Update:</span>
                    <span>{project.lastActivity}</span> {/* Assuming project.lastActivity is a formatted date/time string */}
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Team Members Section */}
                <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-3">Team Members</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.team.map(userId => {
                      const user = MOCK_USERS[userId as keyof typeof MOCK_USERS];
                      return user ? (
                        <TooltipProvider key={userId} delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-950 hover:ring-2 hover:ring-blue-500 dark:hover:ring-blue-400 transition-all">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.initials}</AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{user.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : null;
                    })}
                    {project.team.length === 0 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">No team members assigned to this project.</span>
                    )}
                  </div>
                </div>

                {/* Files Section */}
                <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-3">Attached Files</h3>
                  {project.files.length > 0 ? (
                    <ul className="space-y-2">
                      {project.files.map(file => (
                        <li key={file.name}>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group"
                          >
                            <FileText className="h-4 w-4 mr-2.5 shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                            <span className="truncate">{file.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No files have been attached to this project.</p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Tasks Tab Content */}
            <TabsContent value="tasks" className="flex-1 space-y-4 mt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">Project Tasks</h3>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Plus className="h-4 w-4 mr-2" /> Add New Task
                </Button>
              </div>

              {project.tasks.length > 0 ? (
                <div className="space-y-3">
                  {project.tasks.map(task => (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-3.5 rounded-lg border ${
                        task.completed
                          ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-500/10'
                          : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50'
                      } shadow-sm hover:shadow-md transition-shadow`}
                    >
                      <span className={`text-sm ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                        {task.name}
                      </span>
                      <Badge
                        variant={task.completed ? 'default' : 'outline'}
                        className={`text-xs py-0.5 px-2 rounded-full ${
                          task.completed
                            ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-700/30 dark:text-green-300 dark:border-green-600'
                            : 'text-gray-600 border-gray-300 dark:text-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {task.completed ? 'Done' : 'To Do'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No tasks</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new task.</p>
                </div>
              )}
            </TabsContent>

            {/* Activity Tab Content */}
            <TabsContent value="activity" className="flex-1 space-y-4 mt-2">
              <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">Recent Project Activity</h3>
              <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/50 shadow-sm">
                <div className="flow-root">
                  <ul className="-mb-4"> {/* Using a simple list for activities for now */}
                    <li> {/* Example structure for a single activity item */}
                        <div className="relative pb-4">
                          <span className="absolute top-1 left-3 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
                          <div className="relative flex items-start space-x-3">
                              <div>
                                <div className="relative px-1">
                                    <div className="h-6 w-6 bg-blue-500 dark:bg-blue-400 rounded-full ring-4 ring-gray-50 dark:ring-gray-900/50 flex items-center justify-center">
                                      <Activity className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                              </div>
                              <div className="min-w-0 flex-1 py-0.5">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                  Project created <span className="font-medium text-gray-900 dark:text-gray-100">{/* e.g. project.createdBy.name */}</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    {/* Assuming project.lastActivity is a more descriptive log or a formatted date for a generic "last update" */}
                                    Last activity: {project.lastActivity}
                                </p>
                              </div>
                          </div>
                        </div>
                    </li>
                    {/* Add more activity items here when available */}
                  </ul>
                </div>
                <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-4">
                  Full activity feed coming soon...
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Project: {project.name}</DialogTitle>
              <DialogDescription>Update the project details below.</DialogDescription>
            </DialogHeader>
            <ProjectFormFields ref={editFormRef} initialData={projectFormData} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className='cursor-pointer'>Cancel</Button>
              </DialogClose>
              <Button type="submit" className='cursor-pointer'>Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>Are you sure you want to delete the project "{project.name}"? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className='cursor-pointer'>Cancel</Button>
            </DialogClose>
            <Button variant="destructive" className='cursor-pointer text-white' onClick={handleDeleteConfirm}>Delete Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectDetailPane;
