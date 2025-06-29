const bcrypt = require("bcryptjs");

bcrypt.hash("123456789", 10).then((hash) => {
  console.log("Generated hash:", hash);
});
