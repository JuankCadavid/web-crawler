import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

// Core modules
import { CoreModule } from './modules/core/core.module';
import { AuthModule } from './modules/auth/auth.module';

// Feature modules
import { ProposalsModule } from './modules/proposals/proposals.module';
import { NewslettersModule } from './modules/newsletters/newsletters.module';
import { PromptsModule } from './modules/prompts/prompts.module';
import { ScraperModule } from './modules/scraper/scraper.module';

// Services
import { AmazonQService } from './services/amazonq.service';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      cache: true,
    }),

    // Rate limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get('THROTTLE_TTL', 60) * 1000,
          limit: configService.get('THROTTLE_LIMIT', 100),
        },
      ],
      inject: [ConfigService],
    }),

    // Task scheduling
    ScheduleModule.forRoot(),

    // Core modules
    CoreModule,
    AuthModule,

    // Feature modules
    ProposalsModule,
    NewslettersModule,
    PromptsModule,
    ScraperModule,
  ],
  providers: [
    AmazonQService,
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    // Log startup configuration (non-sensitive values only)
    console.log('🔧 IGAD Hub API Configuration:');
    console.log(`   Environment: ${this.configService.get('NODE_ENV', 'development')}`);
    console.log(`   Port: ${this.configService.get('PORT', 3001)}`);
    console.log(`   Throttling: ${this.configService.get('THROTTLE_LIMIT', 100)} req/${this.configService.get('THROTTLE_TTL', 60)}s`);
  }
}
