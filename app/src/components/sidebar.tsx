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
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProjectSelector } from "@/components/project-selector";

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
    label: "Reports & Admin",
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
        "fixed inset-y-0 left-0 z-30 flex flex-col text-white transition-all duration-300",
        isMobile ? "w-64" : collapsed ? "w-16" : "w-64"
      )}
      style={{ background: "linear-gradient(to bottom, #0f172a, #0f172a, #020617)" }}
    >
      {/* Branding Header — Logo + Brand */}
      <div
        className={cn(
          "border-b border-white/8",
          collapsed && !isMobile ? "flex h-16 items-center justify-center px-2" : "px-4 py-4"
        )}
      >
        {(!collapsed || isMobile) && (
          <div className="space-y-3">
            {/* Full Logo — on white background for contrast */}
            <div className="rounded-lg bg-[#e2e8f0] p-2">
              <img
                src="/logo-full.png"
                alt="StrategAIze"
                className="h-14 w-auto object-contain"
              />
            </div>
            {/* Sub-labels */}
            <div className="px-1">
              <p className="text-[14px] font-bold text-white/90">Project Cockpit</p>
              <p className="text-[12px] font-medium text-white/60">Operations Dashboard</p>
            </div>
          </div>
        )}
        {collapsed && !isMobile && (
          <button
            onClick={onToggle}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Sidebar ausklappen"
          >
            <img
              src="/logo-symbol.png"
              alt="StrategAIze"
              className="h-9 w-9 object-contain"
            />
          </button>
        )}
        {(!collapsed || isMobile) && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 text-white/40 hover:text-white hover:bg-white/5 border-0 shadow-none"
            onClick={onToggle}
            aria-label={collapsed ? "Sidebar ausklappen" : "Sidebar einklappen"}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Project Selector */}
      <ProjectSelector collapsed={collapsed && !isMobile} />

      {/* Separator */}
      <div className="mx-3 border-t border-white/8" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5">
        {navSections.map((section, sectionIndex) => (
          <div key={section.label} className={sectionIndex > 0 ? "mt-5" : ""}>
            {(!collapsed || isMobile) && (
              <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                {section.label}
              </p>
            )}
            {collapsed && !isMobile && sectionIndex > 0 && (
              <div className="mx-2 mb-2 border-t border-white/8" />
            )}
            <ul className="space-y-1">
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
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
                        isActive
                          ? "text-white shadow-[0_10px_15px_-3px_rgba(68,84,184,0.25)]"
                          : "text-white/50 hover:bg-white/5 hover:text-white",
                        collapsed && !isMobile && "justify-center px-0"
                      )}
                      style={isActive ? { background: "linear-gradient(to right, #4454b8, #120774)" } : undefined}
                      title={collapsed && !isMobile ? item.label : undefined}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-white")} />
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
      <div className="border-t border-white/8 px-4 py-3">
        {(!collapsed || isMobile) && (
          <div className="flex items-center gap-2">
            <img src="/logo-symbol.png" alt="" className="h-6 w-6 object-contain opacity-60" />
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-white/50 truncate">StrategAIze</p>
              <p className="text-[10px] text-white/25">Version 4.0</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
