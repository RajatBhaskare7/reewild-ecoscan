const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.analyzeImage = async (req, res) => {
	try {
		console.log("analyzeImage called");
		console.log("req.file:", req.file);
		const imagePath = path.resolve(req.file.path);
		console.log("Resolved imagePath:", imagePath);
		const imageBuffer = fs.readFileSync(imagePath);
		console.log("Read imageBuffer, length:", imageBuffer.length);
		const base64Image = imageBuffer.toString("base64");
		console.log("Converted image to base64, length:", base64Image.length);

		const requestPayload = {
			model: "gpt-4o",
			messages: [
				{
					role: "user",
					content: [
						{
							type: "text",
							text: "Identify the types of clothing in this image (e.g., T-shirt, Jeans, Jacket, Shoes). List them simply.",
						},
						{
							type: "image_url",
							image_url: { url: `data:image/jpeg;base64,${base64Image}` },
						},
					],
				},
			],
			max_tokens: 100,
		};
		console.log(
			"OpenAI request payload:",
			JSON.stringify(requestPayload).slice(0, 500)
		);

		const response = await openai.chat.completions.create(requestPayload);
		console.log("OpenAI response:", response);

		const message = response.choices[0]?.message?.content || "";
		console.log("OpenAI message content:", message);
		const items = message.match(/T-shirt|Jeans|Jacket|Shoes/gi) || [];
		console.log("Matched items:", items);
		res.json({ items });
	} catch (err) {
		console.error("Image recognition error:", err);
		res.status(500).json({ error: "Failed to analyze image." });
	}
};
