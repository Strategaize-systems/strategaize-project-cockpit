"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { ProjectProvider, useProject } from "@/components/project-context";
import { cn } from "@/lib/utils";

const MOBILE_BREAKPOINT = 768;

function ShellContent({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { noProjectsConfigured, loading } = useProject();

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
        setMobileOpen(false);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        collapsed={isMobile ? false : collapsed}
        onToggle={() => {
          if (isMobile) {
            setMobileOpen(!mobileOpen);
          } else {
            setCollapsed(!collapsed);
          }
        }}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onNavigate={() => {
          if (isMobile) setMobileOpen(false);
        }}
      />

      <main
        className={cn(
          "flex-1 min-h-screen overflow-y-auto transition-all duration-200",
          isMobile ? "ml-0" : collapsed ? "ml-16" : "ml-64"
        )}
      >
        <div className={cn(
          "mx-auto max-w-5xl px-6 py-8 lg:px-8",
          isMobile && "pt-14"
        )}>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-sm text-muted-foreground">Wird geladen...</p>
            </div>
          ) : noProjectsConfigured ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold">Keine Projekte konfiguriert</p>
                <p className="text-sm text-muted-foreground">
                  Projektpfade in der Konfigurationsdatei
                  (projects.config.json) hinterlegen.
                </p>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ProjectProvider>
      <ShellContent>{children}</ShellContent>
    </ProjectProvider>
  );
}
