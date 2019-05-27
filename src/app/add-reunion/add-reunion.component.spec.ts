import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReunionComponent } from './add-reunion.component';

describe('AddReunionComponent', () => {
  let component: AddReunionComponent;
  let fixture: ComponentFixture<AddReunionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReunionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
