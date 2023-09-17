import crypto from "crypto-browserify";

export const generateUniqueId =(id)=> {
  const len = parseInt(id.length/2)
  const hash = crypto.createHash('sha256').update(id).digest('hex');
  return hash.substr(0, len); // Use the first 6 characters of the hash as the unique ID

}