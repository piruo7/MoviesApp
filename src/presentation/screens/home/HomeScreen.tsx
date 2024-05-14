import React from 'react';
import { View } from 'react-native';
import { useMovies } from '../../hooks/useMovies';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PosterCarousel } from '../../components/movies/PosterCarousel';
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel';
import { FullScreenLoader } from '../../components/loader/FullScreenLoader';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isLoading, nowPlaying, popular, topRated, upcoming, popularNexPage } = useMovies();

  if ( isLoading ) {
    return ( <FullScreenLoader /> );
  }

  return (
    <ScrollView>
      <View style={ { marginTop: top + 20, paddingBottom: 30 } }>

        {/* Principal */ }
        <PosterCarousel movies={ nowPlaying } />

        {/* Populares */ }
        <HorizontalCarousel movies={ popular } title="Populares" loadNextPage={ popularNexPage } />

        {/* Top Rated */ }
        <HorizontalCarousel movies={ topRated } title="Mejores Calificadas" />

        {/* Upcoming */ }
        <HorizontalCarousel movies={ upcoming } title="Proximamente" />

      </View>
    </ScrollView>
  );
};
