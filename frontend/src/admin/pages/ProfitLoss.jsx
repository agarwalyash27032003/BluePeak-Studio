import { useEffect, useState } from "react";
import { getPL } from "../api/analytics.api";
import Card, { StatCard } from "../components/ui/Card";
import { CardSkeleton } from "../components/ui/Skeleton";
import RevenueChart from "../components/charts/RevenueChart";
import ExpenseChart from "../components/charts/ExpenseChart";
import ServiceRevenueBar from "../components/charts/ServiceRevenueBar";
import { formatCurrency } from "../utils/formatCurrency";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ProfitLoss() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPL()
      .then(({ data: res }) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const monthlyChart = (data?.monthly || []).map((m) => ({
    name: m.month,
    revenue: m.revenue,
    expenses: m.expenses,
    freelancerCosts: m.freelancerCosts,
    profit: m.profit,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Revenue" value={formatCurrency(data?.totalRevenue)} />
        <StatCard title="Total Expenses" value={formatCurrency(data?.totalExpenses)} />
        <StatCard title="Freelancer Costs" value={formatCurrency(data?.freelancerCosts)} />
        <StatCard title="Gross Profit" value={formatCurrency(data?.grossProfit)} />
        <StatCard title="Net Profit" value={formatCurrency(data?.netProfit)} />
        <StatCard title="Pending Payments" value={formatCurrency(data?.pendingPayments)} />
      </div>
      <p className="text-sm text-admin-textMuted">
        Freelancer costs are the total outsourcing cost on outsourced projects. Net profit = revenue − expenses − freelancer costs.
      </p>

      <Card title="Monthly Revenue vs Expenses">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis />
            <Tooltip formatter={(v) => formatCurrency(v)} />
            <Legend />
            <Bar dataKey="revenue" fill="#2563eb" name="Revenue" />
            <Bar dataKey="expenses" fill="#94a3b8" name="Expenses" />
            <Bar dataKey="freelancerCosts" fill="#f59e0b" name="Freelancer Costs" />
            <Bar dataKey="profit" fill="#10b981" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Revenue Trend">
          <RevenueChart data={monthlyChart.map((m) => ({ name: m.name, value: m.revenue }))} />
        </Card>
        <Card title="Expense Trend">
          <ExpenseChart data={monthlyChart.map((m) => ({ name: m.name, value: m.expenses }))} />
        </Card>
      </div>

      <Card title="Service-wise Revenue">
        <ServiceRevenueBar data={data?.serviceRevenue} />
      </Card>
    </div>
  );
}
