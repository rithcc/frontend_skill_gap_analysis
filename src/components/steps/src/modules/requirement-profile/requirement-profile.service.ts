import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequirementProfileDto } from './dto/create-requirement-profile.dto';
import { RequirementProfile } from '@prisma/client';

@Injectable()
export class RequirementProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRequirementProfileDto: CreateRequirementProfileDto): Promise<RequirementProfile> {
    return this.prisma.requirementProfile.create({
      data: createRequirementProfileDto,
    });
  }

  async findAll(): Promise<RequirementProfile[]> {
    return this.prisma.requirementProfile.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<RequirementProfile> {
    const profile = await this.prisma.requirementProfile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException(`Requirement profile with ID ${id} not found`);
    }

    return profile;
  }

  async findByDocumentId(documentId: string): Promise<RequirementProfile | null> {
    return this.prisma.requirementProfile.findFirst({
      where: { documentId },
    });
  }

  async update(id: string, updateData: Partial<CreateRequirementProfileDto>): Promise<RequirementProfile> {
    const existingProfile = await this.findOne(id);
    
    return this.prisma.requirementProfile.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string): Promise<RequirementProfile> {
    const existingProfile = await this.findOne(id);
    
    return this.prisma.requirementProfile.delete({
      where: { id },
    });
  }
}
