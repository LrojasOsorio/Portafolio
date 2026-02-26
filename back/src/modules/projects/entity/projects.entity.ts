import { Skill } from 'src/modules/skills/entity/skill.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  repoUrl: string;

  @Column({ nullable: true })
  demoUrl: string;

  @Column({ default: 'coming_soon' })
  status: string;

  @ManyToMany(() => Skill, (skill) => skill.projects)
  @JoinTable()
  skills: Skill[];
}
