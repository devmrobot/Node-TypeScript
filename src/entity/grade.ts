import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm"
import { Wilder } from "./wilder"
import { Skill } from "./skill"

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public wilderId!: number

  @Column()
  public skillId!: number

  @Column()
  public grade!: number

  @ManyToOne(() => Wilder, (wilder) => wilder.grades, {
    onDelete:"CASCADE",
  })
  public wilder!: Wilder

  @ManyToOne(() => Skill, (skill) => skill.grades, {
    onDelete:"CASCADE",
  })
  public skill!: Skill
};
