import {
    getDashboardSummary,
    getCategoryBreakdown,
    getRecentTransactions,
    getMonthlyTrends
} from "../services/dashboard.service.js";

export const summary = async (req, res, next) => {
    try {
        const data = await getDashboardSummary(req.user);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const category = async (req, res, next) => {
    try {
        const data = await getCategoryBreakdown(req.user);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const recent = async (req, res, next) => {
    try {
        const data = await getRecentTransactions(req.user);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const trends = async (req, res, next) => {
    try {
        const data = await getMonthlyTrends(req.user);
        res.json(data);
    } catch (err) {
        next(err);
    }
};