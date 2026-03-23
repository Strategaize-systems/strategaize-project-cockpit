"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  GitBranch,
  AlertCircle,
  Package,
  Lightbulb,
  ClipboardList,
  Map,
  FileText,
  Compass,
  PanelLeftClose,
  PanelLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProjectSelector } from "@/components/project-selector";
import { app } from "@/lib/theme";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    label: "Projekt",
    items: [
      { label: "Übersicht", href: "/", icon: LayoutDashboard },
      { label: "Features", href: "/features", icon: Layers },
      { label: "Slices", href: "/slices", icon: GitBranch },
      { label: "Probleme", href: "/issues", icon: AlertCircle },
      { label: "Releases & Migrationen", href: "/releases", icon: Package },
      { label: "Entscheidungen & Verbesserungen", href: "/decisions", icon: Lightbulb },
    ],
  },
  {
    label: "Planung",
    items: [
      { label: "Backlog", href: "/backlog", icon: ClipboardList },
      { label: "Roadmap", href: "/roadmap", icon: Map },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Reports", href: "/reports", icon: FileText },
      { label: "Nächster Schritt", href: "/next-step", icon: Compass },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
  mobileOpen: boolean;
  onNavigate: () => void;
}

export function Sidebar({
  collapsed,
  onToggle,
  isMobile,
  mobileOpen,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();

  if (isMobile && !mobileOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-3 top-3 z-30 h-9 w-9 bg-card shadow-sm border border-border/60"
        onClick={onToggle}
        aria-label="Navigation öffnen"
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-200",
        isMobile ? "w-64" : collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Branding Header */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-sidebar-border px-4",
          collapsed && !isMobile ? "justify-center" : "justify-between"
        )}
      >
        {(!collapsed || isMobile) && (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
              S
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-tight truncate text-sidebar-foreground">
                {app.shortName}
              </p>
              <p className="text-[10px] text-sidebar-foreground/50 truncate">
                {app.name}
              </p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={onToggle}
          aria-label={collapsed ? "Sidebar ausklappen" : "Sidebar einklappen"}
        >
          {isMobile ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Project Selector */}
      <ProjectSelector collapsed={collapsed && !isMobile} />

      {/* Separator */}
      <div className="mx-3 border-t border-sidebar-border" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navSections.map((section, sectionIndex) => (
          <div key={section.label} className={sectionIndex > 0 ? "mt-4" : ""}>
            {(!collapsed || isMobile) && (
              <p className="px-3 pb-2 pt-1 text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
                {section.label}
              </p>
            )}
            {collapsed && !isMobile && sectionIndex > 0 && (
              <div className="mx-2 mb-2 border-t border-sidebar-border" />
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-primary/15 text-sidebar-primary-foreground border-l-2 border-sidebar-primary"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        collapsed && !isMobile && "justify-center px-0 border-l-0"
                      )}
                      title={collapsed && !isMobile ? item.label : undefined}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-sidebar-primary")} />
                      {(!collapsed || isMobile) && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-4 py-3">
        {(!collapsed || isMobile) && (
          <p className="text-[10px] text-sidebar-foreground/30">V3.0.0-dev</p>
        )}
      </div>
    </aside>
  );
}
