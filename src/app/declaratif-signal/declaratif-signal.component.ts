import { Component, computed, inject } from '@angular/core';
import { SignalService } from '../services/signal.service';

@Component({
  selector: 'app-declaratif-signal',
  standalone: true,
  imports: [],
  templateUrl: './declaratif-signal.component.html',
  styleUrl: './declaratif-signal.component.sass'
})
export class DeclaratifSignalComponent {

  private signalService = inject(SignalService);

  state = computed(() => this.signalService.state());
  datas = computed(() => this.signalService.sortedDatas());
  filteredDataByLength = computed(() => {
    const data = this.datas();
    return data.map(x => {
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
  });
  filteredByLengthAndFirstLetter = computed(() => {
    return this.filteredDataByLength().map(x => {
      const lowered = x.toLowerCase();
      if (lowered.charAt(0) === 'a') {
        return x;
      }

      return lowered;
    });
  });









  add(toAdd: string) {
    this.signalService.updateDatas$.next([...this.datas(), toAdd]);
  }

  empty() {
    this.signalService.updateDatas$.next([]);
  }

  replaceData(newElements: string[]) {
    this.signalService.updateDatas$.next(newElements);
  }
}
