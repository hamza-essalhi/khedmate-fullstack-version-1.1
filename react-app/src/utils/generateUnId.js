
import crypto from "crypto";

export const generateUniqueId =(firstId, secondId)=> {
  const input = `${firstId}-${secondId}`;
  const len = parseInt(input.length/2)
  const hash = crypto.createHash('sha256').update(input).digest('hex');
  return hash.substr(0, len); // Use the first 6 characters of the hash as the unique ID
}