import * as React from 'react';
import {StyleSheet, Pressable, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme, ThemeContextInterface} from '../theme/useTheme';
import Card from './Card';
import Text from './Text';
import {Contact} from 'app/store/dummyNetwork';

interface TaskItemType {
  id: string;
  title: string;
  done: boolean;
}

interface ListItemType {
  item: Contact;
  index?: number;
  onPress: (arg0: any) => void;
  isEdit: boolean;
}

const ListItem = ({item, onPress, isEdit}: ListItemType): JSX.Element => {
  const {theme}: Partial<ThemeContextInterface> = useTheme();

  return (
    <Card style={styles.card}>
      <Pressable
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.row, {opacity: isEdit ? 0.3 : 1}]}
        accessibilityLabel={
          item.id ? 'Tap to uncheck from list' : 'Tap to check from list'
        }
        accessibilityHint="Toggles task done and undone"
        accessibilityRole="radio"
        accessibilityState={{checked: isEdit}}
        onPress={() => onPress(item)}>
        <Image
          source={{
            uri:
              item.photo != 'N/A'
                ? item.photo
                : 'https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
          }}
          style={{width: 50, height: 50, borderRadius: 25}}
          resizeMode={'center'}
        />

        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {
                color: theme?.color,
                textDecorationLine: isEdit ? 'line-through' : 'none',
              },
            ]}>
            {item.firstName + ' ' + item.lastName}
          </Text>
          <Text
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {
                color: theme?.color,
                textDecorationLine: isEdit ? 'line-through' : 'none',
              },
            ]}>
            {item.age}
          </Text>
        </View>
        <Icon
          name="checkbox"
          size={20}
          color={isEdit ? theme.primary : '#CECECE'}
        />
      </Pressable>
    </Card>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
});
