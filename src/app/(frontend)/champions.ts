export type ChampionRow = { year: number; driver: string; car: string }

/** Formula 1 drivers' world champions in a Ferrari, grouped by era. */
export const champions: { era: string; rows: ChampionRow[] }[] = [
  {
    era: '1950s',
    rows: [
      { year: 1952, driver: 'Alberto Ascari', car: '500 F2' },
      { year: 1953, driver: 'Alberto Ascari', car: '500 F2' },
      { year: 1956, driver: 'Juan Manuel Fangio', car: 'D50' },
      { year: 1958, driver: 'Mike Hawthorn', car: '246 F1' },
    ],
  },
  {
    era: '1960s–70s',
    rows: [
      { year: 1961, driver: 'Phil Hill', car: '156 F1' },
      { year: 1964, driver: 'John Surtees', car: '158' },
      { year: 1975, driver: 'Niki Lauda', car: '312T' },
      { year: 1977, driver: 'Niki Lauda', car: '312T2' },
      { year: 1979, driver: 'Jody Scheckter', car: '312T4' },
    ],
  },
  {
    era: '2000s',
    rows: [
      { year: 2000, driver: 'Michael Schumacher', car: 'F1-2000' },
      { year: 2001, driver: 'Michael Schumacher', car: 'F2001' },
      { year: 2002, driver: 'Michael Schumacher', car: 'F2002' },
      { year: 2003, driver: 'Michael Schumacher', car: 'F2003-GA' },
      { year: 2004, driver: 'Michael Schumacher', car: 'F2004' },
      { year: 2007, driver: 'Kimi Räikkönen', car: 'F2007' },
    ],
  },
]
