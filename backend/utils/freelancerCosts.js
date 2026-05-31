/** Sum committed freelancer cost from outsourced projects (outsourcingCost). */
const sumOutsourcingCost = {
  $group: {
    _id: null,
    total: { $sum: { $ifNull: ["$outsourcingCost", 0] } },
  },
};

const outsourcedCostMatch = (extra = {}) => ({
  $match: { isOutsourced: true, ...extra },
});

module.exports = {
  sumOutsourcingCost,
  outsourcedCostMatch,
};
