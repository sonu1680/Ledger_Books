import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient, DEPOSITRXUPLOAD, DEPOSITTRX } from "../library/apiClient";

function UserDetailsDeposit() {
  const { id } = useParams();
  const [loanbalance, setLoanBalance] = useState(0);
  const [debitOrCredit, setDebitOrCredit] = useState("");
  const[admin,setAdmin]=useState(false);


  const[userDetails,setUserdetails]=useState({
    userName:"",userBalance:"",userPhone:""
  })


   const getUserTrxID = async () => {
     try {
       const res = await apiClient.get(`${DEPOSITTRX}/${id} `);
       console.log(res.data.userTrx);
       setData(res.data.userTrx.transactions);
       setUserdetails({
         userName: res.data.userTrx.name,
         userBalance: res.data.userTrx.balance,
         userPhone: res.data.userTrx.phone,
       });
     } catch (error) {
       console.log("error at getting userTrx from id", error);
     }
   }; 
useEffect(()=>{
    const admin = JSON.parse(localStorage.getItem("isAdmin"));
    setAdmin(admin);
  getUserTrxID();
},[])


  const dateCal = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const dates = today.getDate();
    let options = { timeStyle: "short", hour12: true };
    let time = today.toLocaleTimeString("en-US", options);
    const date = dates + "/" + month + "/" + year;
    return { date, time };
  };
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    note: "",
    amount: "",
    transactionType: "",
  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const { date, time } = dateCal();
    setFormData({
      ...formData,
      [name]: value,
      date: date.toString(),
      time: time.toString(),
      transactionType: debitOrCredit,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.amount) {
      alert("enter Amount");
    } else {
      if (formData.transactionType == "credit") {
        setLoanBalance(loanbalance + parseInt(formData.amount));
      } else {
        setLoanBalance(loanbalance - parseInt(formData.amount));
      }

      setData([...data, formData]);

    
        try {
          const res = await apiClient.post(`${DEPOSITRXUPLOAD}/${id}`,formData);
          console.log(res)
        } catch (error) {
          console.log("error at getting usertrx list",error)
        }
      

      document.getElementById("my_modal_4").close();
      setFormData({
        date: "",
        time: "",
        note: "",
        amount: "",
        type: "",
        intrest: "",
      });
    }
    getUserTrxID();
  };
  const openModel = (e) => {
    console.log(e.target.name);
    if (e.target.name == "credit") {
      setDebitOrCredit("credit");
    } else if (e.target.name == "debit") {
      setDebitOrCredit("debit");
    } else {
      setDebitOrCredit("");
    }
    document.getElementById("my_modal_4").showModal();
  };



  return (
    <div className="container bg-gray-950 w-[100%] h-[100vh] flex justify-center items-center">
      <div className="box h-[95vh]  w-[450px] bg-gray-900 flex items-center flex-col border border-white relative ">
        <div className="userDetails w-full h-28 bg-gray-800 flex-col font-bold justify-center px-4 items-center text-white capitalize border-b-2 border-gray-600 ">
          <div className="details w-full h-14 flex  justify-around items-center ">
            <p className="name  "> {userDetails.userName} </p>
            <p className="phone">{userDetails.phone} </p>
            <p className="userType">Deposit</p>
          </div>
          <div className="currentBalance w-full h-10 bg-gray-900 flex justify-between items-center  border-gray-100 rounded-md text-sm ">
            {parseInt(userDetails.userBalance) > 0 ? (
              <div className="grp flex justify-between w-full px-6 ">
                <p className="type ">you will gave </p>
                <p className="amount">₹{userDetails.userBalance}</p>
              </div>
            ) : (
              <div className="grp flex justify-between w-full px-6 ">
                <p className="type ">you will get </p>
                <p className="amount">
                  ₹
                  {parseInt(userDetails.userBalance) -
                    2 * parseInt(userDetails.userBalance)}
                </p>
              </div>
            )}
          </div>
        </div>
        {/* ------transcation----------------- */}
        <div className="transcationsContainer w-full h-full pb-20 bg-gray-900 px-4 mt-2 overflow-y-scroll no-scrollbar ">
          {data.map((item, index) => (
            <div
              key={index}
              className={`transcation mt-2 rounded-md shadow-black shadow-md flex flex-row justify-evenly items-center py-2 ${
                item.transactionType == "debit"
                  ? "bg-red-600/30"
                  : "bg-green-600/30"
              }  `}
            >
              <div className="left w-1/2 h-full flex flex-col justify-start items-start pl-4 gap-y-2 ">
                <p className="datetime text-xs ">
                  {item.date} - {item.time}{" "}
                </p>
                <p className="note">{item.note} </p>
              </div>
              <div className="right w-1/2 h-12 flex flex-col justify-center items-center gap-y-2  ">
                {/* <p className="interest text-sm ">
                  {" "}
                  InterestRate : {item.intrest}%{" "}
                </p> */}
                <p className="amount"> ₹ {item.amount} </p>
              </div>
            </div>
          ))}
        </div>
        {admin && (
          <div className="buttons w-full h-16 absolute bottom-1 bg-gray-900  flex justify-around  items-center border-t-2 border-gray-600  text-white  ">
            {/* --------------------Modal-------------------------- */}
            <dialog id="my_modal_4" className="modal  ">
              <div className="modal-box w-96 max-w-5xl flex flex-col justify-center items-center">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => document.getElementById("my_modal_4").close()}
                >
                  ✕
                </button>
                <h3 className="font-semibold text-lg">
                  Enter Loan User Details
                </h3>
                <form className="w-full max-w-xs">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Amount</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      placeholder="Enter Amount"
                      className="input input-bordered w-full max-w-xs h-10 text-xs"
                      required
                      value={formData.amount}
                      onChange={handleChange}
                    />
                  </label>
                  {/* <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">IntrestRate</span>
                  </div>
                  <input
                    type="number"
                    name="intrest"
                    placeholder="Intrest Rate"
                    className="input input-bordered w-full max-w-xs h-10 text-xs"
                    value={formData.intrest}
                    onChange={handleChange}
                  />
                </label> */}
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Notes</span>
                    </div>
                    <input
                      type="text"
                      name="note"
                      placeholder="Enter details (Items,quantity,bill no,etc)"
                      className="input input-bordered w-full max-w-xs h-10 text-xs "
                      value={formData.note}
                      onChange={handleChange}
                    />
                  </label>
                  <button
                    type="submit"
                    className="btn btn-success w-full mt-4"
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                </form>
              </div>
            </dialog>

            {/* ---------------------------button-------------------------- */}

            <button
              name="debit"
              className="btn btn-error  w-2/6 font-semibold text-white  rounded-md"
              onClick={openModel}
            >
              You Gave $
            </button>
            <button
              name="credit"
              className="btn btn-success w-2/6 font-semibold text-white  rounded-md "
              onClick={openModel}
            >
              You got $
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetailsDeposit;
