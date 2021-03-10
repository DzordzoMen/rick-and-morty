import { Episode, Gender, Status } from ".";

export type Character = {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  image: string;
  episode: Episode[];
  created: string;
};
