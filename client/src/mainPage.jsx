import React, { useState, useEffect } from "react";
import BunkAttendace from "./bunk";
import Deposit from "./deposit";
import LoanUser from "./loanUser";
import { apiClient, GETBALANCEOFBOTHUSER } from "../library/apiClient";

const MainPage = () => {
  const data = [
    { id: 0, title: "DepositUser" },
    { id: 1, title: "LoanUser" },
    { id: 2, title: "Notification" },
  ];

  const [totalBalance, setTotalbalance] = useState({
    depositbalance: "",
    loanalance: "",
    currentFund: "",
  });

  const btnClick = (id) => {
    setSelectedItemId(id);
  };
  const [selectedItemId, setSelectedItemId] = useState(0);

  useEffect(() => {
    const getbalanceofbothUser = async () => {
      try {
        const res = await apiClient.get(GETBALANCEOFBOTHUSER);
        const currentFunds =
          parseInt(res.data.totalDepositBalance) -
          parseInt(res.data.totalLoanBalance);
        setTotalbalance({
          depositbalance: res.data.totalDepositBalance,
          loanalance: res.data.totalLoanBalance,
          currentFund: currentFunds,
        });
        // console.log(res.data);
      } catch (error) {
        console.log("error at getting deposit user", error);
      }
    };
    getbalanceofbothUser();
  }, []);

  return (
    <>
      <div className="main w-[550px]  md:w-full h-[100vh] flex   justify-center  flex-col items-center md:flex-row md:items-start  ">
        <div className="conatiner  h-full w-[500px] bg-gray-900   flex justify-center items-center flex-col p-2 lg:pb-10 lg:pt-10  border-2 border-white rounded-xl  ">
          <div className="walletAndlist w-full h-58  ">
            <div className="wallet w-full h-24  flex justify-between  gap-x-4 cursor-pointer ">
              <div className="totoalbalance w-2/6 h-20 bg-gray-900 border-2  border-gray-200 rounded-md flex flex-col justify-center items-center ">
                <p className="text"> Deposit Funds</p>
                <p className="fund"> ₹ {totalBalance.depositbalance}</p>
              </div>
              <div className="totoalbalance w-2/6 h-20 bg-gray-900 border-2 border-gray-200 rounded-md flex flex-col justify-center items-center">
                <p className="text"> Loan Funds</p>
                <p className="fund"> ₹ {totalBalance.loanalance}</p>
              </div>{" "}
              <div className="totoalbalance w-2/6 h-20 bg-gray-900 border-2 border-gray-200 rounded-md flex flex-col justify-center items-center">
                <p className="text"> Current Funds</p>
                <p className="fund"> ₹ {totalBalance.loanalance}</p>
              </div>{" "}
            </div>
            <div className="selection w-full h-10  flex justify-between">
              {data.map((item) => (
                <div
                  className={`box1 h-10 w-28 rounded-full cursor-pointer  font-bold text-center text-xs flex flex-col justify-center items-center border-2 transition ease-in-out duration-300 hover:bg-gray-800 ${
                    selectedItemId === item.id
                      ? "border-white"
                      : "border-gray-600"
                  }`}
                  key={item.id}
                  onClick={() => btnClick(item.id)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          {selectedItemId == 0 ? (
            <Deposit />
          ) : selectedItemId == 1 ? (
            <LoanUser />
          ) : (
            <BunkAttendace />
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
