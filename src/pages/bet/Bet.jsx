import React, { useState } from "react";
import PropTypes from "prop-types";

function Bet(props) {
	const [showPopup, setShowPopup] = useState(false);

	const handleClick = () => {
	  setShowPopup(true);
	};
  
	const handleClose = () => {
	  setShowPopup(false);
	};
  
	const handleBackdropClick = (event) => {
	  if (event.target === event.currentTarget) {
		setShowPopup(false);
	  }
	};
  
	return (
	  <>
		<button onClick={handleClick}>Open Popup</button>
		{showPopup && (
		  <div className="popup" onClick={handleBackdropClick}>
			<div className="popup-content">
			  <button onClick={handleClose}>Close</button>
			  <p>This is a popup!</p>
			</div>
		  </div>
		)}
	  </>
	);
}
  
  export default Bet;