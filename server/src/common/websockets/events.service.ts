import { Injectable } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Injectable()
export class EventsService {
  constructor(private eventsGateway: EventsGateway) {}

  sendMessageToAll(event: string, data?: any): void {
    this.eventsGateway.server.emit(event, data);
  }

  sendMessageToClient(clientId: string, event: string, data: any): void {
    this.eventsGateway.server.to(clientId).emit(event, data);
  }
}