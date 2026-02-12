import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column('simple-array')
  techStack: string[];

  @Column({ nullable: true })
  repoUrl: string;

  @Column({ nullable: true })
  demoUrl: string;

  @Column({ default: 'coming_soon' })
  status: string;
}
