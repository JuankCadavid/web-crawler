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
import { ScraperService } from './scraper.service';
import { CreateScrapingJobDto, UpdateScrapingJobDto, ScrapingJobQueryDto } from '../../dto';

@ApiTags('scraper')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('jobs')
  @ApiOperation({ summary: 'Get all scraping jobs' })
  @ApiResponse({ status: 200, description: 'List of scraping jobs retrieved successfully' })
  async findAllJobs(@Request() req, @Query() query: ScrapingJobQueryDto) {
    return this.scraperService.findAllJobs(req.user.id, query);
  }

  @Get('jobs/:id')
  @ApiOperation({ summary: 'Get a specific scraping job by ID' })
  @ApiResponse({ status: 200, description: 'Scraping job retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Scraping job not found' })
  async findOneJob(@Param('id') id: string, @Request() req) {
    return this.scraperService.findOneJob(id, req.user.id);
  }

  @Post('jobs')
  @ApiOperation({ summary: 'Create a new scraping job' })
  @ApiResponse({ status: 201, description: 'Scraping job created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createJob(@Body() createJobDto: CreateScrapingJobDto, @Request() req) {
    return this.scraperService.createJob(createJobDto, req.user.id);
  }

  @Put('jobs/:id')
  @ApiOperation({ summary: 'Update an existing scraping job' })
  @ApiResponse({ status: 200, description: 'Scraping job updated successfully' })
  @ApiResponse({ status: 404, description: 'Scraping job not found' })
  async updateJob(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateScrapingJobDto,
    @Request() req
  ) {
    return this.scraperService.updateJob(id, updateJobDto, req.user.id);
  }

  @Delete('jobs/:id')
  @ApiOperation({ summary: 'Delete a scraping job' })
  @ApiResponse({ status: 200, description: 'Scraping job deleted successfully' })
  @ApiResponse({ status: 404, description: 'Scraping job not found' })
  async removeJob(@Param('id') id: string, @Request() req) {
    return this.scraperService.removeJob(id, req.user.id);
  }

  @Post('jobs/:id/run')
  @ApiOperation({ summary: 'Trigger immediate execution of scraping job' })
  @ApiResponse({ status: 200, description: 'Scraping job triggered successfully' })
  async runJob(@Param('id') id: string, @Request() req) {
    return this.scraperService.runJob(id, req.user.id);
  }

  @Post('jobs/:id/pause')
  @ApiOperation({ summary: 'Pause a scraping job' })
  @ApiResponse({ status: 200, description: 'Scraping job paused successfully' })
  async pauseJob(@Param('id') id: string, @Request() req) {
    return this.scraperService.pauseJob(id, req.user.id);
  }

  @Post('jobs/:id/resume')
  @ApiOperation({ summary: 'Resume a paused scraping job' })
  @ApiResponse({ status: 200, description: 'Scraping job resumed successfully' })
  async resumeJob(@Param('id') id: string, @Request() req) {
    return this.scraperService.resumeJob(id, req.user.id);
  }

  @Get('results')
  @ApiOperation({ summary: 'Get scraping results with filtering' })
  @ApiResponse({ status: 200, description: 'Scraping results retrieved successfully' })
  async getResults(@Request() req, @Query() query: any) {
    return this.scraperService.getResults(req.user.id, query);
  }

  @Get('results/:id')
  @ApiOperation({ summary: 'Get specific scraping result by ID' })
  @ApiResponse({ status: 200, description: 'Scraping result retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Scraping result not found' })
  async getResult(@Param('id') id: string, @Request() req) {
    return this.scraperService.getResult(id, req.user.id);
  }

  @Get('jobs/:id/results')
  @ApiOperation({ summary: 'Get results for a specific scraping job' })
  @ApiResponse({ status: 200, description: 'Job results retrieved successfully' })
  async getJobResults(@Param('id') id: string, @Request() req, @Query() query: any) {
    return this.scraperService.getJobResults(id, req.user.id, query);
  }

  @Get('analytics/overview')
  @ApiOperation({ summary: 'Get scraping analytics overview' })
  @ApiResponse({ status: 200, description: 'Analytics overview retrieved successfully' })
  async getAnalyticsOverview(@Request() req) {
    return this.scraperService.getAnalyticsOverview(req.user.id);
  }

  @Get('jobs/:id/analytics')
  @ApiOperation({ summary: 'Get analytics for specific scraping job' })
  @ApiResponse({ status: 200, description: 'Job analytics retrieved successfully' })
  async getJobAnalytics(@Param('id') id: string, @Request() req) {
    return this.scraperService.getJobAnalytics(id, req.user.id);
  }

  @Post('validate-url')
  @ApiOperation({ summary: 'Validate URL for scraping (robots.txt check)' })
  @ApiResponse({ status: 200, description: 'URL validation completed' })
  async validateUrl(@Body('url') url: string, @Request() req) {
    return this.scraperService.validateUrl(url, req.user.id);
  }

  @Get('domains/blocked')
  @ApiOperation({ summary: 'Get list of blocked domains' })
  @ApiResponse({ status: 200, description: 'Blocked domains retrieved successfully' })
  async getBlockedDomains(@Request() req) {
    return this.scraperService.getBlockedDomains(req.user.id);
  }

  @Post('content/process')
  @ApiOperation({ summary: 'Process and clean scraped content' })
  @ApiResponse({ status: 200, description: 'Content processed successfully' })
  async processContent(@Body('resultId') resultId: string, @Request() req) {
    return this.scraperService.processContent(resultId, req.user.id);
  }
}
