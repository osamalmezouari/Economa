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
// import { Response } from 'express';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('SignIn')
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

  @Post('SignUp')
  SignUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.SignUp(signUpDto);
  }
}
