import React, { useState } from "react";
import UploadComponent from "./components/uploadContainer";

const App = () => {
	const [items, setItems] = useState([]);
	const [score, setScore] = useState(0);
	const [points, setPoints] = useState(0);
	const [offers, setOffers] = useState([]);

	return (
		<div className="h-full w-full flex flex-col md:flex-row items-center justify-center from-[#063C44] to-[#11A97E] p-4 gap-y-8 md:gap-y-0 md:gap-x-8">
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
