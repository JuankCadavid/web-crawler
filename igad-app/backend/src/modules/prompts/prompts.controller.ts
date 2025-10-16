import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PromptsService } from './prompts.service';
import { CreatePromptDto, UpdatePromptDto, PromptQueryDto } from '../../dto';

@ApiTags('prompts')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all prompt templates' })
  @ApiResponse({ status: 200, description: 'List of prompt templates retrieved successfully' })
  async findAll(@Request() req, @Query() query: PromptQueryDto) {
    return this.promptsService.findAll(req.user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific prompt template by ID' })
  @ApiResponse({ status: 200, description: 'Prompt template retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Prompt template not found' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.promptsService.findOne(id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new prompt template' })
  @ApiResponse({ status: 201, description: 'Prompt template created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createPromptDto: CreatePromptDto, @Request() req) {
    return this.promptsService.create(createPromptDto, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing prompt template' })
  @ApiResponse({ status: 200, description: 'Prompt template updated successfully' })
  @ApiResponse({ status: 404, description: 'Prompt template not found' })
  async update(
    @Param('id') id: string,
    @Body() updatePromptDto: UpdatePromptDto,
    @Request() req
  ) {
    return this.promptsService.update(id, updatePromptDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a prompt template' })
  @ApiResponse({ status: 200, description: 'Prompt template deleted successfully' })
  @ApiResponse({ status: 404, description: 'Prompt template not found' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.promptsService.remove(id, req.user.id);
  }

  @Get(':id/versions')
  @ApiOperation({ summary: 'Get version history for prompt template' })
  @ApiResponse({ status: 200, description: 'Version history retrieved successfully' })
  async getVersions(@Param('id') id: string, @Request() req) {
    return this.promptsService.getVersionHistory(id, req.user.id);
  }

  @Post(':id/versions')
  @ApiOperation({ summary: 'Create new version of prompt template' })
  @ApiResponse({ status: 201, description: 'New version created successfully' })
  async createVersion(
    @Param('id') id: string,
    @Body('template') template: string,
    @Body('changelog') changelog: string,
    @Request() req
  ) {
    return this.promptsService.createVersion(id, template, changelog, req.user.id);
  }

  @Post(':id/test')
  @ApiOperation({ summary: 'Test prompt template with sample data' })
  @ApiResponse({ status: 200, description: 'Prompt test completed successfully' })
  async testPrompt(
    @Param('id') id: string,
    @Body('variables') variables: Record<string, any>,
    @Request() req
  ) {
    return this.promptsService.testPrompt(id, variables, req.user.id);
  }

  @Post(':id/ab-test')
  @ApiOperation({ summary: 'Create A/B test for prompt template' })
  @ApiResponse({ status: 201, description: 'A/B test created successfully' })
  async createABTest(
    @Param('id') id: string,
    @Body('variants') variants: any[],
    @Body('trafficSplit') trafficSplit: number[],
    @Request() req
  ) {
    return this.promptsService.createABTest(id, variants, trafficSplit, req.user.id);
  }

  @Get(':id/ab-tests')
  @ApiOperation({ summary: 'Get A/B test results for prompt template' })
  @ApiResponse({ status: 200, description: 'A/B test results retrieved successfully' })
  async getABTestResults(@Param('id') id: string, @Request() req) {
    return this.promptsService.getABTestResults(id, req.user.id);
  }

  @Get(':id/analytics')
  @ApiOperation({ summary: 'Get prompt performance analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
  async getAnalytics(@Param('id') id: string, @Request() req) {
    return this.promptsService.getAnalytics(id, req.user.id);
  }

  @Post(':id/share')
  @ApiOperation({ summary: 'Share prompt template with other users' })
  @ApiResponse({ status: 200, description: 'Prompt template shared successfully' })
  async sharePrompt(
    @Param('id') id: string,
    @Body('userIds') userIds: string[],
    @Body('permissions') permissions: string[],
    @Request() req
  ) {
    return this.promptsService.sharePrompt(id, userIds, permissions, req.user.id);
  }

  @Get('categories/list')
  @ApiOperation({ summary: 'Get all prompt categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async getCategories(@Request() req) {
    return this.promptsService.getCategories(req.user.id);
  }

  @Get('tags/popular')
  @ApiOperation({ summary: 'Get popular prompt tags' })
  @ApiResponse({ status: 200, description: 'Popular tags retrieved successfully' })
  async getPopularTags(@Request() req) {
    return this.promptsService.getPopularTags(req.user.id);
  }
}
