import { Component, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ObservableService } from '../services/observable.service';
import { State } from '../services/state';

@Component({
  selector: 'app-reactif',
  standalone: true,
  imports: [],
  templateUrl: './reactif.component.html',
  styleUrl: './reactif.component.sass'
})
export class ReactifComponent {

  private observableService = inject(ObservableService);

  state: State | undefined = undefined;
  signalState: State | undefined = undefined;
  datas: string[] = [];
  filteredDataByLength: string[] = [];
  filteredByLengthAndFirstLetter: string[] = [];


































  constructor() {
    this.observableService.state$
      .pipe(takeUntilDestroyed())
      .subscribe(state => {
        this.state = state;
      });

    effect(() => {
      this.signalState = this.observableService.state();
    });
      
    this.observableService.sortedDatas$
      .pipe(takeUntilDestroyed())
      .subscribe(data => {
        this.datas = data;
        this.filteredDataByLength = data.map(x => {
          if (x.length > 10) {
            const sliced = x.slice(0, 10);
            return sliced + "...";
          }
    
          if (x.length < 5) {
            return x.toUpperCase();
          }
    
          if (x.length < 3) {
            return x;
          }
    
          return "";
        });
    
        this.filteredByLengthAndFirstLetter = this.filteredDataByLength.map(x => {
          const lowered = x.toLowerCase();
          if (lowered.charAt(0) === 'a') {
            return x;
          }
    
          return lowered;
        });
      });
  }

  add(toAdd: string) {
    this.observableService.updateDatas$.next([...this.datas, toAdd]);
  }

  empty() {
    this.observableService.updateDatas$.next([]);
    setTimeout(() => {
      this.filteredDataByLength = ["pourquoi pas ?"];
    }, 1000);
  }

  replaceData(newElements: string[]) {
    this.observableService.updateDatas$.next(newElements);
    this.filteredByLengthAndFirstLetter = ["toto"];
  }

  save() {
    this.filteredDataByLength = [];
    this.observableService.updateDatas$.next(this.datas);
  }
}
