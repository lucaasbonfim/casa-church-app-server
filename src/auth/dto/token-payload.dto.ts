export class TokenPayloadDto {
  id: string;
  email: string;
  role: string;
  adminModules?: string[];
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
