import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../../utils/constants';
import ActiveUser from '../../interfaces/activeUser';

export const activeUser = createParamDecorator(
  (field: keyof ActiveUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];
    return field ? user.field : user;
  },
);
