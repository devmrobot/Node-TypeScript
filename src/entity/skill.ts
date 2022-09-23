import { Entity, OneToMany, Unique, PrimaryGeneratedColumn, Column } from "typeorm"
import { Grade } from "./grade"

@Entity()
@Unique(["name"])
export class Skill {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public name!: string

  @OneToMany(() => Grade, (grade) => grade.skill)
  public grades!: Grade[];
};

export default Skill;
