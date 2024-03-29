import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from '../entities/administrator.entity';
import { Repository } from 'typeorm';
import {
  CreateAdministratorDto,
  UpdateAdministratorDto,
} from '../dtos/administrator.dto';

@Injectable()
export class AdministratorService {
  //   async findOne(field: string, username: string): Promise<User | undefined> {
  //     //   console.log(field, username);
  //     //   return this.users.find((user) => user[field] === username);
  //   }

  constructor(
    @InjectRepository(Administrator)
    private administratorRepo: Repository<Administrator>,
  ) {}

  async createAdministrator(data: CreateAdministratorDto) {
    console.log(data);
    try {
      const admin = await this.findOneByDiscordId(data.id);
      console.log(admin);
      if (admin == null) {
        console.log(
          `Datos administrador previo crear: ${data.username}, ${data.id}`,
        );
        const newAdmin = await this.administratorRepo.create(data);
        return await this.administratorRepo.save(newAdmin);
      } else {
        throw new NotFoundException(
          `Administrador con el discordId #${data.id} ya se encuentra registrado`,
        );
      }
      return admin;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Problemas creando el administrador: ${error}`,
      );
    }
  }

  async findAll() {
    try {
      return await this.administratorRepo.find({
        relations: ['giveaway'],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Problemas encontrando los administradores: ${error}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const admin = await this.administratorRepo.findOne({
        where: { id_administrator: id },
        relations: ['giveaway'],
      });
      if (!(admin instanceof Administrator)) {
        throw new NotFoundException(
          `Administrador con id #${id} no se encuentra en la Base de Datos`,
        );
      }
      return admin;
    } catch (error) {
      return error;
    }
  }

  // async findOneByMail(email: string) {
  //   try {
  //     const admin = await this.administratorRepo.findOne({
  //       where: { email: email },
  //       relations: ['giveaway'],
  //     });
  //     if (!(admin instanceof Administrator)) {
  //       throw new NotFoundException(
  //         `Administrador con el correo ${email} no se encuentra en la Base de Datos`,
  //       );
  //     }
  //     return admin;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async findOneByDiscordId(discordId: string) {
    try {
      console.log('discordId: ', discordId);
      const admin = await this.administratorRepo.findOne({
        where: { id: discordId },
      });
      console.log('administradorFind: ', admin);
      if (!(admin instanceof Administrator)) {
        console.log('administrator not registered in DB');
        // throw new NotFoundException(
        //   `Usuario con el discordIdo #${id} no se encuentra en la Base de Datos`,
        // );
        // return { code: 400, message: 'Administrador no registrado' };
        return null;
      }
      return admin;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, cambios: UpdateAdministratorDto) {
    try {
      const admin = await this.administratorRepo.findOne({
        where: { id_administrator: id },
      });

      this.administratorRepo.merge(admin, cambios);
      return this.administratorRepo.save(admin);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Problemas actualizando el usuario: ${error}`,
      );
    }
  }

  async remove(id: string) {
    const admin = await this.administratorRepo.findOne({
      where: { id_administrator: id },
    });

    return this.administratorRepo.delete(admin);
  }
}
