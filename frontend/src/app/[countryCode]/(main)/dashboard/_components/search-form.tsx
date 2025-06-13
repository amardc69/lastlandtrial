import { Search } from "lucide-react"
import { Label } from "@/components/ui/label"
import { SidebarGroup, SidebarGroupContent, SidebarInput } from "@/components/ui/sidebar"
import React, { ChangeEvent } from "react"

interface SearchFormProps extends React.ComponentProps<"form"> {
  onSearchChange?: (value: string) => void;
}

export function SearchForm({ onSearchChange, ...props }: SearchFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  }

  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the modules..."
            className="pl-8 border-gray-300"
            onChange={handleChange}
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
