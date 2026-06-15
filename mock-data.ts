import { Team, Player, Match } from './types';

export const mockTeams: Team[] = [
  {
    id: 't1',
    name: 'Alpha Strikers',
    logo: 'https://picsum.photos/seed/alpha/400/400',
    stats: 'Aggressive playstyle, average 15 kills per match. Dominant in close combat.',
    rank: 1,
    points: 1250
  },
  {
    id: 't2',
    name: 'Neon Phantoms',
    logo: 'https://picsum.photos/seed/bravo/400/400',
    stats: 'Tactical geniuses, known for mid-game rotations and zone prediction.',
    rank: 2,
    points: 1180
  },
  {
    id: 't3',
    name: 'Cobalt Kings',
    logo: 'https://picsum.photos/seed/cobalt/400/400',
    stats: 'Defensive powerhouse. Incredible at holding compounds.',
    rank: 3,
    points: 1045
  }
];

export const mockPlayers: Player[] = [
  {
    id: 'p1',
    name: 'CypherV',
    avatar: 'https://picsum.photos/seed/p1/200/200',
    teamId: 't1',
    preferredLoadout: 'AWM + MP40',
    wins: 42,
    kdRatio: '3.8',
    history: ['Pro League Season 5 Winner', 'MVP Invitational 2023']
  },
  {
    id: 'p2',
    name: 'GhostX',
    avatar: 'https://picsum.photos/seed/p2/200/200',
    teamId: 't2',
    preferredLoadout: 'M1014 + Groza',
    wins: 38,
    kdRatio: '4.1',
    history: ['Phantom Cup Finalist', 'Kill Leader Week 4']
  }
];

export const mockMatches: Match[] = [
  {
    id: 'm1',
    teamA: mockTeams[0],
    teamB: mockTeams[1],
    tournamentName: 'FireDash Grand Slam',
    date: new Date(Date.now() + 86400000 * 2).toISOString(),
    status: 'upcoming'
  },
  {
    id: 'm2',
    teamA: mockTeams[1],
    teamB: mockTeams[2],
    tournamentName: 'Neon Series Invitational',
    date: new Date(Date.now() + 86400000 * 5).toISOString(),
    status: 'upcoming'
  }
];