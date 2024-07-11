import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {theme} from '../../util/theme';
import AppliedCard from '../../Components/AppliedCard';

interface AppliedLeavesProps {
  navigation: {
    navigate: (route: string) => void;
  };
}

const AppliedLeaves: React.FC<AppliedLeavesProps> = ({navigation}) => {
  const onBackPress = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{flex: 1}}>
        <Header name={'Applied Leaves'} back={true} onBackPress={onBackPress} />
      </View>
      <View
        style={{
          flex: 11,
          paddingHorizontal: theme.paddingHorizontal / 2,
        }}>
        <FlatList
          data={[
            {status: 'approved'},
            {status: 'cancelled'},
            {status: 'pending'},
            {status: 'approved'},
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <AppliedCard
              onPress={() => console.log('first')}
              item={item}
              index={index}
            />
          )}
        />
      </View>
    </View>
  );
};

export default AppliedLeaves;

const styles = StyleSheet.create({});
