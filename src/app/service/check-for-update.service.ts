import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { interval, concat } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckForUpdateService {
  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    const appIsStable$ = appRef.isStable.pipe(
      first((isStable) => isStable === true)
    );
    const everySixHours$ = interval(6 * 60 * 60 * 1_000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
  }
}
