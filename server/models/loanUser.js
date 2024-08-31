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
  notes: {
    type: String,
  },
  intrest: {
    type: String,
  },
});

const loanUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  balance:{
    type:String
  },
  transactions: [transactionSchema],
});

const loanUsers = mongoose.model("loanUser", loanUserSchema);

export default loanUsers;
