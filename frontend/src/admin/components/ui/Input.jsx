export function Input({ label, error, className = "", ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-admin-text">{label}</label>
      )}
      <input
        className="w-full rounded-lg border border-admin-border px-3 py-2 text-sm transition-colors focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:bg-admin-muted"
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = "", ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-admin-text">{label}</label>
      )}
      <textarea
        className="w-full rounded-lg border border-admin-border px-3 py-2 text-sm transition-colors focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
        rows={3}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Select({ label, options, error, className = "", ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-admin-text">{label}</label>
      )}
      <select
        className="w-full rounded-lg border border-admin-border bg-admin-surface px-3 py-2 text-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
