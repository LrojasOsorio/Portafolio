import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './entity/projects.entity';
import { Skill } from '../skills/entity/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Skill])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
