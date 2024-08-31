import loanModel from "../models/loanUser.js";
const createloanUser = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const userExist = await loanModel.findOne({ phone });
    if (userExist) {
      return res.status(200).json({ msg: "user already register",success:"false" });
    }

    const newUser = await loanModel.create({ name, phone, balance: "0" });

    return res
      .status(200)
      .json({ msg: "user created sucessfully", user: newUser,success:"true" });
  } catch (error) {
    return res.status(500).json({msg:"Internal server error"});
  }
};

const setloanTranscation = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, transactionType, date, time, notes,intrest } = req.body;
    //console.log(intrest);
    const user = await loanModel.findById(id);
    if (!user) {
      return res.status(401).json({ msg: "no user found" });
    }
    //console.log(user);
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
      notes,
      intrest
    });
    await user.save();
    return res.status(201).json({ msg: "transcation added", user });
  } catch (error) {
    return res.status(500).json({ msg: "internal server errore" });
  }
};

 const getLoanUser=async(req,res)=>{
  try {
    
const user=await loanModel.find({});

 return res.status(201).json({ msg: "all user", user });
  } catch (error) {
    return res.status(500).json({msg:"Internal server error"})
    
  }
 }

const getLoanTrx=async(req,res)=>{
  try {
    const {id}=req.params;
    const userTrx=await loanModel.findById(id);
    const transcation=userTrx.transactions;
    
    return res.status(200).json({ msg: "user Trx", transcation,userTrx });
  } catch (error) {
    return res.status(500).json({msg:"internal server error"});
  }
};

const deleteLoanUser = async (req, res) => {
  const { id } = req.params;
  const result = await loanModel.findByIdAndDelete(id);
  return res.status(200).json({ msg: "User Deleted" });
};

export {
  createloanUser,
  setloanTranscation,
  getLoanUser,
  getLoanTrx,
  deleteLoanUser,
};
