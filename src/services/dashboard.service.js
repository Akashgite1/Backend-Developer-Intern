import Record from "../models/record.model.js";

// Dashboard Summary
export const getDashboardSummary = async (user) => {
    const matchStage = {};

    // Restrict data for non-admin users
    if (user.role !== "ADMIN") {
        matchStage.createdBy = user._id;
    }

    const records = await Record.aggregate([
        { $match: matchStage },

        {
            $group: {
                _id: null,
                totalIncome: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "INCOME"] }, "$amount", 0]
                    }
                },
                totalExpenses: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "EXPENSE"] }, "$amount", 0]
                    }
                }
            }
        }
    ]);

    const summary = records[0] || { totalIncome: 0, totalExpenses: 0 };

    return {
        totalIncome: summary.totalIncome,
        totalExpenses: summary.totalExpenses,
        netBalance: summary.totalIncome - summary.totalExpenses
    };
};

// Category Breakdown
export const getCategoryBreakdown = async (user) => {
    const matchStage = {};

    if (user.role !== "ADMIN") {
        matchStage.createdBy = user._id;
    }

    return await Record.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" }
            }
        }
    ]);
};

// Recent Transactions
export const getRecentTransactions = async (user) => {
    const filter = user.role === "ADMIN" ? {} : { createdBy: user._id };

    return await Record.find(filter)
        .sort({ createdAt: -1 })
        .limit(5);
};

// Monthly Trends
export const getMonthlyTrends = async (user) => {
    const matchStage = {};

    if (user.role !== "ADMIN") {
        matchStage.createdBy = user._id;
    }

    return await Record.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: {
                    month: { $month: "$date" },
                    year: { $year: "$date" }
                },
                totalIncome: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "INCOME"] }, "$amount", 0]
                    }
                },
                totalExpense: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "EXPENSE"] }, "$amount", 0]
                    }
                }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
};