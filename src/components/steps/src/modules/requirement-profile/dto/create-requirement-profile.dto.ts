import { IsNotEmpty, IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequirementProfileDto {
  @ApiProperty({
    description: 'Skill experience level (0-4 index)',
    minimum: 0,
    maximum: 4,
    example: 2
  })
  @IsInt()
  @Min(0)
  @Max(4)
  skillExperience: number;

  @ApiProperty({
    description: 'Skill competence level',
    enum: ['Basic', 'Working', 'Proficient', 'Advanced', 'Expert'],
    example: 'Proficient'
  })
  @IsString()
  @IsNotEmpty()
  skillCompetence: string;

  @ApiProperty({
    description: 'Project timeline in months',
    minimum: 1,
    maximum: 24,
    example: 6
  })
  @IsInt()
  @Min(1)
  @Max(24)
  timeline: number;

  @ApiProperty({
    description: 'Project budget in dollars',
    minimum: 5000,
    maximum: 100000,
    example: 25000
  })
  @IsInt()
  @Min(5000)
  @Max(100000)
  budget: number;

  @ApiProperty({
    description: 'Technical skills level (1-5)',
    minimum: 1,
    maximum: 5,
    example: 3
  })
  @IsInt()
  @Min(1)
  @Max(5)
  technicalLevel: number;

  @ApiProperty({
    description: 'Domain knowledge level (1-5)',
    minimum: 1,
    maximum: 5,
    example: 4
  })
  @IsInt()
  @Min(1)
  @Max(5)
  domainLevel: number;

  @ApiProperty({
    description: 'Process skills level (1-5)',
    minimum: 1,
    maximum: 5,
    example: 2
  })
  @IsInt()
  @Min(1)
  @Max(5)
  processLevel: number;

  @ApiProperty({
    description: 'Managerial skills level (1-5)',
    minimum: 1,
    maximum: 5,
    example: 1
  })
  @IsInt()
  @Min(1)
  @Max(5)
  managerialLevel: number;

  @ApiProperty({
    description: 'Collaboration skills level (1-5)',
    minimum: 1,
    maximum: 5,
    example: 3
  })
  @IsInt()
  @Min(1)
  @Max(5)
  collaborationLevel: number;

  @ApiProperty({
    description: 'Associated document ID (optional)',
    example: 'clw123456789',
    required: false
  })
  @IsOptional()
  @IsString()
  documentId?: string;
}
