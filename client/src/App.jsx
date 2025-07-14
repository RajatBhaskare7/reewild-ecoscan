import React, { useState } from "react";
import UploadComponent from "./components/uploadContainer";

const App = () => {
	const [items, setItems] = useState([]);
	const [score, setScore] = useState(0);
	const [points, setPoints] = useState(0);
	const [offers, setOffers] = useState([]);

	return (
		<div className= "w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#063C44] to-[#11A97E] p-4">
			<UploadComponent
				items={items}
				setItems={setItems}
				score={score}
				setScore={setScore}
				points={points}
				setPoints={setPoints}
				offers={offers}
				setOffers={setOffers}
			/>
		</div>
	);
};

export default App;
