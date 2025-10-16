import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateProposalDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  templateId?: string;

  @IsOptional()
  content?: any;

  @IsOptional()
  @IsArray()
  tags?: string[];
}

export class UpdateProposalDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  content?: any;

  @IsOptional()
  @IsString()
  status?: string;
}

export class ProposalQueryDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsString()
  status?: string;
}

export class CreateNewsletterDto {
  @IsString()
  title: string;

  @IsOptional()
  content?: any;

  @IsOptional()
  @IsArray()
  sources?: string[];
}

export class UpdateNewsletterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  content?: any;
}

export class NewsletterQueryDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}

export class CreatePromptDto {
  @IsString()
  name: string;

  @IsString()
  template: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];
}

export class UpdatePromptDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  template?: string;
}

export class PromptQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

export class CreateScrapingJobDto {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  schedule?: string;

  @IsOptional()
  config?: any;
}

export class UpdateScrapingJobDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  schedule?: string;
}

export class ScrapingJobQueryDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  page?: string;
}
