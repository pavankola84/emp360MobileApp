import React, {FC} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {dip} from '../util/function';
import CardView from 'react-native-cardview';
import {theme} from '../util/theme';
import Fonts from '../util/Fonts';

interface LeaveDataCardProps {
  name: string;
  data: any;
  avaliable: number;
  consumed: number;
}

const wd: number = Dimensions.get('window').width;

const LeaveDataCard: FC<LeaveDataCardProps> = ({name, avaliable, consumed}) => {
  const color: string = '#f9b6b3';
  const backgroundColor: string =
    name == 'General Leaves'
      ? '#f2f5f9'
      : name == 'Previlage Leaves'
      ? '#41a616'
      : name == 'WFH'
      ? '#aadddd'
      : '#f2dfdc';
  const border: string =
    name == 'General Leaves'
      ? '#3184fb'
      : name == 'Previlage Leaves'
      ? 'green'
      : name == 'WFH'
      ? '#4ac9c5'
      : '#f9b6b3';
  return (
    <View
      style={{
        width: wd * 0.44,
        height: dip(100),
        marginVertical: 10,
        borderRadius: dip(10),
        borderWidth: 3,
        borderColor: '#cccccc',
      }}>
      <CardView
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={dip(10)}
        style={{
          flex: 1,
          backgroundColor: '#ffffff',

          padding: dip(10),
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: '#000000',
              fontFamily: Fonts.RobotoBold,
              fontSize: dip(16),
              fontWeight: 700,
            }}>
            {name}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: '#000000',
                fontFamily: Fonts.RobotoBold,
                fontSize: dip(14),
              }}>
              Available
            </Text>
            <Text
              style={{
                color: '#0d9903',
                fontFamily: Fonts.RobotoBold,
                fontSize: dip(14),
                // alignSelf: 'center',
              }}>
              {avaliable}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#000000',
                fontFamily: Fonts.RobotoBold,
                fontSize: dip(14),
              }}>
              Consumed
            </Text>
            <Text
              style={{
                color: '#ff0019',
                fontFamily: Fonts.RobotoBold,
                fontSize: dip(14),
                // alignSelf: 'center',
              }}>
              {consumed}
            </Text>
          </View>
        </View>
      </CardView>
    </View>
  );
};

export default LeaveDataCard;

const styles = StyleSheet.create({});
