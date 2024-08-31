import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  apiClient,
  DELETEDEPOSITUSER,
  DEPOSITUSER,
  GETDEPOSITUSER,
} from "../library/apiClient";


function Deposit() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const[admin,setAdmin]=useState();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });


  const modalRef = useRef(null); // Create a ref to control the dialog

  // Function to fetch all users
  const allUser = async () => {
    try {
      const res = await apiClient.get(GETDEPOSITUSER);
      setData(res.data.user);
    } catch (error) {
      console.log("Error at getting deposit users:", error);
    }
  };
  // Fetch users once when component mounts
  useEffect(() => {
     const admin= JSON.parse(localStorage.getItem("isAdmin"));
     setAdmin(admin)
    allUser();
     
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post(DEPOSITUSER, formData);
      if (res.status === 201) {
        setData([...data, formData]); // Update data only on successful POST
        setFormData({
          name: "",
          phone: "",
        });
        modalRef.current.close(); // Close modal on success
      }
    } catch (error) {
      console.log("Error at uploading deposit user:", error);
    }
  };

  // Handle user click to navigate to the user's deposit details
  const handleUserClick = (id) => {
    navigate(`/userDeposit/${id}`);
  };

  // Handle user deletion
  const deleteUser = async (id) => {
    try {
      const res = await apiClient.delete(`${DELETEDEPOSITUSER}/${id}`);
      if (res.status === 200) {
        allUser(); // Refresh user list after deletion
      }
    } catch (error) {
      console.log("Error at deleting user:", error);
    }
  };

  return (
    <div className="container bg-gray-900 h-5/6 w-full flex flex-col relative  items-center pb-2 pt-2">
      <div className="box h-11/12 w-full flex items-center flex-col  overflow-y-scroll no-scrollbar pb-4">
        {data.map((item, index) => (
          <div
            className="container w-full h-14 flex flex-row justify-center items-center gap-x-2 mt-2"
            key={index} // Use unique identifier as key
          >
            <div
              className="user w-full h-14 bg-gray-900 rounded-lg mt-2 flex flex-row justify-between border items-center p-4 border-gray-100 cursor-pointer"
              onClick={() => handleUserClick(item._id)}
            >
              <p className="sr.no">{data.indexOf(item) + 1}.</p>
              <p className="name">{item.name}</p>
              <p className="balance">₹ {item.balance}</p>
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

        <dialog id="my_modal_4" className="modal" ref={modalRef}>
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
                  minLength={7}
                  maxLength={12}
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
      {admin && ( // Conditional rendering based on the `admin` variable
        <div className="btn w-full h-14 flex items-end bg-gray-900 absolute bottom-0 ">
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

export default Deposit;
