import { received } from "../entities/received.entity";

export class CreateReceivedDto {
    static getRepository(received: received) {
        throw new Error('Method not implemented.');
      }
    ReId: number;
    Reqty: number;
    ReDate: Date;
    ProdId: number;
    
}
