import axios from "axios";

/**
 * Fetch data from an API endpoint
 * @param {string} url - The API endpoint
 * @returns {Promise<{ data: any, error: string|null }>}
 */

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data || "Error fetching data" };
  }
};
