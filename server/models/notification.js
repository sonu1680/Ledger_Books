import mongoose from "mongoose";


const notification = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const notifications = mongoose.model("notifications", notification);

export default notifications;
