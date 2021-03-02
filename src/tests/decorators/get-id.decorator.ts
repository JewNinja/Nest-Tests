import { createParamDecorator } from "@nestjs/common";

export const GetId = createParamDecorator(
  (req, data): string => {
    return req.title  // может и не работает. В доке немного по другому
  }
)