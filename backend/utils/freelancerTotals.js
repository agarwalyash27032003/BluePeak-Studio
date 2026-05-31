const mongoose = require("mongoose");
const Project = require("../models/Project");
const FreelancerPayment = require("../models/FreelancerPayment");

const getFinancialsForFreelancer = async (freelancerId) => {
  const id = new mongoose.Types.ObjectId(freelancerId);

  const [projectStats, paymentStats] = await Promise.all([
    Project.aggregate([
      { $match: { freelancerId: id, isOutsourced: true } },
      {
        $group: {
          _id: null,
          totalOwed: { $sum: "$outsourcingCost" },
          projectCount: { $sum: 1 },
        },
      },
    ]),
    FreelancerPayment.aggregate([
      { $match: { freelancerId: id } },
      { $group: { _id: null, totalPaid: { $sum: "$amount" } } },
    ]),
  ]);

  const totalOwed = projectStats[0]?.totalOwed || 0;
  const totalPaid = paymentStats[0]?.totalPaid || 0;
  const amountDue = Math.max(0, totalOwed - totalPaid);

  return {
    totalOwed,
    totalPaid,
    amountDue,
    outsourcedProjects: projectStats[0]?.projectCount || 0,
  };
};

const attachFinancialsToList = async (freelancers) => {
  if (!freelancers.length) return [];

  const ids = freelancers.map((f) => f._id);

  const [owedRows, paidRows] = await Promise.all([
    Project.aggregate([
      { $match: { freelancerId: { $in: ids }, isOutsourced: true } },
      { $group: { _id: "$freelancerId", totalOwed: { $sum: "$outsourcingCost" } } },
    ]),
    FreelancerPayment.aggregate([
      { $match: { freelancerId: { $in: ids } } },
      { $group: { _id: "$freelancerId", totalPaid: { $sum: "$amount" } } },
    ]),
  ]);

  const owedMap = Object.fromEntries(owedRows.map((r) => [r._id.toString(), r.totalOwed]));
  const paidMap = Object.fromEntries(paidRows.map((r) => [r._id.toString(), r.totalPaid]));

  return freelancers.map((f) => {
    const doc = f.toObject ? f.toObject() : { ...f };
    const totalOwed = owedMap[f._id.toString()] || 0;
    const totalPaid = paidMap[f._id.toString()] || 0;
    return {
      ...doc,
      totalOwed,
      totalPaid,
      amountDue: Math.max(0, totalOwed - totalPaid),
    };
  });
};

module.exports = { getFinancialsForFreelancer, attachFinancialsToList };
