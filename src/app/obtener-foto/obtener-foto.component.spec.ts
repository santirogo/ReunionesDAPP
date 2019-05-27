import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerFotoComponent } from './obtener-foto.component';

describe('ObtenerFotoComponent', () => {
  let component: ObtenerFotoComponent;
  let fixture: ComponentFixture<ObtenerFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtenerFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtenerFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
