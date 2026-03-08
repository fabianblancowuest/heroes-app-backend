// export class Hero {
//   id: string;
//   name: string;
//   slug: string;
//   alias: string;
//   powers: string[];
//   description: string;
//   strength: number;
//   intelligence: number;
//   speed: number;
//   durability: number;
//   team: string;
//   image: string;
//   firstAppearance: string;
//   status: string;
//   category: string;
//   universe: string;
// }

// export class Hero {
//   id: string;
//   name: string;
//   slug: string;
//   alias: string;
//   biography: {
//     fullName: string;
//     placeOfBirth: string;
//     publisher: string;
//     alignment: 'good' | 'bad' | 'neutral';
//   };
//   appearance: {
//     gender: string;
//     race: string;
//     height: string; // ej: "191 cm"
//     weight: string; // ej: "101 kg"
//   };
//   stats: {
//     intelligence: number;
//     strength: number;
//     speed: number;
//     durability: number;
//     power: number;
//     combat: number;
//   };
//   connections: {
//     groupAffiliation: string[];
//     relatives: string[];
//   };
//   powers: string[];
//   description: string;
//   image: string;
//   firstAppearance: string;
//   status: 'Active' | 'Deceased' | 'Unknown';
//   universe: 'DC' | 'Marvel';
//   category: 'Hero' | 'Villain' | 'Antihero' | 'Civilian';
// }

export interface Biography {
  fullName: string;
  placeOfBirth: string;
  publisher: string;
  alignment: 'good' | 'bad' | 'neutral';
  occupation: string;
  creators: string[];
  originStory: string;
  baseOfOperations: string;
}

export interface Appearance {
  gender: 'Male' | 'Female' | 'None' | 'Other';
  race: string;
  height: string;
  weight: string;
}

export interface Stats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

export interface Connections {
  groupAffiliation: string[];
  relatives?: string[];
}

export interface Hero {
  id: string;
  name: string;
  slug: string;
  alias: string;
  biography: Biography;
  appearance: Appearance;
  stats: Stats;
  connections: Connections;
  powers: string[];
  weapons: string[];
  weaknesses: string[];
  description: string;
  image: string;
  image2: string;
  firstAppearance: string;
  firstAppearanceComic: string;
  status: 'Active' | 'Deceased';
  category: 'Hero' | 'Villain' | 'Antihero' | 'Civilian';
  universe: 'Marvel' | 'DC';
}
