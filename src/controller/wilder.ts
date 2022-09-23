import { Request, Response } from "express"
import { dataSource } from "../utils"
// import { Skill as skillEntity } from "../entity/skill";
import { Wilder as wilderEntity } from "../entity/wilder";
// import { Grade } from "../entity/grade";

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}

export const wilderController : IController = {
  
  // FIND ALL WILDERS
  findAllWilders: async (req, res) => {
    try {
      const allWilders = await dataSource.getRepository(wilderEntity).find({
        relations: {
          grades: {
            skill: true,
          },
        },
      });
      res.status(201).send(allWilders);
    } catch (error) {
      res.status(500).send("Error fetching Wilders");
    }
  },

  // CREATE WILDER
  create: async (req, res): Promise<void> => {
    try {
      const { name, city, description } = req.body;
      await dataSource
      .getRepository(wilderEntity)
      .save({ name, city, description })
      .then(() => {
        res.status(201).send("Created wilder");
      })
    } catch (err) {
      res.status(500).send(err);
    }
  },

  // DELETE
  delete: async (req: any, res) => {
    try {
      // const { id } = req.query;
      await dataSource.getRepository(wilderEntity).delete(req.query.id);
      res.status(201).send("wilder deleted");
    } catch (err) {
      res.send(err);
    }
  },

  // UPDATE
  update: async (req, res) => {
    console.log(req.body);
    await dataSource
      .getRepository(wilderEntity)
      .update(req.body.id, { name: req.body.name });
    res.send("Wilder Updated");
  },

  // ADD SKILL TO WILDER
  // addSkill: async (req, res) => {
  //   const { wilderName, skillName, grade } = req.body;
  //   try {
  //     const wilderToAddSkill = await dataSource
  //       .getRepository(wilderEntity)
  //       .findOneBy({ name: wilderName });
  //     console.log("wilderToUpdate", wilderToAddSkill);

  //     const skillToAddToWilder = await dataSource
  //       .getRepository(skillEntity)
  //       .findOneBy({ name: skillName });
  //     console.log("skillToAdd", skillToAddToWilder);

  //     if (wilderToAddSkill !== null && skillToAddToWilder !== null) {
  //       const newGrade = new Grade();
  //       newGrade.grade = grade;
  //       newGrade.wilder = wilderToAddSkill;
  //       newGrade.skill = skillToAddToWilder;
  //       wilderToAddSkill.grades.push(newGrade);

  //       await dataSource.getRepository(Grade).save(newGrade);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};