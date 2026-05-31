export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-admin-border py-16 text-center">
      {Icon && <Icon size={48} className="mb-4 text-admin-textMuted opacity-50" />}
      <h3 className="text-lg font-semibold text-admin-text">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-admin-textMuted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
