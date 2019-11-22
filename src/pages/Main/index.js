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
    name: 'Neon Pagamentos',
    icon:
      'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/rocketseat_logo.png',
    rating: '5',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Nu Bank',
    icon:
      'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/rocketseat_logo.png',
    rating: '3',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Banco Brasil',
    icon:
      'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/rocketseat_logo.png',
    rating: '2',
  },
];

function Item({item}) {
  return (
    <View>
      <View style={styles.item}>
        <Image
          source={{
            uri: item.icon,
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.rating}</Text>
          <Icon name="star" size={10} color="#FFFFFF" />
        </View>
        <AirbnbRating showRating={false} selectedColor="white" size={20} />
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
    height: Dimensions.get('window').height * 0.075,
    width: Dimensions.get('window').height * 0.075,
    marginHorizontal: Dimensions.get('window').height * 0.025,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  textCenter: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  item: {
    marginVertical: Dimensions.get('window').height * 0.005,
    flexDirection: 'row',
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
