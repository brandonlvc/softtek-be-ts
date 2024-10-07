import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';

const SWAPI_URL = 'https://swapi.py4e.com/api/people/';

export const getPeople = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const response = await axios.get(SWAPI_URL);
    const people = response.data.results;

    return {
      statusCode: 200,
      body: JSON.stringify(people),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener datos de SWAPI' }),
    };
  }
};
