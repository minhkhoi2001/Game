import React, { useState, useEffect } from "react";

const getNextTargetTime = (currentTime, hour, minute) => {
  const nextDay = new Date(currentTime);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(hour, minute, 0, 0);
  return nextDay;
};

const Countdown = ({ targetTime }) => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const currentTime = new Date();

      if (currentTime >= targetTime) {
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      let timeDiff = targetTime.getTime() - currentTime.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      setCountdown({ hours, minutes, seconds });
    };

    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <>
      <div className="number">
        <div className="item">{countdown.hours.toString().padStart(2, "0")}</div>
        <div className="item">:</div>
        <div className="item">{countdown.minutes.toString().padStart(2, "0")}</div>
        <div className="item">:</div>
        <div className="item">{countdown.seconds.toString().padStart(2, "0")}</div>
      </div>
    </>
  );
};

const CountDown = ({ date }) => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  let targetTime1, targetTime2;
  if (currentHour < 17 || (currentHour === 17 && currentMinute < 10) || currentHour >= 18) {
    if (currentHour < 17 || (currentHour === 17 && currentMinute < 10)) {
      targetTime1 = new Date();
      targetTime1.setHours(17, 10, 0, 0);
      targetTime2 = new Date();
      targetTime2.setHours(17, 15, 0, 0);
    } else {
      targetTime1 = getNextTargetTime(currentTime, 17, 10);
      targetTime2 = getNextTargetTime(currentTime, 17, 15);
    }
  } else if (
    currentHour == 17 && currentMinute > 10 && currentMinute < 15
  ) {
    targetTime1 = new Date();
    targetTime2 = new Date();
    targetTime2.setHours(17, 15, 0, 0);
  } else {
    targetTime1 = new Date();
    targetTime2 = new Date();
  }
  return (
    <>
      <div className="game-betting">
        <div className="time-box">
          <div className="out">
            <div className="txt">Mở thưởng sau</div>
            <Countdown targetTime={targetTime2} />
          </div>
          <div className="out">
            <div className="txt">Thời gian cược</div>
            <Countdown targetTime={targetTime1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CountDown;
