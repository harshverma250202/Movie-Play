import "dotenv/config";
import { connectDatabase } from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT || 4000;

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port: ${port}`);
    });
  })
  .catch(() => {
    console.log("MONGO db connection failed !!! ", err);
  });
