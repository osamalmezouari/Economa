import { AuthenticationType } from '../../enums/authentication';
import { SetMetadata } from '@nestjs/common';

export const AUTHENTICATION_KEY = 'AUTHENTICATION_KEY';

export const AUTHENTICATION_VALUE = (...params: AuthenticationType[]) =>
  SetMetadata(AUTHENTICATION_KEY, params);
