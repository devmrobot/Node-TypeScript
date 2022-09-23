import express from "express";
import cors from "cors";
import { dataSource } from "./utils"

import { wilderController } from "./controller/wilder";
import { skillController } from "./controller/skill";
import { gradeController } from "./controller/grade";

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

app.post("/api/wilders", wilderController.create);
app.delete("/api/wilders?:id", wilderController.delete);
app.get("/api/wilders", wilderController.findAllWilders);
app.put("/api/wilders", wilderController.update);

app.post("/api/skills", skillController.create);
app.delete("/api/skills", skillController.delete);
app.get("/api/skills", skillController.read);
app.put("/api/skills", skillController.update);

app.post("/api/grade", gradeController.create);

const start = async (): Promise<void> => {
  await dataSource.initialize();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

void start();