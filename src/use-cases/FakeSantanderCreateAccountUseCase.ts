import { CreateAccountUseCase } from './CreateAccountUseCase';
import { Injectable, Scope } from '@nestjs/common';
import { SantanderConnector } from '../connectors/SantanderConnector';

@Injectable({ scope: Scope.REQUEST })
export class FakeSantanderCreateAccountUseCase extends CreateAccountUseCase {
  constructor(private connector: SantanderConnector) {
    super();
  }

  async execute(personName: string): Promise<string> {
    return this.connector.createAccount(personName);
  }
}
