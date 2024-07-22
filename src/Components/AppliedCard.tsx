import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {dip} from '../util/function';
import CardView from 'react-native-cardview';
import {theme} from '../util/theme';
import {Calendar, Cross} from '../util/icons';
import BlankButton from './BlankButton';
import Fonts from '../util/Fonts';

interface AppliedCardProps {
  onPress: () => void;
  item: {
    status: string;
    firstName: string;
    lastName: string;
    leaveType: string;
    leaveCategory: string;
    fromDate: string;
    toDate: string;
    reason: string;
  };
  index: number;
  isLead: boolean;
  onPressApprove: () => void;
  onPressApply: () => void;
  negativeButtonName?: string;
  positiveButtonName?: string;
  approveLoading?: boolean;
  rejectLoading?: boolean;
}

const AppliedCard: FC<AppliedCardProps> = ({
  onPress,
  onPressApply,
  item,
  index,
  isLead,
  onPressApprove,
  negativeButtonName,
  positiveButtonName,
  approveLoading,
  rejectLoading,
}) => {
  // console.log('item in quick access', item);

  const showApplyCompOff = data => {
    let available =
      data.totalCompOffCount - data.consumedCount - data.expiredCount;
    return (
      // (data.status === 'approved' || data.status === 'Active') &&
      available > 0 ? true : false
    );
  };

  return (
    <View
      style={{
        paddingVertical: dip(10),
        backgroundColor: '#fffffff',
        margin: 5,
      }}>
      <CardView
        cardElevation={2}
        style={{
          flex: 1,
        }}
        cardMaxElevation={2}
        cornerRadius={10}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.4,
              backgroundColor:
                item?.status == 'approved'
                  ? 'green'
                  : item?.status == 'pending'
                  ? 'orange'
                  : '#FF0000',
            }}
          />

          <View
            style={{
              flex: 11,
              backgroundColor: '#ffffff',
              padding: dip(10),
            }}>
            {isLead ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flex: 2}}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: dip(18),
                      fontFamily: Fonts.RobotoBold,
                      fontWeight: '700',
                      color: '#000000',
                    }}>
                    {item?.firstName} {item?.lastName}
                  </Text>
                </View>
              </View>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '60%',
                  // borderWidth: 3,
                  // justifyContent: 'space-between',
                  gap: 16,
                }}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: dip(18),
                    fontFamily: Fonts.RobotoBold,
                    fontWeight: '700',
                    color: '#000000',
                    textTransform: 'capitalize',
                  }}>
                  {item?.leaveType ?? 'Comp-0ff'}
                </Text>
                {item?.leaveCategory ? (
                  <View>
                    <Text
                      style={{
                        fontSize: dip(14),
                        fontFamily: Fonts.RobotoMedium,
                        fontWeight: '400',
                        color: '#777777',
                        textTransform: 'capitalize',
                      }}>
                      {item?.leaveCategory}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View>
                <Text
                  style={{
                    color:
                      item?.status == 'rejected'
                        ? 'red'
                        : item?.status == 'cancelled'
                        ? '#FF0000'
                        : item.status == 'pending'
                        ? 'orange'
                        : 'green',
                    fontWeight: '800',
                    fontSize: dip(16),
                    textTransform: 'capitalize',
                  }}>
                  {item?.status}
                </Text>
              </View>
            </View>

            {item?.timeRange ? (
              <View>
                <Text
                  style={{
                    fontSize: dip(14),
                    fontFamily: Fonts.RobotoMedium,
                    fontWeight: '400',
                    color: '#777777',
                    textTransform: 'capitalize',
                  }}>
                  {item?.timeRange}
                </Text>
              </View>
            ) : null}
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View
                style={{
                  height: dip(30),
                  width: dip(30),
                  backgroundColor: '#eeeeee',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: dip(40),
                }}>
                <Calendar height={dip(16)} width={dip(16)} color={'#000000'} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: dip(10),
                }}>
                <Text
                  style={{
                    fontSize: dip(14),
                    fontFamily: Fonts.RobotoMedium,
                    fontWeight: '400',
                    color: '#777777',
                  }}>
                  Leave from :{' '}
                  <Text
                    style={{
                      fontSize: dip(14),
                      fontFamily: Fonts.RobotoBold,
                      fontWeight: '700',
                      color: '#000000',
                    }}>
                    {item?.fromDate}{' '}
                    <Text
                      style={{
                        fontFamily: Fonts.RobotoRegular,
                        fontWeight: 'normal',
                      }}>
                      to
                    </Text>{' '}
                    {item?.toDate}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={{paddingVertical: 10}}>
              <Text
                style={{
                  width: '100%',
                  fontSize: dip(14),
                  fontFamily: Fonts.RobotoMedium,
                  fontWeight: '400',
                  color: '#777777',
                  textTransform: 'capitalize',
                }}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item?.reason}
              </Text>
            </View>
            {/* {item?.status == 'pending' ? ( */}
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              {isLead ? (
                <View style={{flex: 1, marginHorizontal: dip(10)}}>
                  <BlankButton
                    loading={approveLoading}
                    approveLoading={approveLoading}
                    color={'#ffffff'}
                    backgroundColor={'green'}
                    onPress={onPressApprove}
                    text={positiveButtonName ?? 'Approve'}
                  />
                </View>
              ) : null}
              {showApplyCompOff(item) &&
              !isLead &&
              item.status == 'approved' ? (
                <View style={{flex: 1, marginHorizontal: dip(10)}}>
                  <BlankButton
                    rejectLoading={rejectLoading}
                    loading={rejectLoading}
                    backgroundColor={'#134984'}
                    color={'#ffffff'}
                    onPress={onPressApply}
                    text={'Apply Leave'}
                  />
                </View>
              ) : null}
              {/* {!item.totalCompOffCount ? ( */}
              <View style={{flex: 1, marginHorizontal: dip(10)}}>
                <BlankButton
                  rejectLoading={rejectLoading}
                  loading={rejectLoading}
                  backgroundColor={'#ffffff'}
                  color={'#000000'}
                  onPress={onPress}
                  text={negativeButtonName ?? 'Cancel'}
                />
              </View>
              {/* ) : null} */}
            </View>
          </View>
        </View>
      </CardView>
    </View>
  );
};

export default AppliedCard;

const styles = StyleSheet.create({});
