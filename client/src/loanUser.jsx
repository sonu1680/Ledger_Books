import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DELETELOANUSER,
  GETLOANUSER,
  LOANUSER,
  apiClient,
} from "../library/apiClient";

function LoanUser() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  // Create a ref for the modal
  const modalRef = useRef(null);

  const userData = async () => {
    try {
      const res = await apiClient.get(GETLOANUSER);
      setData(res.data.user); // Set data directly from the response
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    userData();
    const admin = JSON.parse(localStorage.getItem("isAdmin"));
    setAdmin(admin);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiClient.post(LOANUSER, formData);
      if (res.data.success === "true") {
        setData((prevData) => [...prevData, res.data.user]); // Update the local state
        setFormData({
          name: "",
          phone: "",
        });
      }
      modalRef.current.close(); // Close the modal using the ref
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleUserClick = (id) => {
    navigate(`/userLoan/${id}`);
  };

  const deleteUser = async (id) => {
    const res = await apiClient.delete(`${DELETELOANUSER}/${id}`);
    if (res.status === 200) {
      userData();
    }
  };

  return (
    <div className="container bg-gray-900 h-5/6 w-full flex flex-col relative items-center pb-2 pt-2">
      <div className="box h-11/12 w-full flex items-center flex-col relative overflow-y-scroll no-scrollbar pb-4">
        {data.map((item, index) => (
          <div
            className="container w-full h-14 flex flex-row justify-center items-center gap-x-2 mt-2"
            key={index}
          >
            <div
              className="user w-full h-14 bg-gray-900 rounded-lg mt-2 flex flex-row justify-between border items-center p-4 border-gray-100 cursor-pointer"
              onClick={() => handleUserClick(item._id)}
            >
              <p className="sr.no">{index + 1}.</p>
              <p className="name">{item.name}</p>
              <p className="name">₹ {item.balance}</p>
            </div>
            {admin && (
              <div
                className="deleteContainer w-14 h-12 bg-gray-900 rounded-md flex flex-row justify-center items-center cursor-pointer"
                onClick={() => deleteUser(item._id)}
              >
                <img src="/delete.png" alt="" className="w-6 h-6" />
              </div>
            )}
          </div>
        ))}

        <dialog id="my_modal_4" ref={modalRef} className="modal">
          <div className="modal-box w-96 max-w-5xl flex flex-col justify-center items-center">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => modalRef.current.close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Enter Loan User Details</h3>
            <form onSubmit={handleSubmit} className="w-full max-w-xs">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Enter Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className="input input-bordered w-full max-w-xs h-10"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Enter Phone No.</span>
                </div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone No."
                  className="input input-bordered w-full max-w-xs h-10"
                  onChange={handleChange}
                  value={formData.phone}
                  required
                />
              </label>
              <button type="submit" className="btn btn-success w-full mt-4">
                Add
              </button>
            </form>
          </div>
        </dialog>
      </div>
      {admin && (
        <div className="btn w-full h-14 flex items-end bg-gray-900 absolute bottom-0">
          <button
            className="btn btn-success w-full h-10"
            onClick={() => modalRef.current.showModal()} // Show modal on button click
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
}

export default LoanUser;
