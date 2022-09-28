import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class SantanderConnector {
  constructor(@Inject(REQUEST) private req: Request) {}

  createAccount(personName: string): Promise<string> {
    const traceId = this.req.header('x-amzn-trace-id');
    return new Promise((resolve, reject) => {
      if (!traceId) {
        return reject('No trace id');
      }

      // Fake HTTP call here sending trace id...

      return resolve(`Fake santander account created for ${personName}`);
    });
  }
}
