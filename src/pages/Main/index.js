import React from 'react';

import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  FlatList,
  StatusBar,
} from 'react-native';

import {AirbnbRating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getUniqueId} from 'react-native-device-info';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name:
      'Neon Pagamentos fsdfgiuysdgfisgiufsdguifsgiufsdgiufdsgiusdfguisfdgiu',
    icon:
      'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/rocketseat_logo.png',
    rating: '5',
    myRating: '5',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Nu Bank',
    icon:
      'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/rocketseat_logo.png',
    rating: '3',
    myRating: '2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Banco Brasil',
    icon:
      'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/rocketseat_logo.png',
    rating: '2',
    myRating: '1',
  },
];

function ratingCompleted(rating) {
  console.log('Rating is: ' + rating);
}

function Item({item}) {
  return (
    <View>
      <View style={styles.item}>
        <View style={styles.rowDataItem}>
          <Image
            source={{
              uri: item.icon,
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.spaceVertical} />
          <View>
            <Text style={styles.text} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.row}>
              <Text style={styles.text}>{item.rating}</Text>
              <View style={styles.spaceVertical} />
              <Icon name="star" size={10} color="#FFFFFF" />
            </View>
          </View>
        </View>
        <View style={styles.rowRating}>
          <AirbnbRating
            showRating={false}
            onFinishRating={ratingCompleted}
            selectedColor="white"
            defaultRating={item.myRating}
            size={20}
          />
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DA1F0',
  },
  logo: {
    height: Dimensions.get('window').width * 0.2,
    width: Dimensions.get('window').width * 0.2,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  spaceVertical: {
    marginRight: Dimensions.get('window').width * 0.008,
  },
  textCenter: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  item: {
    marginHorizontal: Dimensions.get('window').width * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowDataItem: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '40%',
  },
  rowRating: {
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: Dimensions.get('window').height * 0.025,
  },
});

const Main = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#fff" />
    <Text style={styles.textCenter}>{getUniqueId()}</Text>
    <FlatList
      data={DATA}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.id}
    />
  </SafeAreaView>
);

export default Main;
