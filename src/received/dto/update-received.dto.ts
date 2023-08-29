import { PartialType } from '@nestjs/mapped-types';
import { CreateReceivedDto } from './create-received.dto';

export class UpdateReceivedDto extends PartialType(CreateReceivedDto) {}
