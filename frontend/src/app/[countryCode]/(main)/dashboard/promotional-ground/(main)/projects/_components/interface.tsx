import { DateRange } from "react-day-picker";
import { ProjectStatus } from "./type";

export interface Project {
    id: string;
    name: string;
    status: ProjectStatus;
    progress: number;
    startDate: string; // ISO Date string
    endDate: string;   // ISO Date string
    description: string;
    team: string[]; // User IDs
    files: ClientFile[];
    tasks: Task[];
    lastActivity: string;
    createdAt: string; // ISO Date string
}

export interface Task {
    id: string;
    name: string;
    completed: boolean;
}

export interface ClientFile {
    name: string;
    url: string; // Or other identifiers like id
    type?: string; // Optional: MIME type
    size?: number; // Optional: size in bytes
}

export interface ProjectFormHandle {
    getFormData: () => {
      name: string;
      description: string;
      date: DateRange | undefined;
      teamMemberIds: string[];
      newlyAddedFiles: File[]; // Files selected via input
      currentClientFiles: ClientFile[]; // Existing files that were not removed
    };
}

export interface ProjectListItemProps {
  project: Project;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

// --- Reusable Project Form Fields Component (Integrated from Artifact) ---
export interface ProjectFormFieldsProps {
  initialData?: {
    name?: string;
    description?: string;
    dateRange?: DateRange;
    teamMemberIds?: string[];
    initialClientFiles?: ClientFile[]; // To show existing files (not File objects)
  };
  // formId: string; // If needed for associating labels, not strictly necessary here
}

export interface ProjectDetailPaneProps {
    project: Project | null;
    onProjectUpdate: (updatedProject: Project) => void;
    onProjectDelete: (projectId: string) => void;
}

export interface ProjectFormHandle {
    getFormData: () => {
      name: string;
      description: string;
      date: DateRange | undefined;
      teamMemberIds: string[];
      newlyAddedFiles: File[]; // Files selected via input
      currentClientFiles: ClientFile[]; // Existing files that were not removed
    };
  }