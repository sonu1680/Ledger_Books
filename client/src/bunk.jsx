import { useState, useEffect } from "react";
import {
  apiClient,
  GETNOTIFICATION,
  SETNOTIFICATION,
} from "../library/apiClient";

function BunkAttendance() {
  const [alert, setAlert] = useState("");
  const [admin, setAdmin] = useState();
  const [notifyapi, setNotifyApi] = useState([]);

  const addAlert = async () => {
    setAlert(""); // Clear the input field after adding
    document.getElementById("my_modal_4").close(); // Close the modal
    const res = await apiClient.post(SETNOTIFICATION, { title: alert });
   // console.log(res);
  };

  const getNotification = async () => {
    const notify = await apiClient.get(GETNOTIFICATION);
    console.log(notify.data.res1);
    setNotifyApi(notify.data.res1);
  };

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("isAdmin"));
    setAdmin(admin);
    getNotification();
  }, []);

  return (
    <>
      <div className="container bg-blue-950 w-full h-full flex  ">
        <div className="box h-full w-[500px] bg-gray-900 flex items-center  flex-col relative">
          {notifyapi.length === 0 ? (
            <p className="mt-4 text-white text-2xl ">No Notification</p>
          ) : (
            notifyapi.map((item, index) => (
              <div
                key={index}
                className="alertContainer mt-4 w-full min-h-12 border border-white rounded-md p-2 flex justify-start items-center"
              >
                {item.title}
              </div>
            ))
          )}

          {admin && (
            <button
              className="btn createNotification w-full h-10 bg-yellow-600/50 rounded-sm absolute bottom-1 flex justify-center items-center font-semibold uppercase cursor-pointer"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              Create Notification
            </button>
          )}

          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-1/4 max-w-5xl">
              <h3 className="font-bold text-lg">Create Alert</h3>
              <label className="form-control w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={alert}
                  onChange={(e) => setAlert(e.target.value)}
                />
              </label>
              <div className="modal-action">
                <button className="btn" type="button" onClick={addAlert}>
                  Add
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => document.getElementById("my_modal_4").close()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
}

export default BunkAttendance;
