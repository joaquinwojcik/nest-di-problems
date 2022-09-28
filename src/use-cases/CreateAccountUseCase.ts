import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export abstract class CreateAccountUseCase {
  abstract execute(personName: any): Promise<string>;
}
