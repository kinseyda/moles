import SerializableClass, { SerializableClasses } from "./serializable-class";

/**
 * The result of prestiging the game
 * @extends SerializableClass {@link SerializableClass}
 */
export default class Civilization extends SerializableClass {
  resourceRates: { [resId: number]: number };
  name: string;
  population: number;

  constructor(
    resourceRates: { [resId: number]: number },
    name: string,
    population: number
  ) {
    super(SerializableClasses.Civilization);
    this.resourceRates = resourceRates;
    this.name = name;
    this.population = population;
  }
}
