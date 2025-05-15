import axios from 'axios';

const API_URL = 'http://localhost:8080';

/**
 * Converts a number to its Roman numeral representation
 * @param {number} number - The number to convert (1-3999)
 * @returns {Promise<Object>} - Promise that resolves to { input: string, output: string }
 * @throws {Error} If the API call fails or returns an error
 */
export const convertToRomanNumeral = async (number) => {
  console.log('Converting number to Roman numeral:', number);
  try {
    const response = await axios.get(`${API_URL}/romannumeral?query=${number}`);
    return response.data;
  } catch (error) {
    console.error('Error converting number:', number, error.message);
    throw error.response?.data || 'Something went wrong';
  }
}; 