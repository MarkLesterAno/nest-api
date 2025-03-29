import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { PriorityDto } from '../dto';

@Injectable()
export class PrioritiesService {
  constructor(private prisma: PrismaService) { }

  async createPriority(priorityDto: PriorityDto) {
    const newPriority = this.prisma.priorities.create({
      data: {
        name: priorityDto.name,
        description: priorityDto.description,
        level: priorityDto.level,
      },
    });
    return { newPriority };
  }

  async getPriorities() {
    return this.prisma.priorities.findMany();
  }

  async getPriorityById(id: string) {
    const priority = await this.prisma.priorities.findUnique({
      where: { id },
    });
    if (!priority) {
      throw new NotFoundException(`Priority with ID ${id} not found`);
    }
    return priority;
  }

  async updatePriority(id: string, priorityDto: PriorityDto) {
    return this.prisma.priorities.update({
      where: { id },
      data: {
        name: priorityDto.name,
        description: priorityDto.description,
        level: priorityDto.level,
      },
    });
  }
  async patchPriority(id: string, priorityDto: Partial<PriorityDto>) {
    return this.prisma.priorities.update({
      where: { id },
      data: {
        ...priorityDto,
      },
    });
  }

  async deletePriority(id: string) {
    return this.prisma.priorities.delete({
      where: { id },
    });
  }
}