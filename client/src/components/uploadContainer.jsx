import React, { useRef, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import ResultComponent from "./result";
import OffersComponent from "./offers";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UploadComponent = ({
	items,
	setItems,
	score,
	setScore,
	points,
	setPoints,
	offers,
	setOffers,
}) => {
	const imgRef = useRef();
	const [loading, setLoading] = useState(false);
	// Add preview state
	const [preview, setPreview] = useState(null);

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setLoading(true);
		const reader = new FileReader();
		reader.onload = async () => {
			const image = new Image();
			image.src = reader.result;
			// Set preview when file is loaded
			setPreview(reader.result);
			image.onload = async () => {
				const model = await mobilenet.load();
				const predictions = await model.classify(image);
				console.log(predictions);
				const clothingItems = predictions
					.filter((pred) => pred.probability > 0.3)
					.flatMap((pred) => {
						const name = pred.className.toLowerCase();
						if (
							name.includes("shirt") ||
							name.includes("jersey") ||
							name.includes("cardigan") ||
							name.includes("t-shirt")
						)
							return ["T-shirt"];
						if (name.includes("jean") || name.includes("denim"))
							return ["Jean"];
						if (
							name.includes("jacket") ||
							name.includes("coat") ||
							name.includes("trench")
						)
							return ["Jacket"];
						if (
							name.includes("shoe") ||
							name.includes("sneaker") ||
							name.includes("boot")
						)
							return ["Shoes"];
						return [];
					});
				setItems(clothingItems);
				
				const res = await fetch(`${API_BASE_URL}/score`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ items: clothingItems }),
				});
				const { totalScore, rewardPoints } = await res.json();
				setScore(totalScore);
				setPoints(rewardPoints);
				const offersRes = await fetch(
					`${API_BASE_URL}/offers?points=${rewardPoints}`
				);
				const offers = await offersRes.json();
				setOffers(offers);
				setLoading(false);
			};
			imgRef.current.src = reader.result;
		};
		reader.readAsDataURL(file);
	};

	// const handleImageChange = async (e) => {
	// 	const file = e.target.files[0];
	// 	if (!file) return;
	// 	setLoading(true);

	// 	// Prepare form data for file upload
	// 	const formData = new FormData();
	// 	formData.append("image", file);

	// 	try {
	// 		// Call your backend image recognition API
	// 		const res = await fetch("http://localhost:5000/api/analyze", {
	// 			method: "POST",
	// 			body: formData,
	// 		});
	// 		const data = await res.json();
	// 		const clothingItems = data.items || [];
	// 		setItems(clothingItems);

	// 		// Continue with your existing logic for score and offers
	// 		const scoreRes = await fetch("http://localhost:5000/api/score", {
	// 			method: "POST",
	// 			headers: { "Content-Type": "application/json" },
	// 			body: JSON.stringify({ items: clothingItems }),
	// 		});
	// 		const { totalScore, rewardPoints } = await scoreRes.json();
	// 		setScore(totalScore);
	// 		setPoints(rewardPoints);

	// 		const offersRes = await fetch(
	// 			`http://localhost:5000/api/offers?points=${rewardPoints}`
	// 		);
	// 		const offers = await offersRes.json();
	// 		setOffers(offers);
	// 	} catch (err) {
	// 		console.error("Image upload or recognition failed:", err);
	// 		// Optionally show an error to the user
	// 	}
	// 	setLoading(false);
	// };

	return (
		<div className="h-full w-full flex flex-col md:flex-row items-start justify-center from-[#063C44] to-[#11A97E] p-4 gap-y-8 md:gap-y-0 md:gap-x-8">
			{/* Upload Section */}
			<div className="relative bg-white rounded-2xl md:gap-y-11 shadow-lg p-8 w-full max-w-2xl flex flex-col items-center mb-0 md:mb-0">
				{loading && (
					<div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10 rounded-2xl">
						<div className="w-12 h-12 border-4 border-[#11A97E] border-t-transparent rounded-full animate-spin mb-2"></div>
						<p className="text-[#063C44] font-semibold">Processing...</p>
					</div>
				)}
				<h2 className="md:text-4xl text-xl font-bold mb-6 text-[#063C44]">
					EcoScan: Clothing Analyzer
				</h2>

				<div className="md:w-full flex flex-col md:flex-row md:gap-8 items-center cursor-pointer mb-4">
					<label className="w-full flex flex-col items-center cursor-pointer mb-4">
						<span className="mb-2 text-[#063C44] font-medium">
							Upload from device
						</span>
						<input
							type="file"
							accept="image/*"
							onChange={loading ? undefined : handleImageChange}
							disabled={loading}
							className="hidden"
						/>
						<div
							className={`w-full h-12 flex items-center justify-center bg-gradient-to-r from-[#063C44] to-[#11A97E] text-white rounded-lg font-semibold transition hover:scale-105 active:scale-95 ${
								loading ? "opacity-50 cursor-not-allowed" : ""
							}`}
						>
							Choose File
						</div>
					</label>
					<label className="w-full flex flex-col items-center cursor-pointer mb-4">
						<span className="mb-2 text-[#063C44] font-medium">
							Or take a photo
						</span>
						<input
							type="file"
							accept="image/*"
							capture="environment"
							onChange={loading ? undefined : handleImageChange}
							disabled={loading}
							className="hidden"
						/>
						<div
							className={`w-full h-12 flex items-center justify-center bg-gradient-to-r from-[#11A97E] to-[#063C44] text-white rounded-lg font-semibold transition hover:scale-105 active:scale-95 ${
								loading ? "opacity-50 cursor-not-allowed" : ""
							}`}
						>
							Open Camera
						</div>
					</label>
				</div>
				{/* Show preview box */}
				<div className="w-full mb-4 flex flex-col items-center">
					{preview ? (
						<img
							src={preview}
							alt="Preview"
							className="rounded-lg shadow max-h-64 "
						/>
					) : (
						<div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
							<svg
								className="w-12 h-12 text-gray-400 mb-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							<p className="text-gray-500 text-sm">No image selected</p>
						</div>
					)}
				</div>
				{/* Remove or comment out the old imgRef preview */}
				{/* <img
					ref={imgRef}
					alt="Preview"
					className="rounded-lg shadow mb-4 max-h-48"
					style={{ display: "none" }}
				/> */}
				<p className="text-xs text-gray-400">
					Your image is processed locally and never leaves your device.
				</p>
			</div>

			{/* Results Section */}
			<div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
				<div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start">
					<ResultComponent items={items} score={score} points={points} />
				</div>
				<div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start">
					<OffersComponent offers={offers} />
				</div>
			</div>
		</div>
	);
};

export default UploadComponent;
