import { Injectable, Signal } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  // state
  private internalState$ = new BehaviorSubject<State>({ datas: [], isCool: true });

  // selectors
  state$: Observable<State> = this.internalState$.asObservable();
  state: Signal<State | undefined> = toSignal(this.internalState$);
  sortedDatas$ = this.internalState$.pipe(
    map(state => state.datas.sort()),
  );

  // actions
  updateDatas$ = new Subject<string[]>();

  constructor() {
    // reducer
    combineLatest([
      this.internalState$,
      this.updateDatas$
    ])
      .pipe(
        takeUntilDestroyed(),
        distinctUntilChanged()
      )
      .subscribe(([state, datas]) => this.internalState$.next({ ...state, datas }));
  }
}
