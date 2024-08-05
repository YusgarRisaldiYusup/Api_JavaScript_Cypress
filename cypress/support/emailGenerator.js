function generateUniqueEmail() {
  const timestamp = new Date().getTime(); // Gunakan timestamp untuk memastikan keunikan
  return `user${timestamp}@example.com`;
}

module.exports = { generateUniqueEmail };
