import axios from 'axios';
import { ANALYZE_IMAGE, CALCULATE_SCORE, GET_OFFERS } from './constant';

export const analyzeImage = async (formData) => {
  const res = await axios.post(ANALYZE_IMAGE, formData);
  return res.data;
};

export const calculateScore = async (items) => {
  const res = await axios.post(CALCULATE_SCORE, { items });
  return res.data;
};

export const fetchOffers = async (points) => {
  const res = await axios.get(GET_OFFERS(points));
  return res.data;
};