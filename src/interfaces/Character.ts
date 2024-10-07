export interface Character {
    id: string;
    nombre: string;
    altura: string;
    masa: string;
    hair_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    starships: string[];
    vehicles: string[];
    created: string;
    edited: string;
    url: string;
  }
  
  export interface TranslatedCharacter {
    id: string;
    nombre: string;
    altura: string;
    masa: string;
    color_pelo: string;
    color_ojos: string;
    nacimiento: string;
    genero: string;
    mundo_natal: string;
    films: string[];
    especies: string[];
    naves_estelares: string[];
    vehiculos: string[];
    creado: string;
    editado: string;
    url: string;
  }
  