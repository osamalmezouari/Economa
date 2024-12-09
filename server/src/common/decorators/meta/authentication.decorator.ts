import { AuthenticationType } from '../../enums/authentication';
import { SetMetadata } from '@nestjs/common';

export const AUTHENTICATION_KEY = 'AUTHENTICATION_KEY';

export const AUTH = (...params: AuthenticationType[]) =>
  SetMetadata(AUTHENTICATION_KEY, params);
