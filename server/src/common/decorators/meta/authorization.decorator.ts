import { SetMetadata } from '@nestjs/common';
import { Permissions_TYPE } from 'src/common/enums/permissions';

export const PERMESSIONS_KEY = 'PERMESSIONS_KEY';

export const SET_PERMESSIONS = (...params: Permissions_TYPE[]) =>
  SetMetadata(PERMESSIONS_KEY, params);
