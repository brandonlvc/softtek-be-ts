// src/handlers/characterHandler.ts
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import AWS from 'aws-sdk';
import { Character } from '../interfaces/Character';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const createCharacter: APIGatewayProxyHandler = async (event) => {
  const data: Character = JSON.parse(event.body!);

  const params = {
    TableName: 'characters',
    Item: data,
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al guardar el personaje en la base de datos' }),
    };
  }
};

export const getCharacters: APIGatewayProxyHandler = async () => {
  const params = {
    TableName: 'characters',
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener personajes' }),
    };
  }
};

export const searchCharacter = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { id, nombre } = event.queryStringParameters || {}; // Obtener parámetros de consulta
  
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: 'characters',
    };
  
    try {
      const data = await dynamoDb.scan(params).promise(); // Obtener todos los registros
  
      // Filtrar los resultados
      const filteredItems = data.Items?.filter((item) => {
        const matchesId = id ? item.id === id : true;
        const matchesNombre = nombre ? item.nombre.toLowerCase().includes(nombre.toLowerCase()) : true;
        return matchesId && matchesNombre;
      });
  
      return {
        statusCode: 200,
        body: JSON.stringify(filteredItems),
      };
    } catch (error) {
      console.error('Error al buscar personajes:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error al buscar personajes' }),
      };
    }
  };
