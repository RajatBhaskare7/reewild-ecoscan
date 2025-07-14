const ResultComponent = ({ items, score, points }) => {
	const getScoreColor = (score) => {
		if (score <= 5) return "text-green-600";
		if (score <= 10) return "text-yellow-600";
		return "text-red-600";
	};

	const getScoreIcon = (score) => {
		if (score <= 5) return "🌱";
		if (score <= 10) return "⚠️";
		return "🔥";
	};

	const getScoreMessage = (score) => {
		if (score <= 5) return "Excellent! Very eco-friendly choices.";
		if (score <= 10) return "Good effort! Room for improvement.";
		return "Consider more sustainable alternatives.";
	};

	return (
		<>
			<h2 className="text-2xl font-bold mb-6 text-[#063C44] flex items-center">
				👕 Detected Items
			</h2>

			{/* Items Section */}
			<div className="mb-6 w-full">
				{items.length === 0 ? (
					<div className="text-center py-8">
						<div className="text-6xl mb-4">👕</div>
						<p className="text-gray-500 font-medium">No items detected yet</p>
						<p className="text-sm text-gray-400">
							Upload an image to get started
						</p>
					</div>
				) : (
					<div className="space-y-3">
						{items.map((item, idx) => (
							<div
								key={idx}
								className="flex items-center p-3 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] rounded-lg border-l-4 border-[#11A97E] shadow-sm"
							>
								<div className="w-8 h-8 bg-[#11A97E] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
									{idx + 1}
								</div>
								<span className="font-semibold text-[#063C44] capitalize">
									{item}
								</span>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Carbon Score Section */}
			{score !== undefined && (
				<div className="mb-6 p-4 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] rounded-xl border border-gray-200">
					<div className="flex items-center justify-between mb-3">
						<h3 className="text-[12px] font-semibold text-[#063C44] flex items-center">
							🌍 Carbon Footprint
						</h3>
						<span className={`text-2xl ${getScoreColor(score)}`}>
							{getScoreIcon(score)}
						</span>
					</div>

					<div className="text-center mb-3">
						<span className="text-3xl font-bold text-[#063C44]">
							{score || 0}
						</span>
						<span className="text-lg text-gray-600 ml-1">kg CO₂</span>
					</div>

					<div className="w-full bg-gray-200 rounded-full h-2 mb-3">
						<div
							className={`h-2 rounded-full transition-all duration-500 ${
								score <= 5
									? "bg-green-500"
									: score <= 10
									? "bg-yellow-500"
									: "bg-red-500"
							}`}
							style={{ width: `${Math.min((score / 15) * 100, 100)}%` }}
						></div>
					</div>

					<p
						className={`text-sm text-center ${getScoreColor(
							score
						)} font-medium`}
					>
						{getScoreMessage(score)}
					</p>
				</div>
			)}

			{/* Reward Points Section */}
			{points !== undefined && (
				<div className="p-4 bg-gradient-to-r from-[#11A97E] to-[#063C44] rounded-xl text-white">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-lg font-semibold flex items-center">
							⭐ Eco Rewards
						</h3>
						<span className="text-lg">🎁</span>
					</div>

					<div className="text-center">
						<span className="text-3xl font-bold">{points || 0}</span>
						<span className="text-lg ml-1 opacity-90">points earned</span>
					</div>

					<p className="text-sm text-center mt-2 opacity-90">
						Redeem points for exclusive eco-friendly offers!
					</p>
				</div>
			)}
		</>
	);
};

export default ResultComponent;
