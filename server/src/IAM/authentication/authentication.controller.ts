import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  // Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';
import { AuthenticationType } from 'src/common/enums/authentication';
// import { Response } from 'express';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @AUTH(AuthenticationType.None)
  @HttpCode(HttpStatus.OK)
  @Post('Login')
  async SignIn(@Body() signInDto: SignInDto) {
    return this.authenticationService.SignIn(signInDto);
  }
  // @HttpCode(HttpStatus.OK)
  // @Post('SignIn')
  // async SignIn(
  //   @Body() signInDto: SignInDto,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   const accessToken = await this.authenticationService.SignIn(signInDto);
  //   response.cookie('accessToken', accessToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: true,
  //   });
  // }


  @AUTH(AuthenticationType.None)
  @Post('Register')
  SignUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.SignUp(signUpDto);
  }
}
