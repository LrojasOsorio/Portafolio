import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsIn(['beginner', 'intermediate', 'advanced'])
  level: 'beginner' | 'intermediate' | 'advanced';

  @IsIn(['frontend', 'backend', 'database', 'devops', 'tools'])
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';

  @IsOptional()
  @IsInt()
  order?: number;
}