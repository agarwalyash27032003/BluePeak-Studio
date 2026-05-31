import { Menu, LogOut, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function Topbar({ onMenuClick, title }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin-panel/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-admin-border bg-admin-surface/95 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-admin-textMuted transition-colors hover:bg-admin-muted lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-admin-text">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-admin-textMuted transition-colors hover:bg-admin-muted">
          <Bell size={18} />
        </button>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-admin-text">{admin?.name}</p>
          <p className="text-xs text-admin-textMuted">{admin?.email}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
