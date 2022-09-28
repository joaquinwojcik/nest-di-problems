import { Controller, Post, Req, Res } from '@nestjs/common';
import { CreateAccountUseCase } from './use-cases/CreateAccountUseCase';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  @Post('/api/accounts')
  async createAccount(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const { name } = req.body;
    const response = await this.createAccountUseCase.execute(name);
    return res.status(201).json(response);
  }
}
