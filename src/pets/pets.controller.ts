import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger/dist';
import { Pet } from './entities/pet.entity';
import { AuthGuard } from 'src/auth/auth-guard';
import { query } from 'express';
import { FilterPetDto } from './dto/filter-pet.dto';

@ApiBearerAuth()
@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  // @UseGuards(AuthGuard)
  @Get()
  @ApiQuery({ name: 'breed', required: false, type: String })
  @ApiQuery({ name: 'location', required: false, type: String })
  @ApiQuery({ name: 'minAge', required: false, type: Number })
  @ApiQuery({ name: 'maxAge', required: false, type: Number })
  get(@Query() params: FilterPetDto): Promise<Pet[]> {
    return this.petsService.get(
      params.breed,
      params.location,
      params.minAge,
      params.maxAge,
    );
  }

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    updatePetDto.id = +id;

    return this.petsService.update(updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}
