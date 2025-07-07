import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Users,
  MessageSquare,
  Building,
  AlertTriangle,
  HelpCircle,
  Tags,
  Home,
  Menu,
  GraduationCap,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Users", href: "/users", icon: Users },
  { name: "Posts", href: "/posts", icon: MessageSquare },
  { name: "Academic Structure", href: "/academic", icon: Building },
  { name: "Reports", href: "/reports", icon: AlertTriangle },
  { name: "Questions", href: "/questions", icon: HelpCircle },
  { name: "Tags", href: "/tags", icon: Tags },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <div
      className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300 shrink-0",
        sidebarCollapsed ? "w-16" : "w-72"
      )}
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex items-center gap-3 transition-opacity",
              sidebarCollapsed ? "opacity-0" : "opacity-100"
            )}
          >
            <GraduationCap className="h-8 w-8 text-primary shrink-0" />
            <h1 className="text-xl font-bold text-foreground">GradBook</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-2 hover:bg-accent"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <nav className="space-y-2 py-6">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  sidebarCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!sidebarCollapsed && (
                  <span className="truncate">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
