import { CreateAccountUseCase } from './CreateAccountUseCase';
import { Injectable, Scope } from '@nestjs/common';
import { BBVAConnector } from '../connectors/BBVAConnector';

@Injectable({ scope: Scope.REQUEST })
export class FakeBBVACreateAccountUseCase extends CreateAccountUseCase {
  constructor(private connector: BBVAConnector) {
    super();
  }
  async execute(personName: string): Promise<string> {
    return this.connector.createAccount(personName);
  }
}
