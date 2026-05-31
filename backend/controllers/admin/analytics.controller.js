const Project = require("../../models/Project");

const Expense = require("../../models/Expense");

const Freelancer = require("../../models/Freelancer");

const asyncHandler = require("../../utils/asyncHandler");

const { sumRecognizedRevenue, sumRecognizedRevenueByField, recognizedRevenueExpr } = require("../../utils/revenue");
const { sumOutsourcingCost, outsourcedCostMatch } = require("../../utils/freelancerCosts");



const last12MonthsRange = () => {

  const months = [];

  const now = new Date();

  for (let i = 11; i >= 0; i--) {

    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

    months.push({

      year: d.getFullYear(),

      month: d.getMonth() + 1,

      label: d.toLocaleString("default", { month: "short", year: "2-digit" }),

      start: new Date(d.getFullYear(), d.getMonth(), 1),

      end: new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59),

    });

  }

  return months;

};



const getDashboard = asyncHandler(async (req, res) => {

  const [

    activeProjects,

    completedProjects,

    partialPaymentProjects,

    pendingPaymentsAgg,

    revenueAgg,

    expenseAgg,

    freelancerCostAgg,

    freelancerCount,

    latestProjects,

  ] = await Promise.all([

    Project.countDocuments({ workStatus: { $nin: ["Completed", "Delivered"] } }),

    Project.countDocuments({ workStatus: { $in: ["Completed", "Delivered"] } }),

    Project.countDocuments({ paymentStatus: "Partial" }),

    Project.aggregate([

      { $match: { paymentStatus: { $ne: "Paid" } } },

      { $group: { _id: null, total: { $sum: "$remainingAmount" } } },

    ]),

    Project.aggregate([sumRecognizedRevenue]),

    Expense.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),

    Project.aggregate([outsourcedCostMatch(), sumOutsourcingCost]),

    Freelancer.countDocuments(),

    Project.find()

      .select("clientName businessName projectType workStatus paymentStatus totalAmount remainingAmount createdAt")

      .sort({ createdAt: -1 })

      .limit(5),

  ]);



  const totalRevenue = revenueAgg[0]?.total || 0;

  const totalExpenses = expenseAgg[0]?.total || 0;

  const freelancerCosts = freelancerCostAgg[0]?.total || 0;

  const pendingPayments = pendingPaymentsAgg[0]?.total || 0;



  const workStatusDist = await Project.aggregate([

    { $group: { _id: "$workStatus", count: { $sum: 1 } } },

  ]);



  const serviceDist = await Project.aggregate([

    sumRecognizedRevenueByField("projectType"),

    { $project: { _id: 1, revenue: 1, count: 1 } },

  ]);



  const expenseByCategory = await Expense.aggregate([

    { $group: { _id: "$category", total: { $sum: "$amount" } } },

    { $sort: { total: -1 } },

  ]);



  const months = last12MonthsRange();

  const monthlyRevenue = [];

  const monthlyExpenses = [];

  const monthlyProfit = [];



  for (const m of months) {

    const [rev, exp, fl] = await Promise.all([

      Project.aggregate([

        {

          $match: {

            dateOfOnboarding: { $gte: m.start, $lte: m.end },

          },

        },

        { $group: { _id: null, total: { $sum: recognizedRevenueExpr } } },

      ]),

      Expense.aggregate([

        { $match: { expenseDate: { $gte: m.start, $lte: m.end } } },

        { $group: { _id: null, total: { $sum: "$amount" } } },

      ]),

      Project.aggregate([

        outsourcedCostMatch({ dateOfOnboarding: { $gte: m.start, $lte: m.end } }),

        sumOutsourcingCost,

      ]),

    ]);

    const r = rev[0]?.total || 0;

    const e = exp[0]?.total || 0;

    const f = fl[0]?.total || 0;

    monthlyRevenue.push({ name: m.label, value: r });

    monthlyExpenses.push({ name: m.label, value: e });

    monthlyProfit.push({
      name: m.label,
      revenue: r,
      expenses: e,
      freelancerCosts: f,
      profit: r - e - f,
    });

  }



  res.json({

    success: true,

    data: {

      cards: {

        activeProjects,

        completedProjects,

        partialPaymentProjects,

        pendingPayments,

        totalRevenue,

        totalExpenses,

        freelancerCosts,

        netProfit: totalRevenue - totalExpenses - freelancerCosts,

        totalFreelancers: freelancerCount,

      },

      latestProjects,

      workStatusDist,

      serviceDist,

      expenseByCategory,

      monthlyRevenue,

      monthlyExpenses,

      monthlyProfit,

    },

  });

});



const getPL = asyncHandler(async (req, res) => {

  const [revenue, expenses, pending, freelancerCosts] = await Promise.all([

    Project.aggregate([sumRecognizedRevenue]),

    Expense.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),

    Project.aggregate([

      { $match: { paymentStatus: { $ne: "Paid" } } },

      { $group: { _id: null, total: { $sum: "$remainingAmount" } } },

    ]),

    Project.aggregate([outsourcedCostMatch(), sumOutsourcingCost]),

  ]);



  const totalRevenue = revenue[0]?.total || 0;

  const totalExpenses = expenses[0]?.total || 0;

  const freelancerCostsTotal = freelancerCosts[0]?.total || 0;

  const grossProfit = totalRevenue - freelancerCostsTotal;

  const netProfit = totalRevenue - totalExpenses - freelancerCostsTotal;



  const months = last12MonthsRange();

  const monthly = [];



  for (const m of months) {

    const [rev, exp, fl] = await Promise.all([

      Project.aggregate([

        { $match: { dateOfOnboarding: { $gte: m.start, $lte: m.end } } },

        { $group: { _id: null, total: { $sum: recognizedRevenueExpr } } },

      ]),

      Expense.aggregate([

        { $match: { expenseDate: { $gte: m.start, $lte: m.end } } },

        { $group: { _id: null, total: { $sum: "$amount" } } },

      ]),

      Project.aggregate([

        outsourcedCostMatch({ dateOfOnboarding: { $gte: m.start, $lte: m.end } }),

        sumOutsourcingCost,

      ]),

    ]);

    const r = rev[0]?.total || 0;

    const e = exp[0]?.total || 0;

    const f = fl[0]?.total || 0;

    monthly.push({

      month: m.label,

      revenue: r,

      expenses: e,

      freelancerCosts: f,

      profit: r - e - f,

    });

  }



  const serviceRevenue = await Project.aggregate([

    sumRecognizedRevenueByField("projectType"),

    { $sort: { revenue: -1 } },

  ]);



  res.json({

    success: true,

    data: {

      totalRevenue,

      totalExpenses,

      grossProfit,

      netProfit,

      pendingPayments: pending[0]?.total || 0,

      freelancerCosts: freelancerCostsTotal,

      monthly,

      serviceRevenue,

    },

  });

});



const globalSearch = asyncHandler(async (req, res) => {

  const q = req.query.q?.trim();

  if (!q) {

    return res.json({ success: true, data: { projects: [], freelancers: [], expenses: [] } });

  }



  const regex = { $regex: q, $options: "i" };

  const [projects, freelancers, expenses] = await Promise.all([

    Project.find({

      $or: [{ clientName: regex }, { projectTitle: regex }, { businessName: regex }],

    })

      .select("projectTitle clientName workStatus paymentStatus")

      .limit(10),

    Freelancer.find({ $or: [{ name: regex }, { email: regex }] })

      .select("name email availabilityStatus")

      .limit(10),

    Expense.find({ title: regex }).select("title amount category expenseDate").limit(10),

  ]);



  res.json({ success: true, data: { projects, freelancers, expenses } });

});



module.exports = { getDashboard, getPL, globalSearch };

