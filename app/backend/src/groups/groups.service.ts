import { Injectable } from '@nestjs/common';
import { GroupsRepository } from './groups.repository';
import { Group, Member } from '@prisma/client';
import { MemberInformationDto } from 'src/member/dto/member.dto';
import { CreateGroupsDto } from './dto/create-groups.dto';

@Injectable()
export class GroupsService {
  constructor(private groupsRepository: GroupsRepository) {}

  async getAllGroups(): Promise<(Group & { memberCount: number })[]> {
    return await this.groupsRepository.getAllGroups();
  }

  async getGroupByAccessCode(accessCode: string): Promise<Group & { memberCount: number }> {
    return await this.groupsRepository.getGroupByAccessCode(accessCode);
  }

  async getGroups(id: number): Promise<Group & { memberCount: number }> {
    return await this.groupsRepository.getGroups(id);
  }

  async getAllMembersOfGroup(id: number): Promise<MemberInformationDto[]> {
    return await this.groupsRepository.getAllMembersOfGroup(id);
  }

  async createGroups(createGroupsDto: CreateGroupsDto, member: Member): Promise<void> {
    return await this.groupsRepository.createGroups(createGroupsDto, member);
  }

  async joinGroup(id: number, member: Member): Promise<void> {
    await this.groupsRepository.joinGroup(id, member);
  }

  async leaveGroup(id: number, member: Member): Promise<void> {
    await this.groupsRepository.leaveGroup(id, member);
  }

  async getMyGroups(member: Member): Promise<(Group & { memberCount: number })[]> {
    return await this.groupsRepository.getMyGroups(member);
  }
}
