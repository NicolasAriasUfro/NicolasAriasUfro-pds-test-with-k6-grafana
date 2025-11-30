import http from 'k6/http';
import { check, group, sleep } from 'k6';
export const options = {
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
    http_req_duration: [{threshold: 'p(99)<1000', abortOnFail:true}],
  },
  scenarios: {
    breaking: {
      executor: 'ramping-vus',
      stages: [

        { duration: '10s', target: 1 },
        { duration: '5m', target: 100 },
        //....
      ],
    },
    average_load: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 20 },
        // maintain load
        { duration: '20', target: 20 },
        // ramp down to zero
        { duration: '5s', target: 0 },
      ],
    },
  },
};
export default () => {
  const BASE_URL = 'http://localhost:3000/games';

  // Variable para compartir el ID entre los grupos
  let newId;

  // Headers base
  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  // --- PASO 1: CREATE ---
  group('01. Create Game', () => {
    const payload = JSON.stringify({
      name: 'The Legend of K6',
      genre: 'Adventure',
      platform: 'PC',
      releaseDate: '2024-01-01',
      price: 100,
    });

    // En POST, la URL suele ser estática, pero es buena práctica ponerle nombre
    const res = http.post(BASE_URL, payload, {
      ...params,
      tags: { name: 'CreateGame' } // Etiqueta para agrupar métricas
    });

    check(res, { 'Creado exitosamente (201)': (r) => r.status === 201 });

    // Extraemos ID. Si falla, newId será undefined
    newId = res.json('id');
  });

  // Si falló el paso anterior, abortamos para no generar ruido
  if (!newId) {
    // console.error opcional, bajo carga alta puede saturar la consola
    return;
  }

  sleep(1);

  // --- PASO 2: READ ---
  group('02. Read Game', () => {
    // IMPORTANTE: Agregamos `tags: { name: ... }`.
    // Esto hace que k6 reporte "/games/{id}" en lugar de miles de URLs distintas "/games/1", "/games/2"...
    const res = http.get(`${BASE_URL}/${newId}`, {
      ...params,
      tags: { name: 'GetGameById' }
    });

    check(res, {
      'Lectura exitosa (200)': (r) => r.status === 200,
      'El ID coincide': (r) => r.json('id') === newId
    });
  });

  sleep(1);

  // --- PASO 3: UPDATE ---
  group('03. Update Game', () => {
    const updatePayload = JSON.stringify({ price: 150 });

    const res = http.put(`${BASE_URL}/${newId}`, updatePayload, {
      ...params,
      tags: { name: 'UpdateGame' }
    });

    check(res, { 'Actualizado exitosamente (200)': (r) => r.status === 200 });
  });

  sleep(1);

  // --- PASO 4: DELETE ---
  group('04. Delete Game', () => {
    const res = http.del(`${BASE_URL}/${newId}`, null, {
      ...params,
      tags: { name: 'DeleteGame' }
    });

    check(res, { 'Borrado exitosamente': (r) => [200, 204].includes(r.status) });
  });
};