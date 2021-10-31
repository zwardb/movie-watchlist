const db = require("./index");

const runSeed = async() => {
  await db.sync({ force: true });
  console.log("Database seeded!");
  process.kill(0);
};
runSeed();
