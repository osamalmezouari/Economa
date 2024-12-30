import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUrl()
  svgLink: string;
}
