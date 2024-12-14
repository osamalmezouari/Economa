import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIdsPipe implements PipeTransform {
  transform(value: string): string[] {
    if (!value) {
      throw new BadRequestException('IDs parameter is required');
    }

    const idsArray = value.split(',').map((id) => id.trim());

    if (idsArray.length === 0) {
      throw new BadRequestException('Invalid ID format');
    }

    return idsArray;
  }
}
