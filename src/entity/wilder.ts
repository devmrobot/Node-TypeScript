import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm"
import { Grade } from "./grade"

@Entity()
export class Wilder {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public name!: string

  @Column()
  public city!: string

  @Column()
  public description!: string

  @OneToMany(() => Grade, (grade) => grade.wilder)
  public grades!: Grade[];
};