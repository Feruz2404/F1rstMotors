import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { JwtPayload } from "../types";

export const GetCurrentClientId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const client = request.client as JwtPayload;

    if (!client) {
      throw new ForbiddenException("Token noto'g'ri");
    }

    return client.id;
  }
);