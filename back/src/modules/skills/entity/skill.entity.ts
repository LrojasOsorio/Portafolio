import { Project } from 'src/modules/projects/entity/projects.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'devops' | 'tools';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'varchar' })
  level: SkillLevel;

  @Column({ type: 'varchar' })
  category: SkillCategory;

  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToMany(() => Project, (project) => project.skills)
  projects: Project[];
}