import axios from 'axios';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Función para traducir un personaje
export const translateCharacter = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { id } = event.queryStringParameters || {};

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'El ID es obligatorio' }),
    };
  }

  try {
    // Obtener el personaje de SWAPI
    const characterResponse = await axios.get(`https://swapi.dev/api/people/${id}/`);
    const character = characterResponse.data;

    // Consultar datos adicionales
    const filmsPromises = character.films.map((filmUrl: string) => axios.get(filmUrl));
    const speciesPromises = character.species.map((speciesUrl: string) => axios.get(speciesUrl));
    const vehiclesPromises = character.vehicles.map((vehicleUrl: string) => axios.get(vehicleUrl));
    const starshipsPromises = character.starships.map((starshipUrl: string) => axios.get(starshipUrl));

    // Esperar a que todas las consultas se completen
    const [films, species, vehicles, starships] = await Promise.all([
      Promise.all(filmsPromises),
      Promise.all(speciesPromises),
      Promise.all(vehiclesPromises),
      Promise.all(starshipsPromises),
    ]);

    // Formatear la respuesta con los datos traducidos
    const translatedCharacter = {
      nombre: character.name,
      altura: character.height,
      masa: character.mass,
      genero: character.gender,
      nacimiento: character.birth_year,
      peliculas: films.map((film) => film.data.title), // Extraer solo el título de la película
      especies: species.map((specie) => specie.data.name), // Extraer solo el nombre de la especie
      vehiculos: vehicles.map((vehicle) => vehicle.data.name), // Extraer solo el nombre del vehículo
      naves_estelares: starships.map((starship) => starship.data.name), // Extraer solo el nombre de la nave estelar
    };

    return {
      statusCode: 200,
      body: JSON.stringify(translatedCharacter),
    };
  } catch (error) {
    console.error('Error al traducir el personaje:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al traducir el personaje' }),
    };
  }
};
