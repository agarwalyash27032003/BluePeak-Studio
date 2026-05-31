import { PROJECT_TYPES } from "../../utils/constants";

export default function SkillsMultiSelect({ label = "Skills", value = [], onChange, required }) {
  const selected = Array.isArray(value) ? value : [];

  const toggle = (skill) => {
    if (selected.includes(skill)) {
      onChange(selected.filter((s) => s !== skill));
    } else {
      onChange([...selected, skill]);
    }
  };

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-admin-text">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <p className="mb-3 text-xs text-admin-textMuted">
        Select services this freelancer can handle (same as project types).
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {PROJECT_TYPES.map((skill) => {
          const checked = selected.includes(skill);
          return (
            <label
              key={skill}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                checked
                  ? "border-admin-primary bg-blue-50 text-admin-primary"
                  : "border-admin-border bg-admin-surface hover:border-blue-200"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(skill)}
                className="h-4 w-4 rounded border-admin-border text-admin-primary focus:ring-blue-200"
              />
              <span>{skill}</span>
            </label>
          );
        })}
      </div>
      {required && selected.length === 0 && (
        <p className="mt-2 text-xs text-amber-700">Select at least one skill</p>
      )}
    </div>
  );
}
