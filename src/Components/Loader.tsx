import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {dip} from '../util/function';

const Loader = ({isLoading}) => {
  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}>
          <View
            style={{
              borderRadius: 10,
              padding: 20,
            }}>
            <ActivityIndicator
              color={'green'}
              animating={true}
              size={dip(80)}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default Loader;

const styles = StyleSheet.create({});
