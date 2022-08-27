import { Request } from 'express';

export interface AuthzRequest extends Request {
  user: {
    sub: string;
  }
}