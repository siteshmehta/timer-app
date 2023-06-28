import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useTimeZones } from "../hooks/worldClock.js";
import { useQuery } from "@tanstack/react-query";

export default function WorldClock() {

  const { timeZones: listOftimeZones } = useTimeZones();
  const [timeZone, setTimeZone] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const timezoneOption = useRef();



  //update the timezone
  useEffect(() => {
    let existingTimeZone = localStorage.getItem("currentTimezone");
    if (listOftimeZones) {
      if (existingTimeZone) {
        timezoneOption.current.value = existingTimeZone;
        setTimeZone(existingTimeZone);
      } else {
        localStorage.setItem("currentTimezone", listOftimeZones[0]);
        setTimeZone(listOftimeZones[0]);
      }
    }
  }, [listOftimeZones])


  //fetch the data of seleted dropdown
  const {
    fetchStatus
  } = useQuery({
    queryKey: ['timezones', timeZone],
    queryFn: async function () {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${timeZone}`);
      if (response.ok) {
        let data = await response.json();
        let timeString = data?.datetime ?? new Date();
        timeString = `${timeString}`.split("+")[0];
        timeString = `${timeString}`.split(".")[0];
        setDisplayDate(new Date(timeString).toLocaleString());
        return timeString;
      }
      return new Date();
    },
    enabled: !!timeZone,
    refetchOnWindowFocus: false
  })


  //update the value on every second.
  useEffect(() => {
    const intervalId = setInterval(() => {
      let tempDate = new Date(displayDate);
      tempDate.setSeconds(tempDate.getSeconds() + 1);
      setDisplayDate(tempDate.toLocaleString());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [displayDate]);


  return (
    <>

      <div className="min-h-screen bg-[#2A9D8F]">
        <Navbar />


        <div className="mt-24 text-center">

          <div>
            Select timezone : &nbsp;
            <select onChange={(values) => {
              setTimeZone(values.target.value);
              localStorage.setItem("currentTimezone", values.target.value);
            }} className="rounded p-1" ref={timezoneOption}>
              {
                listOftimeZones && listOftimeZones.map((value) => {
                  return <option key={value} value={value}>{value}</option>
                })
              }
            </select>
          </div>


          <div className="flex justify-center">
            <div className="bg-[#264653] rounded shadow-md text-white p-2 mt-20 px-16">

              <h2>Current time for {timeZone} is: </h2>
              {
                fetchStatus === "fetching" ? "FETCHING.." : <>
                  <p className="text-center">
                    {displayDate}
                  </p>
                </>
              }
            </div>
          </div>

        </div>


      </div>
    </>
  );
}
