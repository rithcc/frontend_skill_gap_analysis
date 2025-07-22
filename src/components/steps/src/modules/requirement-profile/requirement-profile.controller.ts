import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { RequirementProfileService } from './requirement-profile.service';
import { CreateRequirementProfileDto } from './dto/create-requirement-profile.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Requirement Profiles')
@Controller('requirement-profiles')
export class RequirementProfileController {
  constructor(private readonly requirementProfileService: RequirementProfileService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new requirement profile' })
  @ApiResponse({ status: 201, description: 'Requirement profile created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createRequirementProfileDto: CreateRequirementProfileDto) {
    return this.requirementProfileService.create(createRequirementProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all requirement profiles' })
  @ApiResponse({ status: 200, description: 'List of requirement profiles retrieved successfully' })
  @ApiQuery({ name: 'documentId', required: false, description: 'Filter by document ID' })
  async findAll(@Query('documentId') documentId?: string) {
    if (documentId) {
      const profile = await this.requirementProfileService.findByDocumentId(documentId);
      return profile ? [profile] : [];
    }
    return this.requirementProfileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a requirement profile by ID' })
  @ApiParam({ name: 'id', description: 'Requirement profile ID' })
  @ApiResponse({ status: 200, description: 'Requirement profile retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Requirement profile not found' })
  findOne(@Param('id') id: string) {
    return this.requirementProfileService.findOne(id);
  }

  @Get('by-document/:documentId')
  @ApiOperation({ summary: 'Get requirement profile by document ID' })
  @ApiParam({ name: 'documentId', description: 'Document ID' })
  @ApiResponse({ status: 200, description: 'Requirement profile retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Requirement profile not found for the document' })
  async findByDocumentId(@Param('documentId') documentId: string) {
    const profile = await this.requirementProfileService.findByDocumentId(documentId);
    if (!profile) {
      throw new NotFoundException(`No requirement profile found for document ID ${documentId}`);
    }
    return profile;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a requirement profile' })
  @ApiParam({ name: 'id', description: 'Requirement profile ID' })
  @ApiResponse({ status: 200, description: 'Requirement profile updated successfully' })
  @ApiResponse({ status: 404, description: 'Requirement profile not found' })
  update(
    @Param('id') id: string,
    @Body() updateRequirementProfileDto: Partial<CreateRequirementProfileDto>,
  ) {
    return this.requirementProfileService.update(id, updateRequirementProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a requirement profile' })
  @ApiParam({ name: 'id', description: 'Requirement profile ID' })
  @ApiResponse({ status: 200, description: 'Requirement profile deleted successfully' })
  @ApiResponse({ status: 404, description: 'Requirement profile not found' })
  remove(@Param('id') id: string) {
    return this.requirementProfileService.remove(id);
  }
}
