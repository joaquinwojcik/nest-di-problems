import { Injectable } from '@nestjs/common';

@Injectable()
export class BBVAConnector {
  createAccount(personName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(`Fake bbva account created for ${personName}`);
    });
  }
}
