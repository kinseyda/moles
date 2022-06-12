export enum PopulationStatuses {
  SolitaryMole,
  Labour,
  Town,
  City,
}
export function getStatusString(status: PopulationStatuses): string {
  switch (status) {
    case PopulationStatuses.SolitaryMole:
      return "Solitary mole";
    case PopulationStatuses.Labour:
      return "Labour of moles";
    case PopulationStatuses.Town:
      return "Town";
    case PopulationStatuses.City:
      return "City";
  }
}

export function getStatus(pop: number): PopulationStatuses {
  if (pop < 2) {
    return PopulationStatuses.SolitaryMole;
  } else if (pop < 10) {
    return PopulationStatuses.Labour;
  } else if (pop < 100) {
    return PopulationStatuses.Town;
  } else {
    return PopulationStatuses.City;
  }
}
