import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientslistComponent } from './patientslist.component';

describe('PatientslistComponent', () => {
  let component: PatientslistComponent;
  let fixture: ComponentFixture<PatientslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
