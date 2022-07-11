export enum AreaStatuses {
  Burrow,
  Cave,
  Excavation,
  Sinkhole,
}
export function getAreaStatusString(status: AreaStatuses): string {
  switch (status) {
    case AreaStatuses.Burrow:
      return "Burrow";
    case AreaStatuses.Cave:
      return "Cave";
    case AreaStatuses.Excavation:
      return "Excavation";
    case AreaStatuses.Sinkhole:
      return "Sinkhole";
  }
}

export function getAreaStatus(area: number): AreaStatuses {
  if (area <= 100) {
    return AreaStatuses.Burrow;
  } else if (area <= 300) {
    return AreaStatuses.Cave;
  } else if (area < 1000) {
    return AreaStatuses.Excavation;
  } else {
    return AreaStatuses.Sinkhole;
  }
}
