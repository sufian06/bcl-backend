import mongoose from "mongoose";
import app from "./app.js";
import config from "./app/config/index.js";

async function main() {
  try {
    await mongoose.connect(config.database_url);

    app.listen(config.port, () => {
      console.log(`bcl app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
