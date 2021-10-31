import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from "@nestjs/graphql";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    // const { req } = ctx.getContext() ? ctx.getContext() : { req: context.getArgs().find(c => c instanceof IncomingMessage) };
    const { req } = ctx.getContext();
    return super.canActivate(new ExecutionContextHost([req]));
  }
}