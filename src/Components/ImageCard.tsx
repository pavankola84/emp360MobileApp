import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface ImageCardProps {
  text: string;
  imageSource: ImageSourcePropType;
  backgroundColor: string;
  textColor: string;
  path: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  text,
  imageSource,
  backgroundColor,
  textColor,
  path,
}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate(path);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.card,
          {
            backgroundColor,
          },
        ]}>
        <Text
          style={[
            styles.text,
            {
              width: '75%',
              marginLeft: 8,
              color: textColor,
            },
          ]}>
          {text}
        </Text>
        <Image source={imageSource} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 150,
    borderRadius: 12,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 12,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 8.84,
    elevation: 5,
    position: 'relative',
  },
  text: {
    fontWeight: 'bold',
    position: 'absolute',
    top: 8,
  },
  image: {
    width: '100%',
    height: 100,
    opacity: 1,
    borderRadius: 12,
    position: 'absolute',
    bottom: 0,
  },
});
