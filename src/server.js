import express from "express";
import cors from "cors";
import MasterRouter from "./routes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public"));

MasterRouter(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
