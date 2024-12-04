import { Injectable } from '@angular/core';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class SynchroneService {

  private state: State = {
    datas: ["lorem", "ipsum"],
    isCool: false,
  }

  getState(): State {
    return this.state;
  }

  getSortedDatas(): string[] {
    return this.getState().datas.sort();
  }

  updateDatas(datas: string[]): void {
    this.state = {
      ...this.state,
      datas
    };
  }
}
