import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdministratorService } from 'src/user/services/administrator.service';

@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdministratorService) {}

  async findUserFromDiscordId(discordId: string): Promise<any> {
    const user = await this.adminService.findOneByDiscordId(discordId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
  // async findUserFromDiscordUsername(username: string): Promise<any> {
  //   console.log('username', username);
  //   const user = await this.adminService.findOne('username', username);

  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }

  //   return user;
  // }
}
