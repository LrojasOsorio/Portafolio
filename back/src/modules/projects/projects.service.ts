import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from './entity/projects.entity';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { Skill } from '../skills/entity/skill.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>
  ) { }

  findAll() {
    return this.projectRepo.find({
      relations: ['skills'],
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepo.findOne({ where: { id }, relations: ['skills'] });

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
      repoUrl: 'https://github.com/tuusuario/turnos',
      status: 'coming_soon',
    });

    return this.projectRepo.save(newProject);
  }

  async create(dto: CreateProjectDto): Promise<Project> {
  const { skills, ...projectData } = dto;

  const project = this.projectRepo.create(projectData);

  project.slug = project.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

  if (skills && skills.length > 0) {
    const foundSkills = await this.skillRepo.find({
      where: { id: In(skills) },
    });

    if (foundSkills.length !== skills.length) {
      throw new BadRequestException('One or more skills not found');
    }

    project.skills = foundSkills;
  }

  return this.projectRepo.save(project);
}

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['skills'],
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    const { skills, ...projectData } = dto;

    Object.assign(project, projectData);

    if (skills) {
      const foundSkills = await this.skillRepo.findBy({
        id: In(skills),
      });

      project.skills = foundSkills;
    }

    return this.projectRepo.save(project);
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
