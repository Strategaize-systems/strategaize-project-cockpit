"use client";

import { useProject } from "@/components/project-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderOpen } from "lucide-react";

interface ProjectSelectorProps {
  collapsed: boolean;
}

export function ProjectSelector({ collapsed }: ProjectSelectorProps) {
  const { projects, activeProject, setActiveProject, loading } = useProject();

  if (loading || projects.length === 0) {
    return null;
  }

  if (collapsed) {
    return (
      <div className="flex justify-center py-3" title={activeProject?.name}>
        <FolderOpen className="h-4 w-4 text-sidebar-foreground/50" />
      </div>
    );
  }

  return (
    <div className="px-3 py-3">
      <p className="px-1 pb-1.5 text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
        Projekt
      </p>
      <Select
        value={activeProject?.id ?? ""}
        onValueChange={(id) => {
          const project = projects.find((p) => p.id === id);
          if (project) setActiveProject(project);
        }}
      >
        <SelectTrigger className="h-9 w-full text-xs bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80">
          <SelectValue placeholder="Projekt wählen" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id} className="text-xs">
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
