import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, size = "md" }) {
  if (!open) return null;
  const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-xl bg-admin-surface shadow-xl ${sizes[size]}`}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-admin-border bg-admin-surface px-6 py-4">
          <h2 className="text-lg font-semibold text-admin-text">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-admin-textMuted transition-colors hover:bg-admin-muted"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
