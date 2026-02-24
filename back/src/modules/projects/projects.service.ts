import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entity/projects.entity';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  findAll() {
    return this.projectRepo.find();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepo.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
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

  create(dto: CreateProjectDto) {
    const project = this.projectRepo.create(dto);
    return this.projectRepo.save(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepo.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    const updated = this.projectRepo.merge(project, dto);
    return this.projectRepo.save(updated);
  }

  async remove(id: string): Promise<{ deleted: true }> {
    const project = await this.projectRepo.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    await this.projectRepo.remove(project);
    return { deleted: true };
  }
}
