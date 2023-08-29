import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
  private userRepository: Repository<User>,
    @InjectRepository(role)
    private roleRepository: Repository<role>
  ) { }


  async create(createUser: CreateUserDto): Promise<User> {
    //ວາງຕົວປ່ຽນເກັບເອົາ RoleName ເພື່ອຈະນຳເອົາ User ໄປກຳນົດໃຫ້ຜູ້ສະໝັກບັນຊີໃໝ່
    const rolename = "User";
    const user = await this.roleRepository.findOne({ where: { roleName: rolename } })

    const saltRounds = 10;
    const hashP = bcrypt.hashSync(createUser.Password, saltRounds);

    const users = new User();
    users.UserName = createUser.UserName;
    users.Gmail = createUser.Gmail;
    users.Tel = createUser.Tel;
    users.Password = hashP;
    users.has = [user];

    const UsernameAlready = await this.userRepository.exist({ where: { UserName: users.UserName } })
    if (UsernameAlready) {
      throw new UnauthorizedException({
        message: ['This user is already exist..']
      });
    }
    return this.userRepository.save(users)


  }

  //get role give user
  // async getRole(): Promise<role[]> {

  //  const rol = await this.roleRepository.find()
  //  const user = "User"
  // //  const use = await this.userRepository.find({relations: {has: true}})
  // //  console.log(use)
  // //  const result = await this.userRepository.find({where: use: has})

  //  return
  //   // const userhrole = new User();
  //   // userhrole.UserId = UserId;
  //   // userhrole.has = [roleId] 
  // }

  async findByUsernameWithRoles(UserName: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.has', 'role')
      .where('user.UserName = :UserName', { UserName })
      .getOne();
  }

  //filter user for login
  async findOneUser(username: string): Promise<User | undefined> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.has', 'role')
      .where('user.UserName = :username', { username })
      .getOne();
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: { has: true } });
  }

  findOne(UserId: number): Promise<User> {
    return this.userRepository.findOne({ where: { UserId } });
  }

  update(UserId: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(UserId, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
