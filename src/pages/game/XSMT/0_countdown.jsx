import React, { useState, useEffect } from "react";

const Countdown = ({ targetTime }) => {
	const [countdown, setCountdown] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const calculateCountdown = () => {
			const currentTime = new Date();

			let timeDiff = targetTime.getTime() - currentTime.getTime();
			if (timeDiff < 0) {
				timeDiff = 0;
			}

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

const CountDown = () => {
	const targetTime18 = new Date();
	targetTime18.setHours(18, 0, 0, 0);

	const targetTime19 = new Date();
	targetTime19.setHours(19, 0, 0, 0);

	return (
		<>
			<div className="game-betting">
				<div className="time-box">
					<div className="out">
						<div className="txt">Trả thưởng</div>
						<Countdown targetTime={targetTime19} />
					</div>
					<div className="out">
						<div className="txt">Đóng kỳ xổ số</div>
						<Countdown targetTime={targetTime18} />
					</div>
				</div>
			</div>
		</>
	);
};

export default CountDown;
