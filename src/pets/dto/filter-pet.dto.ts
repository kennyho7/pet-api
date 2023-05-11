import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class FilterPetDto {
  @ApiProperty()
  breed?: string;
  @ApiProperty()
  location?: string;
  @ApiProperty()
  minAge?: number;
  @ApiProperty()
  maxAge?: number;
}
