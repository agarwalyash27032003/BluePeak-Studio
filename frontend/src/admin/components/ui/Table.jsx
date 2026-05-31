export default function Table({ columns, data, onRowClick, emptyMessage = "No data found" }) {
  if (!data?.length) {
    return (
      <div className="rounded-lg border border-admin-border bg-admin-muted/50 py-12 text-center text-admin-textMuted">
        {emptyMessage}
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-admin-border">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b border-admin-border bg-admin-muted">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-semibold text-admin-textMuted"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row._id || i}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-admin-border transition-colors last:border-0 ${
                onRowClick ? "cursor-pointer hover:bg-blue-50/50" : ""
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-admin-text">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
