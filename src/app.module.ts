import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Pet } from './pets/entities/pet.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'satao.db.elephantsql.com',
    //   port: 5432,
    //   username: 'epksbcqx',
    //   password: 'GXFM9EXrJetmX_KEJSjxRnRvKacyLZyF',
    //   database: 'epksbcqx',
    //   entities: [User],
    //   synchronize: true,
    // }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'petDb',
      entities: [User, Pet],
      synchronize: true,
    }),
    UsersModule,
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
