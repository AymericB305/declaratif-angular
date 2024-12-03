import { computed, Injectable, Signal, signal } from '@angular/core';
import { State } from './state';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  // state
  private internalSignalState = signal<State>({ data: [], isCool: true });

  // selectors
  signalState: Signal<State> = computed(() => this.internalSignalState());
  sortedData = computed(() => this.internalSignalState().data.sort());

  // actions
  updateData$ = new Subject<string[]>();

  constructor() {
    // reducer
    this.updateData$
      .pipe(takeUntilDestroyed())
      .subscribe(data => this.internalSignalState.set({
        ...this.internalSignalState(),
        data
      })); 
  }
}
