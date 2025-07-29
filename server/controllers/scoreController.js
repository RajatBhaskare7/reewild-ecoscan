const scores = require('../data/scores');
const offers = require('../data/offers');

exports.calculateScore = (req, res) => {
  const items = req.body.items;
  let total = 0;
  items.forEach(item => {
    total += scores[item] || 0;
  });
  const points = Math.floor(total / 2);
  console.log("Items received:", items);
console.log("Score map:", scores);
  res.json({ totalScore: total, rewardPoints: points });
};

exports.getOffers = (req, res) => {
  const points = parseInt(req.query.points);
  const available = offers.filter(o => points >= o.minPoints);
  res.json(available);
};
