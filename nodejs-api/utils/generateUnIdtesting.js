
import crypto from "crypto";

export const generateUniqueId =(id)=> {
  const len = parseInt(id.length/2)
  const hash = crypto.createHash('sha256').update(id).digest('hex');
  return hash.substr(0, len); // Use the first 6 characters of the hash as the unique ID

}
  // Usage example
const from = '64dfca5ef93fbf236b8c8f85';
const to = '64f49c968660bbd494a55c63';
const uniqueId = generateUniqueId(from+to);
console.log('Generated Unique ID:', uniqueId)