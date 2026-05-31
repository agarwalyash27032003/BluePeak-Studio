export default function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      {label && (
        <label className="mb-1 block text-xs font-medium text-admin-textMuted">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-admin-border bg-admin-surface px-3 py-2 text-sm transition-colors focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
