import * as jws from 'jws';
import { JwtToken } from './jwt-issuer';

/** A client for consuming json web tokens. */
export abstract class JwtClient {
  /** Parses the contents of a token. */
  public static parse<T extends JwtToken>(token: string): T {
    return JSON.parse(jws.decode(token).payload);
  }
}
