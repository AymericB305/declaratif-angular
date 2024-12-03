import { Component, inject } from '@angular/core';
import { ObservableService } from '../services/observable.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-imperatif',
  standalone: true,
  imports: [],
  templateUrl: './imperatif.component.html',
  styleUrl: './imperatif.component.sass'
})
export class ImperatifComponent {

  observableService = inject(ObservableService);

  data: string[] = [];

  constructor() {
    this.observableService.sortedData$.subscribe(data => this.data = data);

    // this.observableService.sortedData$.pipe(takeUntilDestroyed()).subscribe(data => this.data = data);
  }

  someMethod() {
    this.data = [...this.data, "toto"];
  }

  anotherMethod() {
    this.data = [];
  }

  whateverMethod() {
    this.data = ["titi"];
  }

  saveMethod() {
    this.observableService.updateData$.next(this.data);
  }
}
