const OffersComponent = ({ offers }) => {
	const getOfferIcon = (offerName) => {
		const name = offerName.toLowerCase();
		if (name.includes("discount")) return "💰";
		if (name.includes("free")) return "🎁";
		if (name.includes("shipping")) return "🚚";
		if (name.includes("cashback")) return "💳";
		if (name.includes("bonus")) return "";
		return "️";
	};

	const getOfferColor = (index) => {
		const colors = [
			"from-purple-500 to-pink-500",
			"from-blue-500 to-cyan-500",
			"from-green-500 to-emerald-500",
			"from-orange-500 to-red-500",
			"from-indigo-500 to-purple-500",
			"from-teal-500 to-blue-500",
		];
		return colors[index % colors.length];
	};

	return (
		<>
			<h2 className="text-2xl font-bold mb-6 text-[#063C44] flex items-center">
				🎁 Available Offers
			</h2>

			{offers.length === 0 ? (
				<div className="text-center py-8">
					<div className="text-6xl mb-4">🎯</div>
					<p className="text-gray-500 font-medium mb-2">
						No offers available yet
					</p>
					<p className="text-sm text-gray-400">
						Earn more points to unlock exclusive deals!
					</p>
					<div className="mt-4 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-yellow-200">
						<p className="text-sm text-yellow-800">
							💡 Tip: Upload more clothing items to earn reward points and
							unlock offers!
						</p>
					</div>
				</div>
			) : (
				<div className="space-y-4">
					{offers.map((offer, idx) => (
						<div
							key={idx}
							className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						>
							{/* Background gradient */}
							<div
								className={`absolute inset-0 bg-gradient-to-r ${getOfferColor(
									idx
								)} opacity-90`}
							></div>

							{/* Content */}
							<div className="relative p-4 text-white">
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center">
										<span className="text-2xl mr-3">
											{getOfferIcon(offer.name)}
										</span>
										<h3 className="font-bold text-lg">{offer.name}</h3>
									</div>
									<div className="text-right">
										<span className="text-xs opacity-80">Limited Time</span>
									</div>
								</div>

								{offer.description && (
									<p className="text-sm opacity-90 mb-3">{offer.description}</p>
								)}

								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
											⭐ Premium
										</span>
										{offer.pointsRequired && (
											<span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
												{offer.pointsRequired} pts
											</span>
										)}
									</div>
									<button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200">
										Claim Offer
									</button>
								</div>
							</div>

							{/* Hover effect overlay */}
							<div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
						</div>
					))}

					{/* Additional info card */}
					<div className="mt-6 p-4 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] rounded-xl border border-gray-200">
						<div className="flex items-center mb-2">
							<span className="text-xl mr-2">💡</span>
							<h4 className="font-semibold text-[#063C44]">How it works</h4>
						</div>
						<p className="text-sm text-gray-600">
							Earn points by uploading clothing items. Higher eco-scores earn
							more points. Redeem points for exclusive sustainable fashion
							offers!
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default OffersComponent;
