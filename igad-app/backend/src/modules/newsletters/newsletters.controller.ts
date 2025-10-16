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
import { NewslettersService } from './newsletters.service';
import { CreateNewsletterDto, UpdateNewsletterDto, NewsletterQueryDto } from '../../dto';

@ApiTags('newsletters')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('newsletters')
export class NewslettersController {
  constructor(private readonly newslettersService: NewslettersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all newsletters' })
  @ApiResponse({ status: 200, description: 'List of newsletters retrieved successfully' })
  async findAll(@Request() req, @Query() query: NewsletterQueryDto) {
    return this.newslettersService.findAll(req.user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific newsletter by ID' })
  @ApiResponse({ status: 200, description: 'Newsletter retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Newsletter not found' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.newslettersService.findOne(id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new newsletter' })
  @ApiResponse({ status: 201, description: 'Newsletter created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createNewsletterDto: CreateNewsletterDto, @Request() req) {
    return this.newslettersService.create(createNewsletterDto, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing newsletter' })
  @ApiResponse({ status: 200, description: 'Newsletter updated successfully' })
  @ApiResponse({ status: 404, description: 'Newsletter not found' })
  async update(
    @Param('id') id: string,
    @Body() updateNewsletterDto: UpdateNewsletterDto,
    @Request() req
  ) {
    return this.newslettersService.update(id, updateNewsletterDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a newsletter' })
  @ApiResponse({ status: 200, description: 'Newsletter deleted successfully' })
  @ApiResponse({ status: 404, description: 'Newsletter not found' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.newslettersService.remove(id, req.user.id);
  }

  @Post(':id/generate')
  @ApiOperation({ summary: 'Generate newsletter content using AI' })
  @ApiResponse({ status: 200, description: 'Newsletter content generated successfully' })
  async generateContent(
    @Param('id') id: string,
    @Body('sources') sources: string[],
    @Request() req
  ) {
    return this.newslettersService.generateContent(id, sources, req.user.id);
  }

  @Post(':id/preview')
  @ApiOperation({ summary: 'Generate newsletter preview' })
  @ApiResponse({ status: 200, description: 'Newsletter preview generated successfully' })
  async generatePreview(@Param('id') id: string, @Request() req) {
    return this.newslettersService.generatePreview(id, req.user.id);
  }

  @Post(':id/distribute')
  @ApiOperation({ summary: 'Distribute newsletter via email' })
  @ApiResponse({ status: 200, description: 'Newsletter distributed successfully' })
  async distribute(
    @Param('id') id: string,
    @Body('recipients') recipients: string[],
    @Request() req
  ) {
    return this.newslettersService.distribute(id, recipients, req.user.id);
  }

  @Get(':id/analytics')
  @ApiOperation({ summary: 'Get newsletter engagement analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
  async getAnalytics(@Param('id') id: string, @Request() req) {
    return this.newslettersService.getAnalytics(id, req.user.id);
  }

  @Post('sources')
  @ApiOperation({ summary: 'Add content source for newsletters' })
  @ApiResponse({ status: 201, description: 'Content source added successfully' })
  async addContentSource(
    @Body('name') name: string,
    @Body('url') url: string,
    @Body('type') type: 'rss' | 'website' | 'api',
    @Request() req
  ) {
    return this.newslettersService.addContentSource(name, url, type, req.user.id);
  }

  @Get('sources/list')
  @ApiOperation({ summary: 'Get all content sources' })
  @ApiResponse({ status: 200, description: 'Content sources retrieved successfully' })
  async getContentSources(@Request() req) {
    return this.newslettersService.getContentSources(req.user.id);
  }
}
