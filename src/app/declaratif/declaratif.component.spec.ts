import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaratifComponent } from './declaratif.component';

describe('DeclaratifSignalComponent', () => {
  let component: DeclaratifComponent;
  let fixture: ComponentFixture<DeclaratifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclaratifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclaratifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
