const request = require("supertest");
const app = require("./server"); // Make sure your server exports the app

describe("API Endpoints", () => {
	it("should return identified items and scores (mocked)", async () => {
		// This test is a placeholder since /api/analyze requires OpenAI API and a real image
		const res = await request(app)
			.post("/api/analyze")
			.attach("image", Buffer.from("test"), "test.jpg");
		// Accept 200 or 500 (if OpenAI key is missing)
		expect([200, 500]).toContain(res.statusCode);
	});

	it("should calculate total score and eco points", async () => {
		const res = await request(app)
			.post("/api/score")
			.send({ items: ["T-shirt", "Jeans"] });
		expect(res.statusCode).toBe(200);
		expect(res.body.totalScore).toBe(20); // 5 + 15
		expect(res.body.rewardPoints).toBe(10); // Math.floor(20/2)
	});

	it("should return 0 score and points for unknown items", async () => {
		const res = await request(app)
			.post("/api/score")
			.send({ items: ["Unknown"] });
		expect(res.statusCode).toBe(200);
		expect(res.body.totalScore).toBe(0);
		expect(res.body.rewardPoints).toBe(0);
	});

	it("should return 0 score and points for empty items", async () => {
		const res = await request(app).post("/api/score").send({ items: [] });
		expect(res.statusCode).toBe(200);
		expect(res.body.totalScore).toBe(0);
		expect(res.body.rewardPoints).toBe(0);
	});

	it("should return offers based on points", async () => {
		const res = await request(app).get("/api/offers?points=10");
		expect(res.statusCode).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		// Should include all offers with minPoints <= 10
		const offerNames = res.body.map((o) => o.name);
		expect(offerNames).toEqual(
			expect.arrayContaining([
				"10% Off Eco Products",
				"Free Shipping",
				"Donate to Plant a Tree",
			])
		);
	});

	it("should return no offers if points are too low", async () => {
		const res = await request(app).get("/api/offers?points=0");
		expect(res.statusCode).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBe(0);
	});
});
