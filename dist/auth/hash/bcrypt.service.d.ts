import { HashService } from "./hash.service";
export declare class BcryptService extends HashService {
    hash(password: string): Promise<string>;
    compare(password: string, passwordHash: string): Promise<boolean>;
}
