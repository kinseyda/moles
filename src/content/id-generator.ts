let cur = 0;
/**
 * The goal of IDs was to be able to refer to identifiables with human readable
 * names, while still having functional IDE checking. This works fine with enums
 *  (which IDEs can check easily, whereas strings in quotation marks are not)
 * mapping to numbers, then having the numbers be dictionary keys, but enums are
 *  not mutable. So we are left with me having to recreate the enum (what is
 * essentially a dictionary of name strings to some arbitrary, consistent
 * number) in a mutable way.
 */
export function getID(): number {
  return cur++;
}
