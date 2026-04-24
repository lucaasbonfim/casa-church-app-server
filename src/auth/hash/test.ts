import * as bcrypt from "bcryptjs";

(async () => {
  const hash = await bcrypt.hash("123456", 10);
  console.log("HASH:", hash);

  const isValid = await bcrypt.compare("123456", hash);
  console.log("COMPARE:", isValid);
})();
