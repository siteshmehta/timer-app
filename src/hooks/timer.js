import { useEffect, useState } from "react";

const useTimer = (deadline) => {

  const [finalTime, setFinalTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  
  useEffect(() => {

    const getTime = () => {
      const time = new Date(deadline) - new Date();

      setFinalTime({
        days: Math.floor(time / (1000 * 60 * 60 * 24)),
        hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / 1000 / 60) % 60),
        seconds: Math.floor((time / 1000) % 60)
      });
    };

    const intervalId = setInterval(getTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [deadline]);

  return finalTime;
};


// const useAddTimer = () => {
//   const uniqueId = new Date().toISOString().toString();
//   setTimers([...timers, { uniqueId, endTime }]);
// }


export default useTimer;