import fs from "fs";
import path from "path";

export interface Project {
  id: string;
  name: string;
  path: string;
}

export interface ProjectsConfig {
  projects: Project[];
}

const CONFIG_PATH = path.join(process.cwd(), "projects.config.json");

export function isRegisteredProject(projectPath: string): boolean {
  const projects = readProjectsConfig();
  return projects.some(
    (p) => p.path.replace(/\\/g, "/").toLowerCase() === projectPath.replace(/\\/g, "/").toLowerCase()
  );
}

export function readProjectsConfig(): Project[] {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    const parsed: ProjectsConfig = JSON.parse(raw);
    if (!parsed.projects || !Array.isArray(parsed.projects)) {
      return [];
    }
    return parsed.projects.filter(
      (p) => p.id && p.name && p.path
    );
  } catch {
    return [];
  }
}
