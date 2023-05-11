import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) {}

  async get(
    breed: string,
    location: string,
    minAge: number,
    maxAge: number,
  ): Promise<Pet[]> {
    // {
    //   where: [
    //     {
    //       breed: breed,
    //     },
    //     {
    //       age: Between(minAge, maxAge),
    //     },
    //     {
    //       location: location,
    //     },
    //   ],
    // }
    return await this.petsRepository
      .find({
        where: [
          // {
          //   breed: breed,
          // },
          // {
          //   age: Between(minAge, maxAge),
          // },
          // {
          //   location: location,
          // },
          {
            breed: null,
          },
          {
            age: null,
          },
          {
            location: null,
          },
        ],
      })
      .getQuery();
  }

  async create(createPetDto: CreatePetDto) {
    const pet: Pet = {
      id: null,
      name: createPetDto.name,
      age: createPetDto.age,
      breed: createPetDto.breed,
      location: createPetDto.location,
    };

    return await this.petsRepository.save(pet);
  }

  async update(updatePetDto: UpdatePetDto) {
    const pet: Pet = {
      id: updatePetDto.id,
      name: updatePetDto.name,
      age: updatePetDto.age,
      breed: updatePetDto.breed,
      location: updatePetDto.location,
    };

    return await this.petsRepository.save(pet);
  }

  async remove(id: number) {
    return await this.petsRepository.delete(+id);
  }
}
