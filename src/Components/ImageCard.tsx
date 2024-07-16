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
        <View style={styles.innerShadowContainer}>
          <Image source={imageSource} style={styles.image} />
          {/* <View style={styles.innerShadow} /> */}
        </View>
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
    position: 'relative',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    position: 'absolute',
    top: 8,
  },
  innerShadowContainer: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    position: 'absolute',
    bottom: 0,
  },
  innerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    opacity: 0.4,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
});
