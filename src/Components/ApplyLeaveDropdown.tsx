// import React, {FC} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import SelectDropdown from 'react-native-select-dropdown';
// import {dip} from '../util/function';
// import Fonts from '../util/Fonts';
// import {ChevronDown} from '../util/icons';

// interface ApplyLeaveDropdownProps {
//   name: string;
//   data: string[];
//   onSelect: (selectedItem: string, index: number) => void;
//   placeholder: string;
// }

// const ApplyLeaveDropdown: FC<ApplyLeaveDropdownProps> = ({
//   name,
//   data,
//   onSelect,
//   placeholder,
// }) => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         height: dip(60),
//         justifyContent: 'space-evenly',
//         borderWidth: 1,
//         borderRadius: 10,
//         marginVertical: dip(10),
//         paddingHorizontal: dip(10),
//         borderColor: '#a4cbfc',
//         backgroundColor: '#f5f9ff',
//       }}>
//       <View style={{flex: 2, justifyContent: 'center'}}>
//         <SelectDropdown
//           renderDropdownIcon={() => (
//             <ChevronDown height={dip(15)} width={dip(20)} color={'#000000'} />
//           )}
//           data={data}
//           onSelect={(selectedItem, index) => {
//             onSelect(selectedItem, index);
//           }}
//           defaultButtonText={placeholder}
//           buttonTextAfterSelection={(selectedItem, index) => {
//             return selectedItem;
//           }}
//           rowTextForSelection={(item, index) => {
//             return item;
//           }}
//           buttonStyle={{
//             backgroundColor: '#E9ECEF',
//             borderRadius: 10,
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '100%',
//             paddingHorizontal: 10,
//           }}
//           dropdownStyle={styles.dropdown}
//         />
//       </View>
//     </View>
//   );
// };

// export default ApplyLeaveDropdown;

// const styles = StyleSheet.create({
//   selectedEmailContainer: {
//     marginTop: 20,
//   },
//   selectedEmailText: {
//     fontSize: 18,
//   },
//   dropdown: {
//     width: '90%',
//     maxHeight: 200,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 10,
//   },
//   placeholderText: {
//     fontSize: 16,
//     color: 'black',
//     fontStyle: 'italic',
//   },
// });

import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {dip} from '../util/function';
import Fonts from '../util/Fonts';
import {ChevronDown, Cross} from '../util/icons';

interface ApplyLeaveDropdownProps {
  name: string;
  data: string[];
  onSelect: (selectedItem: string, index: number) => void;
  placeholder: string;
}

const ApplyLeaveDropdown: FC<ApplyLeaveDropdownProps> = ({
  name,
  data,
  onSelect,
  placeholder,
}) => {
  return (
    <View
      style={{
        flex: 1,
        height: dip(60),
        justifyContent: 'space-evenly',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: dip(10),
        paddingHorizontal: dip(10),
        borderColor: '#a4cbfc',
        backgroundColor: '#f5f9ff',
      }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <SelectDropdown
          data={data}
          onSelect={(selectedItem, index) => {
            onSelect(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flex: 9,
                      height: dip(50),
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem) || placeholder}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    {isOpened ? (
                      <Cross
                        height={dip(15)}
                        width={dip(20)}
                        color={'#000000'}
                      />
                    ) : (
                      <ChevronDown
                        height={dip(15)}
                        width={dip(20)}
                        color={'#000000'}
                      />
                    )}
                  </View>
                </View>
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && {backgroundColor: '#D2D9DF'}),
                }}>
                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
    </View>
  );
};

export default ApplyLeaveDropdown;

const styles = StyleSheet.create({
  selectedEmailContainer: {
    marginTop: 20,
  },
  selectedEmailText: {
    fontSize: 18,
  },
  dropdown: {
    width: '90%',
    maxHeight: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: 'black',
    fontStyle: 'italic',
  },
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    // flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
