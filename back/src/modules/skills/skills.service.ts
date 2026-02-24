import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entity/skill.entity';
import { CreateSkillDto } from './dtos/create-skill.dto';
import { UpdateSkillDto } from './dtos/update-skill.dto';


@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,
  ) {}

  findAll() {
    return this.skillRepo.find({ order: { order: 'ASC', name: 'ASC' } });
  }

  async findOne(id: string) {
    const skill = await this.skillRepo.findOne({ where: { id } });
    if (!skill) throw new NotFoundException(`Skill with id ${id} not found`);
    return skill;
  }

  create(dto: CreateSkillDto) {
    const skill = this.skillRepo.create(dto);
    return this.skillRepo.save(skill);
  }

  async update(id: string, dto: UpdateSkillDto) {
    const skill = await this.findOne(id);
    const updated = this.skillRepo.merge(skill, dto);
    return this.skillRepo.save(updated);
  }

  async remove(id: string) {
    const skill = await this.findOne(id);
    await this.skillRepo.remove(skill);
    return { deleted: true, id };
  }
}