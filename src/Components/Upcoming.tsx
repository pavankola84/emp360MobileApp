import React, {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {theme} from '../util/theme';
import AppliedCard from './AppliedCard';

interface UpcomingProps {
  data: any[];
  onPress: (item: any) => void;
  isLead?: boolean;
  onPressApprove?: (item: any) => void;
  onPressApply?: (item: any) => void;
  id?: any;
  status?: any;
  approveLoading?: boolean;
  rejectLoading?: boolean;
}

const Upcoming: FC<UpcomingProps> = ({
  data,
  onPress,
  isLead,
  onPressApprove,
  onPressApply,
  approveLoading,
  rejectLoading,
  id,
}) => {
  return (
    <View style={{width: '100%'}}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          return (
            <AppliedCard
              approveLoading={id == item?.id ? approveLoading : false}
              rejectLoading={id == item?.id ? rejectLoading : false}
              isLead={isLead}
              key={index.toString()}
              onPress={() => {
                onPress(item);
              }}
              item={item?.formData ?? item}
              index={index}
              onPressApprove={() => {
                onPressApprove(item);
              }}
              onPressApply={() => {
                onPressApply(item);
              }}
              negativeButtonName={isLead ? 'Reject' : 'Cancel'}
              positiveButtonName={'Approve'}
            />
          );
        }}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default Upcoming;

const styles = StyleSheet.create({});
