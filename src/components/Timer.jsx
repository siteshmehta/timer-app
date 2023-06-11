import useTimer from "../hooks/timer";

const Timer = (props) => {
  const {  endTime } = props.data;
  const { days , hours , minutes, seconds } = useTimer(endTime);
  

  return (
    <>
      <p className="text-center">
        {days < 0 ? 0 : days} Days : {hours < 0 ? 0 : hours} Hours : {minutes < 0 ? 0 : minutes} Minutes : {seconds < 0 ? 0 : seconds} Seconds <br/>
      </p>
    </>
  );
};

export default Timer;
