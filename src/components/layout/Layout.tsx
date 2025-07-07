import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="h-full">
              <div className="w-full max-w-[1600px] mx-auto px-8 py-8 h-full">
                <div className="h-full w-full">
                  <Outlet />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
