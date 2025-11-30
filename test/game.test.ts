import http from 'k6/http';
import { sleep } from 'k6';
import { Options } from 'k6/options';

export const options: Options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  http.get('http://localhost:3000/games');

  const payload = JSON.stringify({
    name: 'Galaga',
    genre: 'action',
    platform: 'PC',
    releaseDate: '2025-01-01',
    price: '3000',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post('http://localhost:3000/games', payload, params);

  sleep(3);
}
