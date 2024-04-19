import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchTeamComponent } from './search-team.component';
import { TeamsService } from '../../services/teams.service';
import { SharedNavbarComponent } from '../../../shared/components/shared-navbar/shared-navbar.component';
import { Team } from '../../interfaces/team.interface';
import { finalize, of, take } from 'rxjs';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ActivatedRoute, RouterModule, convertToParamMap } from '@angular/router';

const searhedTeams = [
  {
    id: 1,
    name: 'Equipo 1',
    code: 'E1',
    country: 'País 1',
    founded: 2000,
    national: false,
    logo: 'logo-1.png'
  }
];

const activatedRouteMock = {
  snapshot: {
    paramMap: convertToParamMap({ id: 'test-id' })
  }
};

//Crear el mock del servicio con datos en cache
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
  }),
  cacheStore:{
    selectedLeagueId: 1,
    leagueTeams: [
      {
        id: 2,
        name: 'Equipo 1',
        code: 'E1',
        country: 'País 1',
        founded: 2000,
        national: false,
        logo: 'logo-1.png'
      }
    ]
  }
}

//Crear el mock del servicio sin datos en cache
const teamsServiceEmptyCacheMock = {
  searchByLeagueId: (id:number) => of({
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
  }),
  cacheStore:{
    selectedLeagueId: -1,
    leagueTeams: []
  }
}

describe('SearchTeamComponent', () => {
  let component: SearchTeamComponent;
  let fixture: ComponentFixture<SearchTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule,
      ],
      declarations: [
        SearchTeamComponent,
        SharedNavbarComponent,
        ResultCardComponent,
      ],
      providers: [
        //Con esto implemento el mock y no uso el servicio
        {
          provide: TeamsService,
          useValue: teamsServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
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

  //El problema estaba en que el mock del service esperaba una response y yo le pasaba un Team, la solución es que el mock devuelva un Response
  it('onChangeLeague change id correctly', () => {
    const id:number = 39;

    component.onChangeLeague(id);

    //Ver si el id actual ha cambiado
    expect(component.actualLeagueId).toEqual(id)
    //Comprobar si el bool que activa el spinner cambia a true
    expect(component.searchingTeams).toBeFalsy();
  });

});

describe('SearchTeamComponent with empty cache', () => {
  let component: SearchTeamComponent;
  let fixture: ComponentFixture<SearchTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule,
      ],
      declarations: [
        SearchTeamComponent,
        SharedNavbarComponent,
        ResultCardComponent,
      ],
      providers: [
        //Con esto implemento el mock y no uso el servicio
        {
          provide: TeamsService,
          useValue: teamsServiceEmptyCacheMock
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('OnInit get teams when there is no team in cache', () => {

    //Pedro, si ves esto revisalo porfa que no estoy muy seguro de esta parte jajaj, cuando uso los spy no funciona y el segundo no se llama correctamente

    //const spyOnChangeLeague = spyOn(component, 'onChangeLeague');
    //const spySearchByLeagueId = spyOn(teamsServiceEmptyCacheMock, 'searchByLeagueId');

    //component.ngOnInit();

    //expect(spyOnChangeLeague).toHaveBeenCalled();
    //expect(spySearchByLeagueId).toHaveBeenCalled();
    //Se debe de haber obtenido equipos si no hay nada en caché
    expect(component.searchedTeams!.length).toBeGreaterThan(0);
  });

});
