import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPageComponent } from './team-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TeamsService } from '../../services/teams.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

const teamsServiceMock = {
  searchById: () => of({
    results: 1,
    paging: { current: 1, total: 1 },
    response: [
      {
        team: {
          id: 1,
          name: 'Equipo 1',
          code: 'E1',
          country: 'País 1',
          founded: 2000,
          national: false,
          logo: 'logo-1.png'
        },
        venue: {
          id: 1,
          name: 'Estadio 1',
          address: 'Dirección 1',
          city: 'Ciudad 1',
          capacity: 10000,
          surface: 'Superficie 1',
          image: 'estadio-1.png'
        }
      }
    ]
  })
}

const teamsServiceTeamUndefinedMock = {
  searchById: () => of(undefined)
}

describe('TeamPageComponent', () => {
  let component: TeamPageComponent;
  let fixture: ComponentFixture<TeamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]) //No se puede usar RouterTestingModule porque está deprecated
      ],
      declarations: [
        TeamPageComponent
      ],
      providers: [
        //Con esto implemento el mock y no uso el servicio
        {
          provide: TeamsService,
          useValue: teamsServiceMock
        },
        /* {
          provide: TeamsService,
          useValue: teamsServiceTeamUndefinedMock
        }, */
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTeamFromUrlId works correctly when return a team', () => {

    component.getTeamFromUrlId();

    //Se ha obtenido el objeto correctamente
    expect(component.team).toBeTruthy();
    //Se han obtenido los datos del estadio
    expect(component.venue).toBeTruthy();
  });

  //TODO:
  // it('getTeamFromUrlId works correctly when team is not found', () => {

  //   TestBed.overrideProvider(TeamsService, { useValue: teamsServiceTeamUndefinedMock });

  //   component.getTeamFromUrlId();

  //   const spyTeam = spyOn(teamsServiceTeamUndefinedMock,'searchById').and.returnValue(of(undefined))

  //   expect(spyTeam).

  //   expect(component.team).toBeFalsy();

  // });
});
