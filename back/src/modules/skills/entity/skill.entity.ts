import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}