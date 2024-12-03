import { Injectable, Signal } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  // state
  private internalState$ = new BehaviorSubject<State>({ data: [], isCool: true });

  // selectors
  state$: Observable<State> = this.internalState$.asObservable();
  state: Signal<State | undefined> = toSignal(this.internalState$);
  sortedData$ = this.internalState$.pipe(
    map(state => state.data.sort()),
  );

  // actions
  updateData$ = new Subject<string[]>();

  constructor() {
    // reducer
    combineLatest([
      this.internalState$,
      this.updateData$
    ])
      .pipe(
        takeUntilDestroyed(),
        distinctUntilChanged()
      )
      .subscribe(([state, data]) => this.internalState$.next({ ...state, data }));
  }
}
