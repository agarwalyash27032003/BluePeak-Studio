import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  CheckCircle,
  AlertTriangle,
  IndianRupee,
  TrendingDown,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import { getDashboard } from "../api/analytics.api";
import { StatCard } from "../components/ui/Card";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { CardSkeleton } from "../components/ui/Skeleton";
import RevenueChart from "../components/charts/RevenueChart";
import ExpenseChart from "../components/charts/ExpenseChart";
import ProfitChart from "../components/charts/ProfitChart";
import ProjectStatusPie from "../components/charts/ProjectStatusPie";
import ServiceRevenueBar from "../components/charts/ServiceRevenueBar";
import { formatCurrency } from "../utils/formatCurrency";
import { getProjectLabel } from "../utils/constants";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(({ data: res }) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const cards = data?.cards || {};

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Projects" value={cards.activeProjects} icon={FolderKanban} />
        <StatCard title="Completed" value={cards.completedProjects} icon={CheckCircle} />
        <StatCard title="Pending Payments" value={formatCurrency(cards.pendingPayments)} icon={Clock} />
        <StatCard title="Partial Payments" value={cards.partialPaymentProjects ?? 0} icon={AlertTriangle} />
        <StatCard title="Total Revenue" value={formatCurrency(cards.totalRevenue)} icon={IndianRupee} />
        <StatCard title="Total Expenses" value={formatCurrency(cards.totalExpenses)} icon={TrendingDown} />
        <StatCard title="Net Profit" value={formatCurrency(cards.netProfit)} icon={TrendingUp} />
        <StatCard title="Freelancers" value={cards.totalFreelancers} icon={Users} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Revenue Overview">
          <RevenueChart data={data?.monthlyRevenue || []} />
        </Card>
        <Card title="Expense Breakdown">
          <ExpenseChart data={data?.monthlyExpenses || []} />
        </Card>
        <Card title="Monthly Profit">
          <ProfitChart data={data?.monthlyProfit || []} />
        </Card>
        <Card title="Project Status">
          <ProjectStatusPie data={data?.workStatusDist} />
        </Card>
      </div>

      <Card title="Service-wise Revenue">
        <ServiceRevenueBar data={data?.serviceDist} />
      </Card>

      <Card
        title="Latest Projects"
        action={
          <Link to="/admin-panel/projects" className="text-sm text-admin-primary hover:underline">
            View all
          </Link>
        }
      >
        <Table
          columns={[
            { key: "client", label: "Client", render: (r) => getProjectLabel(r) },
            { key: "projectType", label: "Type", render: (r) => r.projectType },
            { key: "workStatus", label: "Status", render: (r) => <Badge status={r.workStatus} /> },
            { key: "paymentStatus", label: "Payment", render: (r) => <Badge status={r.paymentStatus} /> },
          ]}
          data={data?.latestProjects || []}
          onRowClick={(r) => (window.location.href = `/admin-panel/projects/${r._id}`)}
        />
      </Card>
    </div>
  );
}
