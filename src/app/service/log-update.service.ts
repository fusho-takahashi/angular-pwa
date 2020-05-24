import { Injectable } from '@angular/core';
import {
  SwUpdate,
  UpdateAvailableEvent,
  UpdateActivatedEvent,
} from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class LogUpdateService {
  constructor(updates: SwUpdate) {
    updates.available.subscribe((event: UpdateAvailableEvent) => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    updates.activated.subscribe((event: UpdateActivatedEvent) => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
}
