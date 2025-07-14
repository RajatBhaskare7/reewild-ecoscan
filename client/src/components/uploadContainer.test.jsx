/* eslint-env jest */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UploadComponent from "./uploadContainer";
// Mock TensorFlow.js and mobilenet
jest.mock("@tensorflow-models/mobilenet", () => ({
	load: jest.fn().mockResolvedValue({
		classify: jest.fn().mockResolvedValue([
			{ className: "T-shirt", probability: 0.9 },
			{ className: "Jeans", probability: 0.8 },
		]),
	}),
}));
jest.mock("@tensorflow/tfjs", () => ({}));

// Mock fetch
global.fetch = jest.fn((url, options) => {
	if (url.includes("/score")) {
		return Promise.resolve({
			json: () => Promise.resolve({ totalScore: 20, rewardPoints: 10 }),
		});
	}
	if (url.includes("/offers")) {
		return Promise.resolve({
			json: () =>
				Promise.resolve([
					{ name: "10% Off Eco Products", minPoints: 5 },
					{ name: "Free Shipping", minPoints: 10 },
				]),
		});
	}
	return Promise.resolve({ json: () => Promise.resolve({}) });
});

describe("UploadComponent", () => {
	const setup = (props = {}) => {
		const defaultProps = {
			items: [],
			setItems: jest.fn(),
			score: 0,
			setScore: jest.fn(),
			points: 0,
			setPoints: jest.fn(),
			offers: [],
			setOffers: jest.fn(),
		};
		return render(<UploadComponent {...defaultProps} {...props} />);
	};

	it("renders upload and preview UI", () => {
		setup();
		expect(screen.getByText(/EcoScan: Clothing Analyzer/i)).toBeInTheDocument();
		expect(screen.getByText(/Choose File/i)).toBeInTheDocument();
		expect(screen.getByText(/Open Camera/i)).toBeInTheDocument();
		expect(screen.getByText(/No image selected/i)).toBeInTheDocument();
	});

	it("shows loading spinner when loading", () => {
		setup();
		// Simulate loading state
		fireEvent.change(
			screen
				.getAllByLabelText(/Upload from device|Or take a photo/i)[0]
				.querySelector("input"),
			{
				target: {
					files: [new File(["dummy"], "test.jpg", { type: "image/jpeg" })],
				},
			}
		);
		// Loading spinner should appear
		expect(screen.getByText(/Processing.../i)).toBeInTheDocument();
	});

	it("calls setItems, setScore, setPoints, setOffers on image upload", async () => {
		const setItems = jest.fn();
		const setScore = jest.fn();
		const setPoints = jest.fn();
		const setOffers = jest.fn();
		setup({ setItems, setScore, setPoints, setOffers });
		const fileInput = screen
			.getAllByLabelText(/Upload from device|Or take a photo/i)[0]
			.querySelector("input");
		fireEvent.change(fileInput, {
			target: {
				files: [new File(["dummy"], "test.jpg", { type: "image/jpeg" })],
			},
		});
		await waitFor(() => {
			expect(setItems).toHaveBeenCalledWith(["T-shirt", "Jeans"]);
			expect(setScore).toHaveBeenCalledWith(20);
			expect(setPoints).toHaveBeenCalledWith(10);
			expect(setOffers).toHaveBeenCalledWith([
				{ name: "10% Off Eco Products", minPoints: 5 },
				{ name: "Free Shipping", minPoints: 10 },
			]);
		});
	});

	it("shows image preview after upload", async () => {
		setup();
		const file = new File(["dummy"], "test.jpg", { type: "image/jpeg" });
		const fileInput = screen
			.getAllByLabelText(/Upload from device|Or take a photo/i)[0]
			.querySelector("input");
		fireEvent.change(fileInput, { target: { files: [file] } });
		await waitFor(() => {
			expect(screen.getByAltText("Preview")).toBeInTheDocument();
		});
	});
});
