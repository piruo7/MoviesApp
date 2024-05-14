import { AxiosAdapter } from './http/axios.adapter';


export const movieDBFetcher = new AxiosAdapter( {
  baseUrl: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'e4b3020025576d84f997ce9bc66a777f',
    language: 'es',
  }
} );
