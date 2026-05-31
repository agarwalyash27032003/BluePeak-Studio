import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../api/contacts.api";
import Table from "../components/ui/Table";
import Pagination from "../components/ui/Pagination";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Modal from "../components/ui/Modal";
import { TableSkeleton } from "../components/ui/Skeleton";
import { formatDate } from "../utils/formatCurrency";
import toast from "react-hot-toast";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetch = (page = 1) => {
    setLoading(true);
    getContacts({ page, limit: 10 })
      .then(({ data }) => {
        setContacts(data.data);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="space-y-4">
      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <Table
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "contactNo", label: "Phone" },
              { key: "createdAt", label: "Date", render: (r) => formatDate(r.createdAt) },
              {
                key: "actions",
                label: "",
                render: (r) => (
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); setSelected(r); }} className="text-xs text-admin-primary">View</button>
                    <button onClick={(e) => { e.stopPropagation(); setDeleteId(r._id); }} className="text-xs text-red-600">Delete</button>
                  </div>
                ),
              },
            ]}
            data={contacts}
          />
          <Pagination page={pagination.page} pages={pagination.pages} onPageChange={fetch} />
        </>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Contact Details">
        {selected && (
          <div className="space-y-3 text-sm">
            <p><strong>Name:</strong> {selected.name}</p>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Phone:</strong> {selected.contactNo}</p>
            <p><strong>Message:</strong></p>
            <p className="rounded-lg bg-admin-muted p-3">{selected.message}</p>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await deleteContact(deleteId);
          toast.success("Deleted");
          setDeleteId(null);
          fetch(pagination.page);
        }}
        message="Delete this contact submission?"
        danger
      />
    </div>
  );
}
