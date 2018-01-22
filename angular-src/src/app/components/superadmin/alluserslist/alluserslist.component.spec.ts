import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlluserslistComponent } from './alluserslist.component';

describe('AlluserslistComponent', () => {
  let component: AlluserslistComponent;
  let fixture: ComponentFixture<AlluserslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlluserslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlluserslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
