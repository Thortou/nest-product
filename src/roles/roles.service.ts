import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(role)
    private roleRepository: Repository<role>
  ){}

   create(createRoleDto: CreateRoleDto): Promise<role> {
    const roles = new role()
    roles.roleName = createRoleDto.roleName;
    return this.roleRepository.save(roles)
  }

  findAll(): Promise<role[]> {
    return this.roleRepository.find();
  }

  findOne(roleId: number): Promise<role> {
    return this.roleRepository.findOne({where: {roleId}});
  }

  async update(roleId: number, updateRole: UpdateRoleDto) {
    // const updateRole = new role()
    // updateRole.roleId = roleId;
    // updateRole.roleName = roleName;
    return this.roleRepository.update(roleId, updateRole);
  }

  remove(roleId: number) {
    return this.roleRepository.delete(roleId);
  }
}
