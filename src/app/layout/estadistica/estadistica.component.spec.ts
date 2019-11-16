import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EstadisticaComponent } from './estadistica.component';
import { EstadisticaModule } from './estadistica.module';

describe('EstadisticaComponent', () => {
  let component: EstadisticaComponent;
  let fixture: ComponentFixture<EstadisticaComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          EstadisticaModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
