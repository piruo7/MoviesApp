import { useEffect, useState } from 'react';
import type { Movie } from '../../core/entities/movie.entity';

import * as UseCases from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;

export const useMovies = () => {
  const [ isLoading, setisLoading ] = useState( true );
  const [ nowPlaying, setNowPlaying ] = useState<Movie[]>( [] );
  const [ popular, setPopular ] = useState<Movie[]>( [] );
  const [ topRated, setTopRated ] = useState<Movie[]>( [] );
  const [ upcoming, setUpcoming ] = useState<Movie[]>( [] );

  useEffect( () => {
    initialLoad();
  }, [] );

  const initialLoad = async () => {
    const nowPlayingPromises = UseCases.moviesPlayingUseCase( movieDBFetcher );
    const popularPromises = UseCases.moviesPopularUseCase( movieDBFetcher );
    const topRatedPromises = UseCases.moviesTopRatedUseCase( movieDBFetcher );
    const upcomingPromises = UseCases.moviesUpcomingUseCase( movieDBFetcher );

    const [
      nowPlayingMovies,
      popularMovies,
      topRatedMovies,
      upcomingMovies
    ] = await Promise.all( [
      nowPlayingPromises,
      popularPromises,
      topRatedPromises,
      upcomingPromises,
    ] );

    setNowPlaying( nowPlayingMovies );
    setPopular( popularMovies );
    setTopRated( topRatedMovies );
    setUpcoming( upcomingMovies );

    setisLoading( false );
  };


  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
    popularNexPage: async () => {
      popularPageNumber++;
      const popularMovies = await UseCases.moviesPopularUseCase( movieDBFetcher, { page: popularPageNumber } );
      setPopular( prev => [ ...prev, ...popularMovies ] );
    }

  };
};