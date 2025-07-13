const request = require("supertest");
const app = require("./server"); // Make sure your server exports the app

describe("API Endpoints", () => {
	it("should return identified items and scores", async () => {
		const res = await request(app)
			.post("/api/image")
			.attach("image", Buffer.from("test"), "test.jpg");
		expect(res.statusCode).toBe(200);
		expect(res.body.items).toBeDefined();
	});

	it("should calculate total score and eco points", async () => {
		const res = await request(app)
			.post("/api/score")
			.send({ items: ["T-shirt", "Jeans"] });
		expect(res.statusCode).toBe(200);
		expect(res.body.totalScore).toBe(15); // Example: 5 + 10
		expect(res.body.ecoPoints).toBeDefined();
	});
});
