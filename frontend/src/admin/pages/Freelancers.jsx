import { useEffect, useState } from "react";
import { Plus, Wallet } from "lucide-react";
import {
  getFreelancers,
  createFreelancer,
  updateFreelancer,
  deleteFreelancer,
  getFreelancerPayments,
  getFreelancerProjects,
  recordFreelancerPayment,
} from "../api/freelancers.api";
import { useDebounce } from "../hooks/useDebounce";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import Table from "../components/ui/Table";
import Pagination from "../components/ui/Pagination";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Card from "../components/ui/Card";
import { Input, Textarea, Select } from "../components/ui/Input";
import SkillsMultiSelect from "../components/ui/SkillsMultiSelect";
import { AVAILABILITY, PAID_VIA } from "../utils/constants";
import { formatCurrency, formatDate } from "../utils/formatCurrency";
import { TableSkeleton } from "../components/ui/Skeleton";
import toast from "react-hot-toast";

const empty = {
  name: "",
  skills: [],
  contactNumber: "",
  email: "",
  address: "",
  pricing: "",
  availabilityStatus: "Available",
  notes: "",
};

const emptyPayment = {
  amount: "",
  paymentDate: new Date().toISOString().slice(0, 10),
  paidVia: "UPI",
  notes: "",
};

export default function Freelancers() {
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [paying, setPaying] = useState(null);
  const [form, setForm] = useState(empty);
  const [paymentForm, setPaymentForm] = useState(emptyPayment);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [payFinancials, setPayFinancials] = useState(null);
  const [outsourcedProjects, setOutsourcedProjects] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const debouncedSearch = useDebounce(search);

  const fetch = (page = 1) => {
    setLoading(true);
    getFreelancers({ page, limit: 10, search: debouncedSearch })
      .then(({ data }) => {
        setList(data.data);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch(1);
  }, [debouncedSearch]);

  const toPayload = () => ({
    name: form.name,
    skills: Array.isArray(form.skills) ? form.skills : [],
    contactNumber: form.contactNumber,
    email: form.email,
    address: form.address,
    pricing: form.pricing,
    availabilityStatus: form.availabilityStatus,
    notes: form.notes,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.skills?.length) {
      toast.error("Select at least one skill");
      return;
    }
    setSubmitting(true);
    try {
      if (editing) {
        await updateFreelancer(editing._id, toPayload());
        toast.success("Freelancer updated");
      } else {
        await createFreelancer(toPayload());
        toast.success("Freelancer added");
      }
      setModalOpen(false);
      setEditing(null);
      fetch(pagination.page);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setSubmitting(false);
    }
  };

  const openPayModal = async (freelancer) => {
    setPaying(freelancer);
    setPaymentForm({
      ...emptyPayment,
      amount: freelancer.amountDue > 0 ? String(freelancer.amountDue) : "",
    });
    setPayModalOpen(true);
    try {
      const [payRes, projRes] = await Promise.all([
        getFreelancerPayments(freelancer._id),
        getFreelancerProjects(freelancer._id),
      ]);
      setPaymentHistory(payRes.data.data.payments);
      setPayFinancials(payRes.data.data.financials);
      setOutsourcedProjects(projRes.data.data);
    } catch {
      toast.error("Failed to load payment details");
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!paying) return;
    setSubmitting(true);
    try {
      await recordFreelancerPayment(paying._id, {
        amount: Number(paymentForm.amount),
        paymentDate: paymentForm.paymentDate,
        paidVia: paymentForm.paidVia,
        notes: paymentForm.notes,
      });
      toast.success("Payment recorded");
      setPayModalOpen(false);
      setPaying(null);
      fetch(pagination.page);
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-admin-textMuted">
        Total owed is calculated from outsourced project costs. Record payments here to update the balance due.
      </p>

      <div className="flex gap-3">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Search freelancers..." />
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setForm(empty);
            setModalOpen(true);
          }}
        >
          <Plus size={18} /> Add Freelancer
        </Button>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <Table
            columns={[
              { key: "name", label: "Name" },
              { key: "contactNumber", label: "Contact" },
              { key: "skills", label: "Skills", render: (r) => (r.skills || []).slice(0, 2).join(", ") },
              { key: "totalProjectsAssigned", label: "Projects" },
              { key: "totalOwed", label: "Total Owed", render: (r) => formatCurrency(r.totalOwed) },
              { key: "totalPaid", label: "Paid", render: (r) => formatCurrency(r.totalPaid) },
              {
                key: "amountDue",
                label: "Due",
                render: (r) => (
                  <span className={r.amountDue > 0 ? "font-semibold text-amber-700" : "text-emerald-700"}>
                    {formatCurrency(r.amountDue)}
                  </span>
                ),
              },
              {
                key: "actions",
                label: "",
                render: (r) => (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openPayModal(r);
                      }}
                      className="text-xs font-medium text-admin-primary hover:underline"
                    >
                      Pay
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditing(r);
                        setForm({
                          ...empty,
                          ...r,
                          skills: r.skills || [],
                        });
                        setModalOpen(true);
                      }}
                      className="text-xs text-admin-textMuted hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(r._id);
                      }}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
            data={list}
          />
          <Pagination page={pagination.page} pages={pagination.pages} onPageChange={fetch} />
        </>
      )}

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        title={editing ? "Edit Freelancer" : "Add Freelancer"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <SkillsMultiSelect
            value={form.skills}
            onChange={(skills) => setForm({ ...form, skills })}
            required
          />
          <Input label="Contact Number" value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <Input label="Pricing / Rate" value={form.pricing} onChange={(e) => setForm({ ...form, pricing: e.target.value })} placeholder="e.g. ₹5000 per logo" />
          <Select label="Availability" value={form.availabilityStatus} onChange={(e) => setForm({ ...form, availabilityStatus: e.target.value })} options={AVAILABILITY} />
          <Textarea label="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <Button type="submit" loading={submitting} className="w-full">
            {editing ? "Save Changes" : "Add Freelancer"}
          </Button>
        </form>
      </Modal>

      <Modal
        open={payModalOpen}
        onClose={() => {
          setPayModalOpen(false);
          setPaying(null);
        }}
        title={paying ? `Pay — ${paying.name}` : "Make Payment"}
        size="xl"
      >
        {payFinancials && (
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <Card className="!p-4">
              <p className="text-xs text-admin-textMuted">Total Owed</p>
              <p className="text-lg font-bold">{formatCurrency(payFinancials.totalOwed)}</p>
            </Card>
            <Card className="!p-4">
              <p className="text-xs text-admin-textMuted">Total Paid</p>
              <p className="text-lg font-bold text-emerald-700">{formatCurrency(payFinancials.totalPaid)}</p>
            </Card>
            <Card className="!p-4">
              <p className="text-xs text-admin-textMuted">Amount Due</p>
              <p className="text-lg font-bold text-amber-700">{formatCurrency(payFinancials.amountDue)}</p>
            </Card>
          </div>
        )}

        {outsourcedProjects.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold text-admin-text">Outsourced Projects</h3>
            <div className="overflow-x-auto rounded-lg border border-admin-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-admin-muted">
                  <tr>
                    <th className="px-3 py-2">Client</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {outsourcedProjects.map((p) => (
                    <tr key={p._id} className="border-t border-admin-border">
                      <td className="px-3 py-2">{p.clientName}</td>
                      <td className="px-3 py-2">{p.projectType}</td>
                      <td className="px-3 py-2">{formatCurrency(p.outsourcingCost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <form onSubmit={handlePayment} className="space-y-4 rounded-lg border border-admin-border bg-admin-muted/50 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-admin-text">
            <Wallet size={16} /> Record Payment
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Amount *"
              type="number"
              min="1"
              max={payFinancials?.amountDue}
              value={paymentForm.amount}
              onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
              required
              disabled={!payFinancials?.amountDue}
            />
            <Input
              label="Payment Date *"
              type="date"
              value={paymentForm.paymentDate}
              onChange={(e) => setPaymentForm({ ...paymentForm, paymentDate: e.target.value })}
              required
            />
          </div>
          <Select
            label="Paid Via"
            value={paymentForm.paidVia}
            onChange={(e) => setPaymentForm({ ...paymentForm, paidVia: e.target.value })}
            options={PAID_VIA}
          />
          <Textarea label="Notes" value={paymentForm.notes} onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })} />
          <Button
            type="submit"
            loading={submitting}
            disabled={!payFinancials?.amountDue}
            className="w-full"
          >
            {payFinancials?.amountDue ? "Record Payment" : "Nothing Due"}
          </Button>
        </form>

        {paymentHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-admin-text">Payment History</h3>
            <ul className="divide-y divide-admin-border rounded-lg border border-admin-border">
              {paymentHistory.map((p) => (
                <li key={p._id} className="flex justify-between px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium">{formatCurrency(p.amount)}</p>
                    <p className="text-xs text-admin-textMuted">
                      {formatDate(p.paymentDate)} · {p.paidVia}
                      {p.notes ? ` · ${p.notes}` : ""}
                    </p>
                  </div>
                  <span className="text-xs text-admin-textMuted">{p.recordedBy}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await deleteFreelancer(deleteId);
          toast.success("Deleted");
          setDeleteId(null);
          fetch(pagination.page);
        }}
        message="Delete this freelancer and all payment records?"
        danger
      />
    </div>
  );
}
