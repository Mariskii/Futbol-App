import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchTeamComponent } from './search-team.component';
import { TeamsService } from '../../services/teams.service';
import { SharedNavbarComponent } from '../../../shared/components/shared-navbar/shared-navbar.component';
import { Team, TeamResponse } from '../../interfaces/team.interface';
import { of } from 'rxjs';

const searhedTeams:Team[] = [];

//Crear el mock del servicio
const teamsServiceMock = {
  searchByLeagueId: () => of({
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

describe('SearchTeamComponent', () => {
  let component: SearchTeamComponent;
  let fixture: ComponentFixture<SearchTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        SearchTeamComponent,
        SharedNavbarComponent
      ],
      providers: [
        //Con esto implemento el mock y no uso el servicio
        {
          provide: TeamsService,
          useValue: teamsServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //El componente se instancia
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO: ¿Tengo que hacer un Mock de los componentes?

  //El problema estaba en que el mock del service esperaba una response y yo le pasaba un Team, la solución es que el mock devuelva un Response
  it('onChangeLeague change id correctly', () => {
    const id:number = 38;

    //Al principio debe estar en true ya que se debe mostrar el spinner y eso se hace cuando searchingTeams = tue
    expect(component.searchingTeams).toBeTruthy();

    component.onChangeLeague(id);

    //Ver si el id actual ha cambiado
    expect(component.selectedLeagueId).toEqual(id)
    //Comprobar si el bool que activa el spinner cambia a true
    expect(component.searchingTeams).toBeFalsy();
  });

});
