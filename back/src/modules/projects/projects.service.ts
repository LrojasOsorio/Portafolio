import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entity/projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  findAll() {
    return this.projectRepo.find({ order: { id: 'ASC' } });
  }

  async createProject() {
  const newProject = this.projectRepo.create({
    title: 'Turnos App',
    slug: 'turnos-app',
    description: 'Sistema de gestión de turnos creado completamente por mí.',
    techStack: ['React', 'NestJS', 'PostgreSQL'],
    repoUrl: 'https://github.com/tuusuario/turnos',
    demoUrl: undefined,
    status: 'coming_soon',
  });

  return this.projectRepo.save(newProject);
}

}
