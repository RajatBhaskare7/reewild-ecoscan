export const BASE_URL = 'http://localhost:5000/api';
export const ANALYZE_IMAGE = `${BASE_URL}/analyze`;
export const CALCULATE_SCORE = `${BASE_URL}/score`;
export const GET_OFFERS = (points) => `${BASE_URL}/offers?points=${points}`;
