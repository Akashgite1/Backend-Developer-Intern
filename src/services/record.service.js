import Record from "../models/record.model.js";

// Create
export const createRecord = async (data, userId) => {
  return await Record.create({
    ...data,
    createdBy: userId
  });
};

// Get with filters
export const getRecords = async (query, user) => {
  const filter = {};

  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;

  if (query.startDate && query.endDate) {
    filter.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate)
    };
  }

  // Optional: restrict non-admin users
  if (user.role !== "ADMIN") {
    filter.createdBy = user._id;
  }

  return await Record.find(filter).sort({ date: -1 });
};

// Update
export const updateRecord = async (id, data, user) => {
  const record = await Record.findById(id);

  if (!record) throw new Error("Record not found");

  // Ownership check
  if (
    record.createdBy.toString() !== user._id.toString() &&
    user.role !== "ADMIN"
  ) {
    throw new Error("Not authorized");
  }

  Object.assign(record, data);
  return await record.save();
};

// Delete
export const deleteRecord = async (id, user) => {
  const record = await Record.findById(id);

  if (!record) throw new Error("Record not found");

  if (
    record.createdBy.toString() !== user._id.toString() &&
    user.role !== "ADMIN"
  ) {
    throw new Error("Not authorized");
  }

  await record.deleteOne();
};