import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemaPagosComponent } from './sitema-pagos.component';

describe('SitemaPagosComponent', () => {
  let component: SitemaPagosComponent;
  let fixture: ComponentFixture<SitemaPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemaPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
