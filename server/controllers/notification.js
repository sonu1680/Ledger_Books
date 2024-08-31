import notificationModel from "../models/notification.js"

const setNotification=async(req,res)=>{
const {title}=req.body;
console.log(req.body);
    const res1=await notificationModel.create({title})
    return res.status(201).json({msg:"notification uploaded"})
}

const getNotification = async (req, res) => {
  const res1 = await notificationModel.find({});
  console.log(res1);
  return res.status(201).json({ msg: "all notification",res1 });
};

export  { setNotification,getNotification };