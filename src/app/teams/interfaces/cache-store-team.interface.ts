import { Team } from "./team.interface";

export interface CacheStoreTeams {
  selectedLeagueId: number,
  leagueTeams: Team[]
}
