import * as jws from 'jws';

/** A client for consuming json web tokens. */
export abstract class JwtClient {
  /** Parses the contents of a token. */
  public static parse<T extends JwtToken>(token: string): T {
    return JSON.parse(jws.decode(token).payload);
  }
}

/** Standard set of JWT properties. */
export interface JwtToken {
  /** The token issuer. */
  iss: string;

  /** The subject (e.g. user name or identifier). */
  sub: string;

  /** The audience (e.g. granted system / module / api names). */
  aud: string[];

  /** The roles (e.g. logical partitioning of duties). */
  rol: string[];

  /** The end of the expiry window. */
  exp: Date;

  /** The start of the expiry window. */
  nbf: Date;

  /** When the token was issued. */
  iat: Date;
}
