import ky from 'ky';

export const http = ky.create({
  prefixUrl: 'https://frontend-assignment-api.vercel.app/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [(request) => {}],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          // 공통 에러 처리 로직??
          // if (response.status === 401) { ... }
        }
        return response.json();
      },
    ],
  },
});
