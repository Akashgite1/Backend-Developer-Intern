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