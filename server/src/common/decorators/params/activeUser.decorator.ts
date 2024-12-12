import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import ActiveUser from '../../interfaces/activeUser';

export const activeUser = createParamDecorator(
  (field: keyof ActiveUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const decodedUser = jwt.decode(token) as ActiveUser;
    return field ? decodedUser[field] : decodedUser;
  },
);
