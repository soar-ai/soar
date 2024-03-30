import type {
  ExecutionContext,
} from '@nestjs/common';
import {
  BadRequestException,
  createParamDecorator,
} from '@nestjs/common';
import type {
  Request,
} from 'express';

export interface ReqUserType {
  userId: {
    id: string;
  };
  username: string;
}

export const ReqUser = (required = true) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { user } = request;

    if (!user && required) {
      throw new BadRequestException('User was not found');
    }

    return user;
  })();
