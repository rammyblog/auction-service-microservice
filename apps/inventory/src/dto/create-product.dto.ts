import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @Length(3, 200)
  @IsNotEmpty()
  @IsString()
  description: string;
}
