import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  IsObject,
} from 'class-validator';

export class CreateHeroDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  alias: string;

  @IsNotEmpty()
  @IsObject()
  biography: object;

  @IsNotEmpty()
  @IsObject()
  appearance: object;

  @IsNotEmpty()
  @IsObject()
  stats: object;

  @IsNotEmpty()
  @IsObject()
  connections: object;

  @IsArray()
  @IsString({ each: true })
  powers: string[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  firstAppearance: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  universe: string;
}
