import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImperatifSignalComponent } from './imperatif-signal.component';

describe('ImperatifSignalComponent', () => {
  let component: ImperatifSignalComponent;
  let fixture: ComponentFixture<ImperatifSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImperatifSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImperatifSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
