import { Component, effect, inject } from '@angular/core';
import { ObservableService } from '../services/observable.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { State } from '../services/state';

@Component({
  selector: 'app-imperatif',
  standalone: true,
  imports: [],
  templateUrl: './imperatif.component.html',
  styleUrl: './imperatif.component.sass'
})
export class ImperatifComponent {

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
    this.datas = [...this.datas, toAdd];
  }

  empty() {
    this.datas = [];
  }

  replaceData(newElements: string[]) {
    this.datas = newElements;
    this.filteredByLengthAndFirstLetter = ["toto"];
  }

  save() {
    this.filteredDataByLength = [];
    this.observableService.updateDatas$.next(this.datas);
  }
}
