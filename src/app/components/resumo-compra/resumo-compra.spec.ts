import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoCompra } from './resumo-compra';

describe('ResumoCompra', () => {
  let component: ResumoCompra;
  let fixture: ComponentFixture<ResumoCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoCompra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoCompra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
