import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedNavbarComponent } from './shared-navbar.component';

describe('SharedNavbarComponent', () => {
  let component: SharedNavbarComponent;
  let fixture: ComponentFixture<SharedNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //El componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
