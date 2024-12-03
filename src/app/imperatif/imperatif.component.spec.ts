import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImperatifComponent } from './imperatif.component';

describe('ImperatifComponent', () => {
  let component: ImperatifComponent;
  let fixture: ComponentFixture<ImperatifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImperatifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImperatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
