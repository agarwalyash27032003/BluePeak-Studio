import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, FileText, Pencil } from "lucide-react";
import { getProject, updateProject } from "../../api/projects.api";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import ProjectForm from "./ProjectForm";
import { getProjectLabel } from "../../utils/constants";
import { formatCurrency, formatDate } from "../../utils/formatCurrency";
import { CardSkeleton } from "../../components/ui/Skeleton";
import toast from "react-hot-toast";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    getProject(id)
      .then(({ data }) => setProject(data.data))
      .catch(() => toast.error("Project not found"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleUpdate = async (payload) => {
    setSubmitting(true);
    try {
      await updateProject(id, payload);
      toast.success("Project updated");
      setEditOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CardSkeleton />;
  if (!project) return null;

  const fields = [
    ["Client", project.clientName],
    ["Business", project.businessName],
    ["Contact", project.contactNumber],
    ["Email", project.email],
    ["Type", project.projectType],
    ["Onboarding", formatDate(project.dateOfOnboarding)],
    ["Expected End", formatDate(project.expectedCompletionDate)],
    ["Actual End", formatDate(project.actualCompletionDate)],
    ["Total", formatCurrency(project.totalAmount)],
    ["Advance", formatCurrency(project.advanceReceived)],
    ["Remaining", formatCurrency(project.paymentStatus === "Paid" ? 0 : project.remainingAmount)],
    ["Advance Payment Date", formatDate(project.advancePaymentDate)],
    ["Full Payment Date", formatDate(project.fullPaymentDate)],
    ["Outsourced", project.isOutsourced ? "Yes" : "No"],
    ["Freelancer", project.freelancerId?.name || project.freelancerAssigned || "—"],
    ["Drive Link", project.googleDriveLink || "—"],
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={() => navigate("/admin-panel/projects")}>
          <ArrowLeft size={18} /> Back
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-admin-text">{getProjectLabel(project)}</h2>
          <p className="text-sm text-admin-textMuted">{project.projectType}</p>
        </div>
        <Badge status={project.workStatus} />
        <Badge status={project.paymentStatus} />
        <Button variant="secondary" onClick={() => setEditOpen(true)}>
          <Pencil size={16} /> Edit
        </Button>
        <Link to={`/admin-panel/projects/${id}/documents`}>
          <Button>
            <FileText size={16} /> Documents
          </Button>
        </Link>
      </div>

      {project.projectDescription && (
        <Card title="Description">
          <p className="text-sm text-admin-textMuted">{project.projectDescription}</p>
        </Card>
      )}

      <Card title="Details">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-medium text-admin-textMuted">{label}</dt>
              <dd className="mt-0.5 text-sm text-admin-text">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      {project.notes && (
        <Card title="Notes">
          <p className="text-sm">{project.notes}</p>
        </Card>
      )}

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Project" size="xl">
        <ProjectForm initial={project} onSubmit={handleUpdate} loading={submitting} />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button type="submit" form="project-form" loading={submitting}>Save Changes</Button>
        </div>
      </Modal>
    </div>
  );
}
