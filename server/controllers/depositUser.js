import depositModel from "../models/depositUser.js";
import loanModel from "../models/loanUser.js";
const createdepositUser = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const user = await depositModel.findOne({ phone });
    if (user) {
      return res.status(401).json({ msg: "user already registred" });
    }
    const newUser = await depositModel.create({ name, phone, balance: "0" });
    return res.status(201).json({ msg: "user created sucessfully", newUser });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const setdeposittranscation = async (req, res) => {
  try {
    const { amount, note, date, time, transactionType } = req.body;
    console.log(req.body);
    const user = await depositModel.findById(req.params.id);
    if (!user) {
      return res.status(401).json({ msg: "user not found" });
    }

    if (transactionType == "credit") {
      user.balance = parseInt(user.balance) + parseInt(amount);
    } else {
      user.balance = parseInt(user.balance) - parseInt(amount);
    }

    user.transactions.push({
      amount,
      transactionType,
      date,
      time,
      note,
    });
    await user.save();
    return res.status(201).json({ msg: "transcation added", user });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const getAllDepositUser = async (req, res) => {
  try {
    const user = await depositModel.find({});
    let totalBalance = user.reduce(
      (accumulator, user) => accumulator + parseInt(user.balance),
      0
    );
    return res.status(201).json({ msg: "all user", user });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getuserLoanTrx = async (req, res) => {
  try {
    const { id } = req.params;
    const userTrx = await depositModel.findById(id);

    return res.status(200).json({ msg: "user Trx", userTrx });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error " });
  }
};

const getBalanceofBothUser = async (req, res) => {
  const loanUser = await depositModel.find({});
  let totalDepositBalance = loanUser.reduce(
    (accumulator, user) => accumulator + parseInt(user.balance),
    0
  );

  const depositUser = await loanModel.find({});
  let totalLoanBalance = depositUser.reduce(
    (accumulator, user) => accumulator + parseInt(user.balance),
    0
  );
  return res
    .status(200)
    .json({ msg: "TotalBalance", totalDepositBalance, totalLoanBalance });
};

const deleteDepositUser=async(req,res)=>{
  const {id}=req.params;
  const result=await depositModel.findByIdAndDelete(id);
  return res.status(200).json({msg:"User Deleted"});
}

export {
  createdepositUser,
  setdeposittranscation,
  getAllDepositUser,
  getuserLoanTrx,
  getBalanceofBothUser,
  deleteDepositUser,
};
