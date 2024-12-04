import { Component, inject } from '@angular/core';
import { SynchroneService } from '../services/synchrone.service';
import { State } from '../services/state';

@Component({
  selector: 'app-imperatif',
  standalone: true,
  imports: [],
  templateUrl: './imperatif.component.html',
  styleUrl: './imperatif.component.sass'
})
export class ImperatifComponent {

  private synchroneService = inject(SynchroneService);

  state: State | undefined = undefined;
  datas: string[] = [];
  filteredDataByLength: string[] = [];
  filteredByLengthAndFirstLetter: string[] = [];

  constructor() {
    this.loadState();
    this.loadFilteredDatas();
  }

  loadState() {
    this.state = this.synchroneService.getState();

    this.datas = this.synchroneService.getSortedDatas();
  }

  loadFilteredDatas() {
    this.filteredDataByLength = this.datas.map(x => {
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
  }

  add(toAdd: string) {
    this.datas = [...this.datas, toAdd];
    this.loadFilteredDatas();
  }

  empty() {
    this.datas = [];
    this.loadFilteredDatas();
  }

  replaceData(newElements: string[]) {
    this.datas = newElements;
    this.loadFilteredDatas();
    this.filteredByLengthAndFirstLetter = ["toto"];
  }

  save() {
    this.filteredDataByLength = [];
    this.synchroneService.updateDatas(this.datas);
    this.loadState();
    this.loadFilteredDatas();
  }
}
