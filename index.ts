import express, { Express, Request, Response } from 'express';
import { Ahorcado } from './ts/game';
import path from 'path';

const app: Express = express();
const port = 8000;

// Ruta para servir archivos estáticos
app.use(express.static('dist'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta para procesar las solicitudes de juego del Ahorcado
app.get('/juego', (req, res) => {
  const palabra = req.query.palabra as string; // Obtener la palabra del query parameter
  const juego = new Ahorcado(palabra, 6);
  // Lógica de juego...

  res.send('Resultado del juego'); // Envia el resultado del juego como respuesta
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});