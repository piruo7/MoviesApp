import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Formatter } from '../../../config/helpers/formatter';
import { FullMovie } from '../../../core/entities/movie.entity';
import { Cast } from '../../../core/entities/cast.entity';
import { CastActor } from '../cast/CastActor';

interface Props {
  movie: FullMovie;
  cast: Cast[];
}

export const MovieDetails = ( { movie, cast }: Props ) => {
  return (
    <>
      <View style={ styles.container }>
        <View style={ styles.subContainer }>
          <Text>{ movie.rating.toFixed( 2 ) }</Text>
          <Text style={ { marginLeft: 5 } }> - { movie.genres.join( ', ' ) }</Text>
        </View>
        <Text style={ styles.title }>
          Historia
        </Text>
        <Text style={ { fontSize: 16 } }>{ movie.description }</Text>
        <Text style={ styles.title }>Presupuesto</Text>
        <Text style={ { fontSize: 18 } }>{ Formatter.currency( movie.budget ) }</Text>
      </View>

      <View style={ { marginTop: 10, marginBottom: 50 } }>
        <Text style={ {
          fontSize: 23,
          marginVertical: 10,
          fontWeight: 'bold',
          marginHorizontal: 20,
        } }>
          Actores
        </Text>
        <FlatList
          data={ cast }
          keyExtractor={ ( item ) => item.id.toString() }
          horizontal
          showsHorizontalScrollIndicator={ false }
          renderItem={ ( { item } ) => <CastActor actor={ item } /> }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create( {
  container: {
    marginHorizontal: 20,
  },
  subContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 23,
    marginTop: 10,
    fontWeight: 'bold',
  },
} );