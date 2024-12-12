import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AccesTokenGuard } from '../common/guards/authentication/acces-token.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import jwtConfig from '../config/jwt.config';
import { AuthenticationGuard } from '../common/guards/authentication/authentication.guard';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PrismaModule,
  ],
  providers: [
    AuthenticationService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
/*     {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccesTokenGuard, */
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
