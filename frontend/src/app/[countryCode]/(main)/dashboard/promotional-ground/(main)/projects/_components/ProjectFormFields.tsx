import React, { useState, useMemo, useEffect, useRef, useImperativeHandle } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Users as UsersIcon, Calendar as CalendarIcon, UploadCloud as UploadIcon, X as XIcon, Paperclip as PaperclipIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { addDays, format, differenceInCalendarDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ProjectFormHandle, ProjectFormFieldsProps, ClientFile } from "./interface";
import { ALL_TEAM_MEMBERS_FOR_FORM } from "./const";


const ProjectFormFields = React.forwardRef<ProjectFormHandle, ProjectFormFieldsProps>(
    ({ initialData }, ref) => {
      const [name, setName] = useState(initialData?.name || "");
      const [description, setDescription] = useState(initialData?.description || "");
      const [date, setDate] = React.useState<DateRange | undefined>(
        initialData?.dateRange || { from: new Date(), to: addDays(new Date(), 30) }
      );
      const [selectedTeamMemberIds, setSelectedTeamMemberIds] = React.useState<string[]>(
        initialData?.teamMemberIds || []
      );
      // For files newly selected via the input
      const [newlyAddedFiles, setNewlyAddedFiles] = React.useState<File[]>([]);
      // For existing files passed via initialData, that can be removed
      const [currentClientFiles, setCurrentClientFiles] = React.useState<ClientFile[]>(initialData?.initialClientFiles || []);
  
      const fileInputRef = React.useRef<HTMLInputElement>(null);
  
      React.useEffect(() => {
        setName(initialData?.name || "");
        setDescription(initialData?.description || "");
        setDate(initialData?.dateRange || { from: new Date(), to: addDays(new Date(), 30) });
        setSelectedTeamMemberIds(initialData?.teamMemberIds || []);
        setNewlyAddedFiles([]); // Reset new files when initialData changes
        setCurrentClientFiles(initialData?.initialClientFiles || []);
      }, [initialData]);
  
      useImperativeHandle(ref, () => ({
        getFormData: () => ({
          name,
          description,
          date,
          teamMemberIds: selectedTeamMemberIds,
          newlyAddedFiles,
          currentClientFiles,
        }),
      }));
  
      const handleTeamMemberSelect = (memberId: string) => {
        setSelectedTeamMemberIds((prevSelected) =>
          prevSelected.includes(memberId)
            ? prevSelected.filter((id) => id !== memberId)
            : [...prevSelected, memberId]
        );
      };
  
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          // Append new files to existing newly added files
          setNewlyAddedFiles(prev => [...prev, ...Array.from(event.target.files!)]);
        }
      };
      
      const removeNewFile = (fileName: string) => {
          setNewlyAddedFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
          if (fileInputRef.current) {
              fileInputRef.current.value = ""; // Allow re-selection
          }
      };
  
      const removeClientFile = (fileName: string) => {
          setCurrentClientFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
      };
  
  
      const getSelectedMemberNames = () => {
        if (selectedTeamMemberIds.length === 0) return "Select team members";
        return ALL_TEAM_MEMBERS_FOR_FORM
          .filter(member => selectedTeamMemberIds.includes(member.id))
          .map(member => member.name)
          .join(", ");
      };
      
      const combinedFilesForDisplay = [
          ...currentClientFiles.map(f => ({ name: f.name, isNew: false })),
          ...newlyAddedFiles.map(f => ({ name: f.name, isNew: true })),
      ];
  
      return (
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
            <Label htmlFor="name-formfield" className="text-left md:text-right">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name-formfield"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g., Quantum Leap Website"
              className="col-span-1 md:col-span-3"
              required
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
            <Label htmlFor="description-formfield" className="text-left md:text-right">
              Description
            </Label>
            <Textarea
              id="description-formfield"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of products/services you want to promote....."
              className="col-span-1 md:col-span-3 min-h-[80px] max-h-[120px]"
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
            <Label htmlFor="date-formfield" className="text-left md:text-right">
              Tenure
            </Label>
            <div className="col-span-1 md:col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-formfield"
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <CalendarIcon />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} – {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </div>
                    {(() => {
                      const dayCount =
                        date?.from && date?.to
                          ? differenceInCalendarDays(date.to, date.from) + 1
                          : date?.from
                          ? 1
                          : 0;
                      return (
                        dayCount > 0 && (
                          <span className="ml-4 text-sm font-medium">
                            {dayCount} {dayCount === 1 ? "day" : "days"}
                          </span>
                        )
                      );
                    })()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    disabled={(day) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const referenceDate = initialData?.dateRange?.from || today;
                      return (
                        day < referenceDate &&
                        format(day, "yyyy-MM-dd") !== format(referenceDate, "yyyy-MM-dd")
                      );
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
            <Label htmlFor="team-formfield" className="text-left md:text-right">
              Team
            </Label>
            <div className="col-span-1 md:col-span-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    <span className="truncate">
                      {getSelectedMemberNames()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full md:w-[300px]" align="start">
                  <DropdownMenuLabel>Assign Team Members</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {ALL_TEAM_MEMBERS_FOR_FORM.map((member) => (
                    <DropdownMenuCheckboxItem
                      key={member.id}
                      checked={selectedTeamMemberIds.includes(member.id)}
                      onCheckedChange={() => handleTeamMemberSelect(member.id)}
                      onSelect={(e) => e.preventDefault()}
                    >
                      {member.name} ({member.email})
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-2 md:gap-4">
            <Label htmlFor="files-formfield" className="text-left md:text-right pt-2">
              Project Files
            </Label>
            <div className="col-span-1 md:col-span-3 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start text-left font-normal"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadIcon className="mr-2 h-4 w-4" />
                {combinedFilesForDisplay.length > 0 ? `${combinedFilesForDisplay.length} file(s) total` : "Upload new files"}
              </Button>
              <Input
                id="files-formfield"
                type="file"
                ref={fileInputRef}
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
              />
              {combinedFilesForDisplay.length > 0 && (
                <div className="mt-2 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Files:</p>
                  <div className="flex flex-wrap gap-2">
                    {combinedFilesForDisplay.map((file) => (
                      <Badge key={file.name} variant="secondary" className="flex items-center gap-1.5">
                        <PaperclipIcon className="h-3 w-3" />
                        <span className="truncate max-w-[100px]">{file.name} {!file.isNew && "(existing)"}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 ml-1 cursor-pointer text-gray-400 dark:text-gray-600 hover:text-black"
                          onClick={() => file.isNew ? removeNewFile(file.name) : removeClientFile(file.name)}
                        >
                          <XIcon className="h-3 w-3" />
                          <span className="sr-only">Remove {file.name}</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  );

export default ProjectFormFields;