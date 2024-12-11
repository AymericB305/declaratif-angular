import { computed, Injectable, Signal, signal } from '@angular/core';
import { State } from './state';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  // state
  private internalSignalState = signal<State>({ datas: [], isCool: true });

  // selectors
  state: Signal<State> = computed(() => this.internalSignalState());
  sortedDatas = computed(() => this.internalSignalState().datas.sort());

  // actions
  updateDatas$ = new Subject<string[]>();

  constructor() {
    // reducer
    this.updateDatas$
      .pipe(takeUntilDestroyed())
      .subscribe(datas => this.internalSignalState.set({
        ...this.internalSignalState(),
        datas
      }));
  }
}
