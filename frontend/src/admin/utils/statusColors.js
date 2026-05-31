const colorMap = {
  Pending: "bg-amber-100 text-amber-800",
  Partial: "bg-blue-100 text-blue-800",
  Paid: "bg-emerald-100 text-emerald-800",
  "Not Started": "bg-slate-100 text-slate-700",
  "In Progress": "bg-blue-100 text-blue-800",
  "Waiting for Client": "bg-purple-100 text-purple-800",
  Revision: "bg-orange-100 text-orange-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Delivered: "bg-teal-100 text-teal-800",
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-800",
  High: "bg-red-100 text-red-800",
  Available: "bg-emerald-100 text-emerald-800",
  Busy: "bg-amber-100 text-amber-800",
  Unavailable: "bg-red-100 text-red-800",
};

export const getStatusColor = (status) =>
  colorMap[status] || "bg-admin-muted text-admin-textMuted";
