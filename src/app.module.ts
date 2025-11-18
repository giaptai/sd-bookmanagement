import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './books/book.module';

@Module({
  imports: [
    // load env file
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),

    // MongoDB connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cs: ConfigService) => ({
        uri: cs.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService]
    }),

    // Feature modules
    AuthModule,
    BookModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
