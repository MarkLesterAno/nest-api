export class QueueItemDto {
    queueId: string;
    title: string;
    description?: string;
    priority: number;
    status: string;
    assignedToId?: string;
    history?: any[];
  }