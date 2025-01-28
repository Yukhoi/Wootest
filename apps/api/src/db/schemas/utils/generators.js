/**
 * Generates a random 6-letter course code
 * @returns {string} Unique course code
 */
const generateCourseCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export default {
  generateCourseCode
};