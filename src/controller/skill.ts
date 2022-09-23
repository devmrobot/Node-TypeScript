import skill from "../entity/skill";
import { dataSource } from "../utils"
import { Request, Response } from "express"

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}

export const skillController : IController = {

  // READ SKILLS
  read: async (req, res) => {
    const allSkills = await dataSource.getRepository(skill).find();
    res.send(allSkills);
  },

  // CREATE SKILL
  create: async (req, res):Promise<void> => {
    try {
      await dataSource.getRepository(skill).save(req.body)
      res.status(201).send(`The skill has been created`)
    } catch (error) {
      res.status(500).send(`Error while creating wilder ${name}`)
    }
  },

  // DELETE SKILL
  delete: async (req, res) => {
    console.log(req.body);
    await dataSource.getRepository(skill).delete(req.body.idToDelete);
    res.send("Skill deleted");
  },
  
  // UPDATE SKILL
  update: async (req, res) => {
    console.log(req.body);
    await dataSource
      .getRepository(skill)
      .update(req.body.id, { name: req.body.name });
    res.send("Skill Updated");
  },
};