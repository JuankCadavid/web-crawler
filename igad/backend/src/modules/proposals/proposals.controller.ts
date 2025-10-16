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
import { ProposalsService } from './proposals.service';
import { CreateProposalDto, UpdateProposalDto, ProposalQueryDto } from '../../dto';

@ApiTags('proposals')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all proposals for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of proposals retrieved successfully' })
  async findAll(@Request() req, @Query() query: ProposalQueryDto) {
    return this.proposalsService.findAll(req.user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific proposal by ID' })
  @ApiResponse({ status: 200, description: 'Proposal retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Proposal not found' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.proposalsService.findOne(id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new proposal' })
  @ApiResponse({ status: 201, description: 'Proposal created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createProposalDto: CreateProposalDto, @Request() req) {
    return this.proposalsService.create(createProposalDto, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing proposal' })
  @ApiResponse({ status: 200, description: 'Proposal updated successfully' })
  @ApiResponse({ status: 404, description: 'Proposal not found' })
  async update(
    @Param('id') id: string,
    @Body() updateProposalDto: UpdateProposalDto,
    @Request() req
  ) {
    return this.proposalsService.update(id, updateProposalDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a proposal' })
  @ApiResponse({ status: 200, description: 'Proposal deleted successfully' })
  @ApiResponse({ status: 404, description: 'Proposal not found' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.proposalsService.remove(id, req.user.id);
  }

  @Post(':id/collaborate')
  @ApiOperation({ summary: 'Add collaborator to proposal' })
  @ApiResponse({ status: 200, description: 'Collaborator added successfully' })
  async addCollaborator(
    @Param('id') id: string,
    @Body('email') email: string,
    @Request() req
  ) {
    return this.proposalsService.addCollaborator(id, email, req.user.id);
  }

  @Post(':id/ai-assist')
  @ApiOperation({ summary: 'Get AI assistance for proposal content' })
  @ApiResponse({ status: 200, description: 'AI suggestions generated successfully' })
  async getAIAssistance(
    @Param('id') id: string,
    @Body('section') section: string,
    @Body('context') context: string,
    @Request() req
  ) {
    return this.proposalsService.getAIAssistance(id, section, context, req.user.id);
  }

  @Post(':id/export')
  @ApiOperation({ summary: 'Export proposal to PDF or DOCX' })
  @ApiResponse({ status: 200, description: 'Export generated successfully' })
  async exportProposal(
    @Param('id') id: string,
    @Body('format') format: 'pdf' | 'docx',
    @Request() req
  ) {
    return this.proposalsService.exportProposal(id, format, req.user.id);
  }

  @Get(':id/versions')
  @ApiOperation({ summary: 'Get version history for proposal' })
  @ApiResponse({ status: 200, description: 'Version history retrieved successfully' })
  async getVersions(@Param('id') id: string, @Request() req) {
    return this.proposalsService.getVersionHistory(id, req.user.id);
  }
}
