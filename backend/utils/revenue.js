/** Revenue recognized for P&L: Paid = full total, Partial = advance received, Pending = 0 */
const recognizedRevenueExpr = {
  $switch: {
    branches: [
      {
        case: { $eq: ["$paymentStatus", "Paid"] },
        then: { $ifNull: ["$totalAmount", 0] },
      },
      {
        case: { $eq: ["$paymentStatus", "Partial"] },
        then: { $ifNull: ["$advanceReceived", 0] },
      },
    ],
    default: 0,
  },
};

const sumRecognizedRevenue = {
  $group: {
    _id: null,
    total: { $sum: recognizedRevenueExpr },
  },
};

const sumRecognizedRevenueByField = (fieldName = "_id") => ({
  $group: {
    _id: `$${fieldName}`,
    revenue: { $sum: recognizedRevenueExpr },
    count: { $sum: 1 },
  },
});

module.exports = {
  recognizedRevenueExpr,
  sumRecognizedRevenue,
  sumRecognizedRevenueByField,
};
