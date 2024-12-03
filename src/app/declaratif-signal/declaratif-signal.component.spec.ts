import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaratifSignalComponent } from './declaratif-signal.component';

describe('DeclaratifSignalComponent', () => {
  let component: DeclaratifSignalComponent;
  let fixture: ComponentFixture<DeclaratifSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclaratifSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclaratifSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
