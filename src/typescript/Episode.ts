import { Character } from ".";

export type Episode = {
  id: number;
  name: string;
  air_date?: string;
  episode: string;
  characters: Character[];
  created?: string;
};
