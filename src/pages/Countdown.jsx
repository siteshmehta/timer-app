import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import { useEffect, useState } from "react";

export default function Countdown() {

  const tempCurrentDate = new Date().toLocaleString();  //by default input -> calender value
  const [endTime, setEndTime] = useState(tempCurrentDate);


  const timersData = JSON.parse(localStorage.getItem("timer")) ?? []; //first try to fetch data from localstorage
  const [timers, setTimers] = useState(timersData);


  const addTimer = () => {
    const uniqueId = new Date().toISOString().toString();
    setTimers([...timers, { uniqueId, endTime }]);
  };

  const deleteTimer = (uniqueId) => {
    const tempTimers = timers.filter((timer) => timer?.uniqueId !== uniqueId);
    setTimers(tempTimers);
  };


  useEffect(() => {
    localStorage.setItem("timer", JSON.stringify(timers));  //update data on each update
  }, [timers]);


  return (
    <>

      <div className="min-h-screen bg-[#2A9D8F]">
        <Navbar />


        <div className="flex mt-24 justify-center">
          <p className="my-auto">Date - Time : </p> &nbsp; <input type="datetime-local" className="rounded p-1 border-0" value={endTime}
            onChange={(values) => {
              setEndTime(values.target.value);
            }} />

          <button className="ml-5 text-white bg-[#0c5815]  font-semibold rounded-md p-1 px-3" type="button" onClick={addTimer}>Add ➕</button>
        </div>


        <div className="flex justify-center">


          <div className=" mt-14">
            <h1 className="font-bold underline text-center">
              List of countdown timers
            </h1>

            {
              (
                <>
                  <table className="border min-w-[60vw]">
                    <thead>
                      <tr>
                        <th>S. No.</th>
                        <th>Timer</th>
                        <th>End time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !timers.length  ?
                          (<>
                            <tr className="text-center font-semibold underline"><td colSpan={4}>No timer exist</td></tr>
                          </>) :
                          timers.map((timer, index) => {
                            return (
                              <tr key={timer?.uniqueId} className="text-center">
                                <td className="border">
                                  <font className="font-bold">{index + 1} . </font>
                                </td>
                                <td className="border">
                                  <Timer data={timer} />
                                </td>
                                <td className="border">
                                  <small className="text-gray-700">(End Time : {endTime})</small>
                                </td>
                                <td className="border">
                                  <button
                                    type="button"
                                    className="text-white font-semibold bg-[#f4491e] rounded-md p-1 px-3 m-2"
                                    onClick={() => {
                                      deleteTimer(timer?.uniqueId);
                                    }}
                                  >
                                    Remove ❌
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                      }
                    </tbody>
                  </table>
                </>
              )

            }
          </div>

        </div>

      </div>
    </>
  );
}
