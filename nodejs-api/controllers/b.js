import bcrypt from "bcrypt";
// Hash a string using bcrypt
async function hashString(inputString) {
  try {
    // Generate a salt with a specified number of rounds (e.g., 10)
    const saltRounds = 11;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the input string with the generated salt
    const hash = await bcrypt.hash(inputString, salt);

    return hash;
  } catch (error) {
    throw error;
  }
}

// Example usage:
const inputString = 'gR5bmJBUbQhLTZa1';
hashString(inputString)
  .then((hash) => {
    console.log('Hashed String:', hash);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
