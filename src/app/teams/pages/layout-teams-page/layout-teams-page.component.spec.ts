import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTeamsPageComponent } from './layout-teams-page.component';
import { RouterModule } from '@angular/router';

describe('LayoutTeamsPageComponent', () => {
  let component: LayoutTeamsPageComponent;
  let fixture: ComponentFixture<LayoutTeamsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutTeamsPageComponent],
      imports:[RouterModule /*Debería usar el testingrouter, pero esta deprecated*/]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutTeamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
