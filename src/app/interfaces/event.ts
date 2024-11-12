import { Organizer } from "./organizer";

export interface Event {
  id: number;
  title: string;
  organizer: Organizer;
  description: string;
  date: any,
  img: string
}
