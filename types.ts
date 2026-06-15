export interface Team {
  id: string;
  name: string;
  logo: string;
  stats: string;
  rank: number;
  points: number;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  teamId: string;
  preferredLoadout: string;
  wins: number;
  kdRatio: string;
  history: string[];
}

export interface Match {
  id: string;
  teamA: Team;
  teamB: Team;
  tournamentName: string;
  date: string;
  status: 'upcoming' | 'live' | 'completed';
  description?: string;
  rivalryPreview?: string;
}