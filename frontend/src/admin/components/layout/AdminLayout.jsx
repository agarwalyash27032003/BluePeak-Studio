import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const titles = {
  dashboard: "Dashboard",
  projects: "Projects",
  expenses: "Expenses",
  freelancers: "Freelancers",
  pl: "Profit & Loss",
  contacts: "Contact Submissions",
  search: "Global Search",
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const segment = location.pathname.split("/").pop() || "dashboard";
  const title = titles[segment] || "Admin";

  return (
    <div className="flex min-h-screen bg-admin-muted">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col lg:ml-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
