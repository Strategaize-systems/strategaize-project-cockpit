import fs from "fs";
import path from "path";

/**
 * Read a file from a project directory. Returns null if file doesn't exist or is unreadable.
 */
export function readProjectFile(
  projectPath: string,
  filePath: string
): string | null {
  try {
    const fullPath = path.join(projectPath, filePath);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    return fs.readFileSync(fullPath, "utf-8");
  } catch {
    return null;
  }
}

/**
 * Check if a project directory is accessible.
 */
export function isProjectAccessible(projectPath: string): boolean {
  try {
    return fs.existsSync(projectPath) && fs.statSync(projectPath).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Extract the content of a specific ## section from markdown.
 * Returns the text between the matched heading and the next ## heading (or EOF).
 */
export function extractSection(
  markdown: string,
  sectionName: string
): string | null {
  const lines = markdown.split("\n").map((l) => l.replace(/\r$/, ""));
  let capturing = false;
  const result: string[] = [];

  for (const line of lines) {
    if (line.match(/^## /)) {
      if (capturing) break;
      if (line.replace(/^## /, "").trim().toLowerCase() === sectionName.toLowerCase()) {
        capturing = true;
        continue;
      }
    }
    if (capturing) {
      result.push(line);
    }
  }

  if (result.length === 0) return null;
  return result.join("\n").trim();
}

/**
 * Parse "- Key: Value" lines from a markdown section into a key-value map.
 */
export function parseKeyValueLines(
  sectionContent: string
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of sectionContent.split("\n")) {
    const match = line.match(/^-\s+(.+?):\s+(.+)$/);
    if (match) {
      result[match[1].trim()] = match[2].trim();
    }
  }
  return result;
}

/**
 * Parse list items (- item or 1. item) from a markdown section.
 */
export function parseListItems(sectionContent: string): string[] {
  const items: string[] = [];
  for (const line of sectionContent.split("\n")) {
    const match = line.match(/^(?:-|\d+\.)\s+(.+)$/);
    if (match) {
      items.push(match[1].trim());
    }
  }
  return items;
}

/**
 * Extract the first paragraph(s) after a ## heading, stopping at the next ## or end.
 * Returns plain text content (no headings, no lists).
 */
export function extractParagraphs(sectionContent: string): string {
  const lines = sectionContent.split("\n");
  const paragraphs: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") {
      if (paragraphs.length > 0) continue;
      continue;
    }
    if (trimmed.startsWith("#")) break;
    if (trimmed.match(/^(-|\d+\.)\s/)) continue;
    paragraphs.push(trimmed);
  }

  return paragraphs.join(" ").trim();
}
