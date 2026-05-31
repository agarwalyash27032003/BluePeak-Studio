import { useState, useEffect } from "react";

import { Input, Textarea, Select } from "../../components/ui/Input";

import {

  PROJECT_TYPES,

  PAYMENT_STATUSES,

  WORK_STATUSES,

  FREELANCER_PAYMENT_STATUSES,

} from "../../utils/constants";

import { getFreelancers } from "../../api/freelancers.api";



const dateFields = [

  "dateOfOnboarding",

  "expectedCompletionDate",

  "actualCompletionDate",

  "advancePaymentDate",

  "fullPaymentDate",

];



const empty = {

  clientName: "",

  businessName: "",

  contactNumber: "",

  email: "",

  projectType: "Website",

  projectDescription: "",

  dateOfOnboarding: "",

  expectedCompletionDate: "",

  actualCompletionDate: "",

  totalAmount: 0,

  advanceReceived: 0,

  advancePaymentDate: "",

  fullPaymentDate: "",

  paymentStatus: "Pending",

  isOutsourced: false,

  freelancerId: "",

  freelancerAssigned: "",

  outsourcingCost: 0,

  amountPaidToFreelancer: 0,

  freelancerPaymentStatus: "Pending",

  workStatus: "Not Started",

  notes: "",

  googleDriveLink: "",

};



export default function ProjectForm({ initial, onSubmit, loading }) {

  const [form, setForm] = useState({ ...empty, ...initial });

  const [freelancers, setFreelancers] = useState([]);



  useEffect(() => {

    if (initial) {

      const mapped = { ...empty, ...initial };

      dateFields.forEach((k) => {

        if (mapped[k]) mapped[k] = mapped[k].slice(0, 10);

      });

      if (mapped.freelancerId?._id) mapped.freelancerId = mapped.freelancerId._id;

      setForm(mapped);

    }

  }, [initial]);



  useEffect(() => {
    if (!form.isOutsourced || !form.projectType) {
      setFreelancers([]);
      return;
    }
    getFreelancers({ limit: 100, skill: form.projectType })
      .then(({ data }) => setFreelancers(data.data))
      .catch(() => setFreelancers([]));
  }, [form.isOutsourced, form.projectType]);



  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));



  const remaining =

    form.paymentStatus === "Paid"

      ? 0

      : Math.max(0, (Number(form.totalAmount) || 0) - (Number(form.advanceReceived) || 0));



  const handlePaymentStatusChange = (status) => {
    setForm((f) => {
      const total = Number(f.totalAmount) || 0;
      if (status === "Paid") {
        return {
          ...f,
          paymentStatus: status,
          advanceReceived: total > 0 ? total : f.advanceReceived,
        };
      }
      return { ...f, paymentStatus: status };
    });
  };



  const handleSubmit = (e) => {

    e.preventDefault();

    const payload = { ...form };

    ["totalAmount", "advanceReceived", "outsourcingCost", "amountPaidToFreelancer"].forEach(

      (k) => (payload[k] = Number(payload[k]) || 0)

    );

    if (payload.paymentStatus === "Paid") {

      payload.remainingAmount = 0;

    }

    if (!payload.freelancerId) delete payload.freelancerId;

    delete payload.projectTitle;

    onSubmit(payload);

  };



  return (

    <form id="project-form" onSubmit={handleSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto pr-2">

      <div className="grid gap-4 sm:grid-cols-2">

        <Input label="Client Name *" value={form.clientName} onChange={(e) => set("clientName", e.target.value)} required />

        <Input label="Business Name" value={form.businessName} onChange={(e) => set("businessName", e.target.value)} />

        <Input label="Contact Number" value={form.contactNumber} onChange={(e) => set("contactNumber", e.target.value)} />

        <Input label="Email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />

        <Select
          label="Project Type *"
          value={form.projectType}
          onChange={(e) => {
            const projectType = e.target.value;
            setForm((f) => ({
              ...f,
              projectType,
              ...(f.isOutsourced ? { freelancerId: "", freelancerAssigned: "" } : {}),
            }));
          }}
          options={PROJECT_TYPES}
        />

      </div>

      <Textarea label="Description" value={form.projectDescription} onChange={(e) => set("projectDescription", e.target.value)} />

      <div className="grid gap-4 sm:grid-cols-3">

        <Input label="Onboarding Date" type="date" value={form.dateOfOnboarding} onChange={(e) => set("dateOfOnboarding", e.target.value)} />

        <Input label="Expected Completion" type="date" value={form.expectedCompletionDate} onChange={(e) => set("expectedCompletionDate", e.target.value)} />

        <Input label="Actual Completion" type="date" value={form.actualCompletionDate} onChange={(e) => set("actualCompletionDate", e.target.value)} />

      </div>

      <div className="grid gap-4 sm:grid-cols-3">

        <Input label="Total Amount" type="number" value={form.totalAmount} onChange={(e) => set("totalAmount", e.target.value)} />

        <Input label="Advance Received" type="number" value={form.advanceReceived} onChange={(e) => set("advanceReceived", e.target.value)} />

        <Input label="Remaining (auto)" type="number" value={remaining} disabled />

      </div>

      <div className="grid gap-4 sm:grid-cols-2">

        <Input label="Advance Payment Date" type="date" value={form.advancePaymentDate} onChange={(e) => set("advancePaymentDate", e.target.value)} />

        <Input label="Full Payment Date" type="date" value={form.fullPaymentDate} onChange={(e) => set("fullPaymentDate", e.target.value)} />

      </div>

      <div className="grid gap-4 sm:grid-cols-2">

        <Select label="Payment Status" value={form.paymentStatus} onChange={(e) => handlePaymentStatusChange(e.target.value)} options={PAYMENT_STATUSES} />

        <Select label="Work Status" value={form.workStatus} onChange={(e) => set("workStatus", e.target.value)} options={WORK_STATUSES} />

      </div>

      <div className="rounded-lg border border-admin-border p-4">

        <label className="flex items-center gap-2 text-sm font-medium">

          <input type="checkbox" checked={form.isOutsourced} onChange={(e) => set("isOutsourced", e.target.checked)} />

          Outsourced Project

        </label>

        {form.isOutsourced && (

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            <Select
              label="Freelancer"
              value={form.freelancerId}
              onChange={(e) => {
                const id = e.target.value;
                const selected = freelancers.find((f) => f._id === id);
                setForm((f) => ({
                  ...f,
                  freelancerId: id,
                  freelancerAssigned: selected?.name || "",
                }));
              }}
              options={[
                { value: "", label: "None" },
                ...freelancers.map((f) => ({ value: f._id, label: f.name })),
              ]}
            />
            {freelancers.length === 0 && (
              <p className="text-xs text-amber-700 sm:col-span-2">
                No freelancers with skill &quot;{form.projectType}&quot;. Add one in Freelancers with this skill selected.
              </p>
            )}

            <Input label="Freelancer Name" value={form.freelancerAssigned} onChange={(e) => set("freelancerAssigned", e.target.value)} />

            <Input label="Outsourcing Cost" type="number" value={form.outsourcingCost} onChange={(e) => set("outsourcingCost", e.target.value)} />

            <Input label="Paid to Freelancer" type="number" value={form.amountPaidToFreelancer} onChange={(e) => set("amountPaidToFreelancer", e.target.value)} />

            <Select label="Freelancer Payment" value={form.freelancerPaymentStatus} onChange={(e) => set("freelancerPaymentStatus", e.target.value)} options={FREELANCER_PAYMENT_STATUSES} />

          </div>

        )}

      </div>

      <Input label="Google Drive Link" value={form.googleDriveLink} onChange={(e) => set("googleDriveLink", e.target.value)} />

      <Textarea label="Notes" value={form.notes} onChange={(e) => set("notes", e.target.value)} />

      <button type="submit" disabled={loading} className="hidden" />

    </form>

  );

}

