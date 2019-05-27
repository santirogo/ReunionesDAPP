import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadreunionComponent } from './readreunion.component';

describe('ReadreunionComponent', () => {
  let component: ReadreunionComponent;
  let fixture: ComponentFixture<ReadreunionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadreunionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadreunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
