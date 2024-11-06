import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { JwtPayload, JwtPayloadWithRefreshToken } from "../types";

export const GetCurrentClient = createParamDecorator(
  (data: keyof JwtPayloadWithRefreshToken, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const client = request.client as JwtPayload;

    if (!client) {
      throw new ForbiddenException("Token noto'g'ri");
    }

    if (!data) {
      return client
    }

    return client[data];
  }
);