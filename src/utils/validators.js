export const validateRecord = (data) => {
  const { amount, type, category, date } = data;

  if (!amount || amount <= 0) {
    throw new Error("Amount must be a positive number");
  }

  if (!["INCOME", "EXPENSE"].includes(type)) {
    throw new Error("Invalid type");
  }

  if (!category) {
    throw new Error("Category is required");
  }

  if (!date) {
    throw new Error("Date is required");
  }
};