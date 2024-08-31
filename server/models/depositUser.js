import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const depositUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
  },
  transactions: [transactionSchema],
});

const deposituser = mongoose.model("depositUsers", depositUserSchema);

export default deposituser;
