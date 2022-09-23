import { Request, Response } from "express";
import { dataSource } from "../utils";
import { Skill as skillEntity } from "../entity/skill";
import { Wilder as wilderEntity } from "../entity/wilder";
import { Grade as gradeEntity } from "../entity/grade";

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}

export const gradeController: IController = {
  create: async (req, res) => {
    try {
      // Find the wilder
      const wilderFromDB = await dataSource
        .getRepository(wilderEntity)
        .findOneBy({ name: req.body.wilderName });

      // Find the skill
      const skillFromDB = await dataSource
        .getRepository(skillEntity)
        .findOneBy({ name: req.body.skillName });

      // Save the grade
      if (wilderFromDB !== null && skillFromDB !== null) {
        await dataSource.getRepository(gradeEntity).save({
          grade: req.body.grade,
          wilder: wilderFromDB,
          skill: skillFromDB,
        });
        res.status(201).json({ message: "Grade created" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
