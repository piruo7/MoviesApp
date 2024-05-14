import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigations/Navigation';
import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../components/movie/MovieHeader';
import { MovieDetails } from '../../components/movie/MovieDetails';
import { ScrollView } from 'react-native-gesture-handler';
import { FullScreenLoader } from '../../components/loader/FullScreenLoader';

interface Props extends StackScreenProps<RootStackParams, 'Details'> { };

export const DetailsScreen = ( { route }: Props ) => {

  const { movieId } = route.params;
  const { isLoading, movie, cast = [] } = useMovie( movieId );

  if ( isLoading ) {
    return ( <FullScreenLoader /> );
  }


  return (
    <ScrollView showsVerticalScrollIndicator={ false }>
      <MovieHeader poster={ movie!.poster } title={ movie!.title } originalTitle={ movie!.originalTitle } />

      <MovieDetails movie={ movie! } cast={ cast } />
    </ScrollView>
  );
};
