import { getStatusColor } from "../../utils/statusColors";

export default function Badge({ status, children }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}
    >
      {children || status}
    </span>
  );
}
