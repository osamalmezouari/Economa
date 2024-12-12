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
      const user_unHashed_passowrd = user.password;
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
    const costumer = this.prisma.role.findUnique({
      where: { name: 'costumer' },
    });
    try {
      const data = await this.prisma.user.create({
        data: {
          id: uuid(),
          roleId: (await costumer).id,
          ...signUpDto,
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
    try {
      const issuer = this.jwtConfigurations.issuer || 'default_issuer';
      const audience = this.jwtConfigurations.audience || 'default_audience';
      return this.jwtService.signAsync(
        {
          sub: user.id,
          roleId: user.roleId,
        } as ActiveUser,
        {
          secret: process.env.JWT_SECRET,
          issuer,
          audience,
          expiresIn: process.env.JWT_ACCESS_TOKEN_TTL || 3600,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
}
