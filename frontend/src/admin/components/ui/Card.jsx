export default function Card({ children, className = "", title, action }) {
  return (
    <div
      className={`rounded-xl border border-admin-border bg-admin-surface p-5 shadow-sm transition-shadow duration-200 hover:shadow-md ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="text-lg font-semibold text-admin-text">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function StatCard({ title, value, icon: Icon, trend, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-admin-border bg-admin-surface p-5 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-admin-textMuted">{title}</p>
          <p className="mt-1 text-2xl font-bold text-admin-text">{value}</p>
          {trend && <p className="mt-1 text-xs text-admin-textMuted">{trend}</p>}
        </div>
        {Icon && (
          <div className="rounded-lg bg-blue-50 p-2.5 text-admin-primary">
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
