import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import Spinner from 'react-native-loading-spinner-overlay';
import {AirbnbRating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from '~/store/ducks/ratingBanks';

class Main extends React.Component {
  renderItem = ({item}) => {
    const ratingCompleted = myRating => {
      let rate = {
        id: item.id,
        rate: myRating,
      };
    };

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
                {item ? item.code + ' - ' + item.name : ''}
              </Text>
              <View style={styles.row}>
                <Text style={styles.text}>{item.generalRating}</Text>
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
              size={16}
            />
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    );
  };

  componentDidMount() {
    this.props.banksRated();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textCenter}>{getUniqueId()}</Text>
        <FlatList
          data={this.props.banks}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        <Spinner visible={this.props.pending} />
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    pending: state.ratingBanks.pending,
    banks: state.ratingBanks.banks,
  }),
  dispatch => bindActionCreators(Actions, dispatch),
)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DA1F0',
  },
  logo: {
    height: Dimensions.get('window').width * 0.1,
    width: Dimensions.get('window').width * 0.1,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  spaceVertical: {
    marginRight: Dimensions.get('window').width * 0.04,
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
    padding: Dimensions.get('window').width * 0.04,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowDataItem: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
  },
  rowRating: {
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: Dimensions.get('window').height * 0.02,
  },
});
