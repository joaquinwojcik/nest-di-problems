import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CreateAccountUseCase } from './use-cases/CreateAccountUseCase';
import { Request } from 'express';
import { ModuleRef, REQUEST } from '@nestjs/core';
import { FakeBBVACreateAccountUseCase } from './use-cases/FakeBBVA.CreateAccountUseCase';
import { FakeSantanderCreateAccountUseCase } from './use-cases/FakeSantanderCreateAccountUseCase';
import { SantanderConnector } from './connectors/SantanderConnector';
import { BBVAConnector } from './connectors/BBVAConnector';

const tenants = {
  '9b7c5221-481d-4c8b-9705-aa9577c04fda': {
    name: 'FakeBBVA',
  },
  'ab92f370-7a75-43da-96e4-0cb8aee4050c': {
    name: 'FakeSantander',
  },
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    SantanderConnector,
    BBVAConnector,
    FakeBBVACreateAccountUseCase,
    FakeSantanderCreateAccountUseCase,
    /*{
      provide: CreateAccountUseCase,
      useClass: FakeSantanderCreateAccountUseCase,
    },*/
    {
      provide: CreateAccountUseCase,
      useFactory: function (request: Request, moduleRef: ModuleRef) {
        const tenantGuid = request.header('x-tenant');
        const tenant = tenants[tenantGuid].name;
        const tenantUseCase = `${tenant}CreateAccountUseCase`;
        try {
          return moduleRef.resolve(tenantUseCase);
        } catch (e) {
          throw Error('Cant load tenant use case');
        }
      },
      inject: [REQUEST, ModuleRef],
    },
  ],
})
export class AppModule {}
