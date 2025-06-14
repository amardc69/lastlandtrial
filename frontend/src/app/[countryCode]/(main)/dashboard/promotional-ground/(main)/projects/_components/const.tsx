import { ProjectStatus } from "./type";
import { Project } from "./interface";

export const getStatusBadgeVariant = (status: ProjectStatus): { variant: "default" | "secondary" | "outline" | "destructive", className?: string } => {
    switch (status) {
      case 'Completed': return { variant: "secondary", className: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700" };
      case 'In Progress': return { variant: "default", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300 dark:border-blue-700" };
      case 'Development': return { variant: "default", className: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-300 dark:border-purple-700" };
      case 'Planning': return { variant: "outline", className: "border-dashed border-yellow-500 text-yellow-700 dark:text-yellow-400 dark:border-yellow-600" };
      case 'Testing': return { variant: "outline", className: "border-orange-400 text-orange-700 dark:text-orange-400 dark:border-orange-600" };
      case 'On Hold': return { variant: "destructive", className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-300 dark:border-gray-600" };
      default: return { variant: "secondary" };
    }
  };

export const MOCK_USERS = {
    'u1': { name: 'Alice Wonderland', initials: 'AW', avatar: '/avatars/alice.png' },
    'u2': { name: 'Bob The Builder', initials: 'BB', avatar: '/avatars/bob.png' },
    'u3': { name: 'Charlie Chaplin', initials: 'CC', avatar: '/avatars/charlie.png' },
    'u4': { name: 'Diana Prince', initials: 'DP', avatar: '/avatars/diana.png' },
};

// Mock data for team members for ProjectFormFields
export const ALL_TEAM_MEMBERS_FOR_FORM = [
    { id: "u1", name: "Alice Wonderland", email: "alice@example.com" },
    { id: "u2", name: "Bob The Builder", email: "bob@example.com" },
    { id: "u3", name: "Charlie Chaplin", email: "charlie@example.com" },
    { id: "u4", name: "Diana Prince", email: "diana@example.com" },
  ];

export const MOCK_PROJECTS: Project[] = [
    { id: 'p1', name: 'Quantum Leap Website', status: 'In Progress', progress: 75, startDate: '2024-07-01', endDate: '2024-09-30', description: 'Revamp the corporate website with a focus on performance and accessibility using cutting-edge tech.', team: ['u1', 'u2'], files: [{ name: 'Project Brief v2.pdf', url: '#' }, { name: 'Wireframes_final.fig', url: '#' }], tasks: [{ id: 't1', name: 'Setup hosting environment', completed: true }, { id: 't2', name: 'Develop homepage components', completed: true }, { id: 't3', name: 'Implement CMS integration', completed: false }], lastActivity: 'Alice updated task "Implement CMS..." 2 hours ago', createdAt: '2024-06-01' },
    { id: 'p2', name: 'Project Chimera Mobile App', status: 'Development', progress: 40, startDate: '2024-08-15', endDate: '2024-12-15', description: 'Cross-platform mobile app for internal communication and task tracking.', team: ['u3', 'u4', 'u1'], files: [{ name: 'Requirements Spec.docx', url: '#' }], tasks: [{ id: 't4', name: 'Design user authentication flow', completed: true }, { id: 't5', name: 'Build chat module backend', completed: false }, { id: 't6', name: 'Develop task list UI', completed: false }], lastActivity: 'Charlie pushed code 1 day ago', createdAt: '2024-07-10' },
    { id: 'p3', name: 'Nebula API Gateway', status: 'Testing', progress: 90, startDate: '2024-06-10', endDate: '2024-08-20', description: 'Centralized API gateway for managing microservice communication.', team: ['u2'], files: [], tasks: [{ id: 't7', name: 'Write integration tests', completed: true }, { id: 't8', name: 'Perform load testing', completed: false }], lastActivity: 'Bob deployed to staging 3 days ago', createdAt: '2024-05-15' },
    { id: 'p4', name: 'Solaris Marketing Campaign', status: 'Completed', progress: 100, startDate: '2024-05-01', endDate: '2024-07-31', description: 'Q3 digital marketing campaign launch.', team: ['u4'], files: [{ name: 'Final Report.pptx', url: '#' }], tasks: [{ id: 't9', name: 'Launch social media ads', completed: true }, { id: 't10', name: 'Analyze campaign results', completed: true }], lastActivity: 'Diana marked project as completed 1 week ago', createdAt: '2024-04-01' },
    { id: 'p5', name: 'Internal Knowledge Base', status: 'Planning', progress: 10, startDate: '2024-09-01', endDate: '2025-01-31', description: 'Setup a new wiki-style knowledge base for the engineering team.', team: ['u1', 'u3'], files: [], tasks: [{ id: 't11', name: 'Evaluate platform options', completed: false }], lastActivity: 'Project created 5 days ago', createdAt: '2024-08-05' },
  ];
