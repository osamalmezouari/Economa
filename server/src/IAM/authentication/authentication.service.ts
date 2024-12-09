import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import ActiveUser from '../../common/interfaces/activeUser';
import { EMAIL_EXISST_Exception } from '../../common/exceptions/EMAIL_EXISST.exception';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly HashingSevice: HashingService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>,
  ) {}

  async SignIn(signInDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInDto.email },
    });
    if (user) {
      const user_unHashed_passowrd = await user.password;
      const provided_passowrd_compare = this.HashingSevice.compare(
        user_unHashed_passowrd,
        signInDto.password,
      );
      if (provided_passowrd_compare) {
        const accessToken = this.generateAccessToken(user);
        return accessToken;
      } else {
        throw new UnauthorizedException('Invalid password');
      }
    } else if (!user) {
      throw new NotFoundException({
        message: 'User does not exist',
      });
    }
  }

  async SignUp(signUpDto: SignUpDto) {
    const HashingPassword = await this.HashingSevice.hash(signUpDto.password);
    try {
      const data = await this.prisma.user.create({
              //@ts-ignore
        data: {
          id: uuid(),
          email: signUpDto.email,
          password: HashingPassword,
          
        },
      });
      return data;
    } catch (error) {
      if (error.code === 'P2002' && error.meta.target.includes('email')) {
        throw EMAIL_EXISST_Exception;
      }
      throw new ForbiddenException({
        statusCode: 403,
        message:
          'There was an issue with your sign-up request. Please try again later.',
        error: 'Forbidden',
      });
    }
  }

  generateAccessToken(user: any) {
    const issuer = process.env.JWT_TOKEN_ISSUER?.trim();
    const audience = process.env.JWT_TOKEN_AUDIENCE.includes(',')
      ? process.env.JWT_TOKEN_AUDIENCE?.split(',')
      : process.env.JWT_TOKEN_AUDIENCE;
    return this.jwtService.signAsync(
      {
        email: user.email,
        sub: user.id,
      } as ActiveUser,
      {
        secret: process.env.JWT_SECRET,
        issuer,
        audience,
        expiresIn: process.env.JWT_ACCESS_TOKEN_TTL || 3600,
      },
    );
  }
}
