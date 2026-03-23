"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Project } from "@/lib/projects";

export type { Project };

interface ProjectContextValue {
  projects: Project[];
  activeProject: Project | null;
  setActiveProject: (project: Project) => void;
  loading: boolean;
  noProjectsConfigured: boolean;
}

const ProjectContext = createContext<ProjectContextValue>({
  projects: [],
  activeProject: null,
  setActiveProject: () => {},
  loading: true,
  noProjectsConfigured: false,
});

const STORAGE_KEY = "cockpit-active-project-id";

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProjectState] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: { projects: Project[] }) => {
        const list = data.projects ?? [];
        setProjects(list);

        if (list.length === 0) {
          setLoading(false);
          return;
        }

        // Restore last selection from localStorage
        const storedId =
          typeof window !== "undefined"
            ? localStorage.getItem(STORAGE_KEY)
            : null;
        const restored = list.find((p) => p.id === storedId);
        setActiveProjectState(restored ?? list[0]);
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, []);

  const setActiveProject = useCallback(
    (project: Project) => {
      setActiveProjectState(project);
      localStorage.setItem(STORAGE_KEY, project.id);
    },
    []
  );

  const noProjectsConfigured = !loading && projects.length === 0;

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        setActiveProject,
        loading,
        noProjectsConfigured,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return useContext(ProjectContext);
}
