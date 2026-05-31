import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
} from "../api/expenses.api";
import { useDebounce } from "../hooks/useDebounce";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import FilterSelect from "../components/ui/FilterSelect";
import Table from "../components/ui/Table";
import Pagination from "../components/ui/Pagination";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { Input, Textarea, Select } from "../components/ui/Input";
import Card, { StatCard } from "../components/ui/Card";
import { EXPENSE_CATEGORIES, PAID_VIA } from "../utils/constants";
import { formatCurrency, formatDate } from "../utils/formatCurrency";
import { TableSkeleton } from "../components/ui/Skeleton";
import toast from "react-hot-toast";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#64748b", "#06b6d4", "#84cc16"];

const emptyExpense = {
  title: "",
  amount: "",
  category: EXPENSE_CATEGORIES[0],
  expenseDate: new Date().toISOString().slice(0, 10),
  paidVia: "UPI",
  notes: "",
  receipt: null,
};

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyExpense);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const debouncedSearch = useDebounce(search);

  const fetch = (page = 1) => {
    setLoading(true);
    const now = new Date();
    Promise.all([
      getExpenses({ page, limit: 10, search: debouncedSearch, category }),
      getExpenseSummary({ month: now.getMonth() + 1, year: now.getFullYear() }),
    ])
      .then(([exp, sum]) => {
        setExpenses(exp.data.data);
        setPagination(exp.data.pagination);
        setSummary(sum.data.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch(1);
  }, [debouncedSearch, category]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyExpense);
    setModalOpen(true);
  };

  const openEdit = (exp) => {
    setEditing(exp);
    setForm({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      expenseDate: exp.expenseDate?.slice(0, 10),
      paidVia: exp.paidVia,
      notes: exp.notes || "",
      receipt: null,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        await updateExpense(editing._id, form);
        toast.success("Expense updated");
      } else {
        await createExpense(form);
        toast.success("Expense added");
      }
      setModalOpen(false);
      fetch(pagination.page);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteExpense(deleteId);
      toast.success("Deleted");
      setDeleteId(null);
      fetch(pagination.page);
    } catch {
      toast.error("Delete failed");
    }
  };

  const pieData = (summary?.byCategory || []).map((c) => ({
    name: c._id,
    value: c.total,
  }));

  return (
    <div className="space-y-6">
      <StatCard title="This Month's Expenses" value={formatCurrency(summary?.total || 0)} />

      {pieData.length > 0 && (
        <Card title="Category Breakdown">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(v)} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      )}

      <div className="flex flex-wrap gap-3">
        <div className="min-w-[200px] flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Search expenses..." />
        </div>
        <FilterSelect value={category} onChange={setCategory} options={EXPENSE_CATEGORIES} />
        <Button onClick={openCreate}><Plus size={18} /> Add Expense</Button>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <Table
            columns={[
              { key: "title", label: "Title" },
              { key: "category", label: "Category" },
              { key: "amount", label: "Amount", render: (r) => formatCurrency(r.amount) },
              { key: "expenseDate", label: "Date", render: (r) => formatDate(r.expenseDate) },
              { key: "paidVia", label: "Paid Via" },
              {
                key: "actions",
                label: "",
                render: (r) => (
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); openEdit(r); }} className="text-xs text-admin-primary hover:underline">Edit</button>
                    <button onClick={(e) => { e.stopPropagation(); setDeleteId(r._id); }} className="text-xs text-red-600 hover:underline">Delete</button>
                  </div>
                ),
              },
            ]}
            data={expenses}
          />
          <Pagination page={pagination.page} pages={pagination.pages} onPageChange={fetch} />
        </>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Expense" : "Add Expense"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="Amount *" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} options={EXPENSE_CATEGORIES} />
          <Input label="Date" type="date" value={form.expenseDate} onChange={(e) => setForm({ ...form, expenseDate: e.target.value })} />
          <Select label="Paid Via" value={form.paidVia} onChange={(e) => setForm({ ...form, paidVia: e.target.value })} options={PAID_VIA} />
          <div>
            <label className="mb-1 block text-sm font-medium">Receipt</label>
            <input type="file" onChange={(e) => setForm({ ...form, receipt: e.target.files[0] })} className="text-sm" />
          </div>
          <Textarea label="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <Button type="submit" loading={submitting} className="w-full">{editing ? "Update" : "Create"}</Button>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} message="Delete this expense?" danger />
    </div>
  );
}
