import express from "express";
import {
  createloanUser,
  setloanTranscation,
  getLoanUser,
  getLoanTrx,
  deleteLoanUser,
} from "../controllers/loanUser.js";
import {
  createdepositUser,
  setdeposittranscation,
  getAllDepositUser,
  getuserLoanTrx,
  getBalanceofBothUser,
  deleteDepositUser,
} from "../controllers/depositUser.js";
import {getNotification, setNotification} from "../controllers/notification.js";
const router = express.Router();



router.post("/createloanUser", createloanUser);
router.get("/getLoanUser", getLoanUser);
router.get("/getLoanTrx/:id", getLoanTrx);
router.post("/loanTranscation/:id", setloanTranscation);
router.delete("/deleteLoanUser/:id", deleteLoanUser);



router.post("/createdepositUser", createdepositUser);
router.get("/getAllDepositUser", getAllDepositUser);
router.post("/uploadLoanTrx/:id", setdeposittranscation);
router.get("/getDepositTrxUser/:id", getuserLoanTrx);
router.delete("/deleteDepositUser/:id", deleteDepositUser);



router.get("/getBalanceofBothUser", getBalanceofBothUser);
router.post("/setNotification",setNotification);
router.get("/getNotification", getNotification);







export default router;
