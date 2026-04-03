import {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord
} from "../services/record.service.js";

// Create
export const create = async (req, res, next) => {
    try {
        const record = await createRecord(req.body, req.user._id);

        res.status(201).json(record);
    } catch (err) {
        next(err);
    }
};

// Get
export const getAll = async (req, res, next) => {
    try {
        const records = await getRecords(req.query, req.user);

        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;

        return await Record.find(filter)
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        res.json(records);
    } catch (err) {
        next(err);
    }
};

// Update
export const update = async (req, res, next) => {
    try {
        const record = await updateRecord(
            req.params.id,
            req.body,
            req.user
        );

        res.json(record);
    } catch (err) {
        next(err);
    }
};

// Delete
export const remove = async (req, res, next) => {
    try {
        await deleteRecord(req.params.id, req.user);

        res.json({ message: "Record deleted" });
    } catch (err) {
        next(err);
    }
};