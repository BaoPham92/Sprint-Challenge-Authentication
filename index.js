const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;
console.log(process.env.JWT_SECRET)

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
