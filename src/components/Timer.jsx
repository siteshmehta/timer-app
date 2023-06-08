import { useEffect, useState } from "react";
import useTimer from "../hooks/timer";

const Timer = (props) => {
  const {  endTime } = props.data;
  const { days , hours , minutes, seconds } = useTimer(endTime);
  

  return (
    <>
      {days} Days : {hours} Hours : {minutes} Minutes : {seconds} Seconds
    </>
  );
};

export default Timer;
