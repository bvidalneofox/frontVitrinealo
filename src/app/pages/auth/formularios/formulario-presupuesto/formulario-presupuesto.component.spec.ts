import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPresupuestoComponent } from './formulario-presupuesto.component';

describe('FormularioPresupuestoComponent', () => {
  let component: FormularioPresupuestoComponent;
  let fixture: ComponentFixture<FormularioPresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioPresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
