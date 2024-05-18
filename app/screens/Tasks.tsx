import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  TextInput,
  Text,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {AppDispatch, RootState} from '../store/store';

import {useTheme} from '../theme/useTheme';
import Layout from '../components/Layout';
import Card from '../components/Card';
import ListItem from '../components/ListItem';
import {Button} from '../components/Button/Button';
import {typeVariants} from '../theme/theme';
import {
  fetchUserContact,
  createUserContact,
  deleteUserContact,
  Contact,
  updateUserContact,
} from '../store/dummyNetwork';

const Tasks = () => {
  const {theme} = useTheme();

  const user = useSelector((state: RootState) => state.dummyNetwork.data);

  const dataStatus = useSelector(
    (state: RootState) => state.dummyNetwork.data.status,
  );
  const newUserStatus = useSelector(
    (state: RootState) => state.dummyNetwork.newUser.status,
  );

  const updateUserStatus = useSelector(
    (state: RootState) => state.dummyNetwork.updateUser.status,
  );
  const deleteUserStatus = useSelector(
    (state: RootState) => state.dummyNetwork.deleteUser.status,
  );

  // const loadingStatus = useSelector((state) => state.todos.status);
  const dispatch = useDispatch<AppDispatch>();

  const inputFirstNameRef = useRef<TextInput>(null);
  const inputLastNameRef = useRef<TextInput>(null);
  const inputRef = useRef<TextInput>(null);

  // const [text, setText] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');

  const [isEditID, setEditID] = useState('');

  const [dataEdit, setDataEdit] = useState<Contact>();
  const [isShowCard, setShowCard] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(fetchUserContact());
  };

  const postData = () => {
    const data: any = {};

    data.firstName = firstName;
    data.lastName = lastName;
    data.age = age;

    dispatch(createUserContact(data)).then(res => {
      if (newUserStatus === 'success') {
        Alert.alert('Success', 'Data added successfully');
        inputFirstNameRef.current?.clear();
        inputLastNameRef.current?.clear();
        inputRef.current?.clear();
        fetchUserContact();
      }
    });
  };

  const updateData = () => {
    const data: any = {};

    data.firstName = firstName;
    data.lastName = lastName;
    data.age = age;
    data.id = isEditID;

    console.log(JSON.stringify(data));

    dispatch(updateUserContact(data)).then(res => {
      if (updateUserStatus === 'success') {
        Alert.alert('Success', 'Data updated successfully');
        inputFirstNameRef.current?.clear();
        inputLastNameRef.current?.clear();
        inputRef.current?.clear();
        fetchUserContact();
      }
    });
  };

  const deleteData = (id: string) => {
    dispatch(deleteUserContact(id)).then(res => {
      if (deleteUserStatus === 'success') {
        setShowCard(false);
        setEditID('');
        setDataEdit(undefined);
        setFirstName('');
        setLastName('');
        setAge('');
      } else if (deleteUserStatus === 'failed') {
        Alert.alert('Error', 'Something went wrong, please try again');
      }
    });
  };

  const addNewTask = () => {
    postData();
  };

  const onCheckedHandler = (item: Contact) => {
    // dispatch(taskToggled(id));
    setShowCard(true);
    setEditID(item.id);
    setDataEdit(item);

    setFirstName(item.firstName);
    setLastName(item.lastName);
    setAge(item.age.toString());
  };

  const renderItem = ({item, index}: {item: Contact; index: number}) => (
    <ListItem
      isEdit={isEditID === item.id}
      item={item}
      index={index}
      onPress={onCheckedHandler}
    />
  );

  const keyExtractor = (item: Contact) => `contact-${item.id}`;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <Layout testID="Screen.Tasks">
      {/* Tasks Listing starts here */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme?.primary]}
          />
        }
        data={user.contacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatList}
      />
      {/* Tasks Listing ends here */}

      {isShowCard && (
        <Card
          style={[styles.inputCard, {borderTopColor: theme?.cardBorderColor}]}>
          <View style={styles.inputBtnRow}>
            <TextInput
              testID="Tasks.newTaskInput1"
              ref={inputFirstNameRef}
              placeholder="First Name"
              placeholderTextColor={theme?.color}
              style={[
                styles.input,
                typeVariants.bodyMedium,
                {
                  color: theme?.color,
                  backgroundColor: theme?.layoutBg,
                  borderColor: theme?.layoutBg,
                },
              ]}
              value={firstName}
              onChangeText={t => setFirstName(t)}
            />
          </View>
          <View style={styles.inputBtnRow}>
            <TextInput
              testID="Tasks.newTaskInput2"
              ref={inputLastNameRef}
              placeholder="Last Name"
              placeholderTextColor={theme?.color}
              style={[
                styles.input,
                typeVariants.bodyMedium,
                {
                  color: theme?.color,
                  backgroundColor: theme?.layoutBg,
                  borderColor: theme?.layoutBg,
                },
              ]}
              value={lastName}
              onChangeText={t => setLastName(t)}
            />
          </View>
          <View style={styles.inputBtnRow}>
            <TextInput
              testID="Tasks.newTaskInput3"
              ref={inputRef}
              placeholder="Age"
              placeholderTextColor={theme?.color}
              style={[
                styles.input,
                typeVariants.bodyMedium,
                {
                  color: theme?.color,
                  backgroundColor: theme?.layoutBg,
                  borderColor: theme?.layoutBg,
                },
              ]}
              value={age}
              onChangeText={t => setAge(t)}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            {isEditID && (
              <Button
                onPress={() => {
                  deleteData(isEditID);
                }}
                style={[styles.btnAdd, {backgroundColor: 'orange'}]}>
                {deleteUserStatus === 'loading' ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={{color: '#fff'}}>{'Delete'}</Text>
                )}
              </Button>
            )}
            <Button
              onPress={() => {
                if (isEditID) {
                  Alert.alert('Edit Contact', 'Are you sure?');
                  updateData();
                } else {
                  addNewTask();
                }
              }}
              style={styles.btnAdd}>
              {dataStatus === 'loading' ||
              newUserStatus === 'loading' ||
              updateUserStatus === 'loading' ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{color: '#fff'}}>
                  {isEditID ? 'Edit Contact' : 'Add Contact'}
                </Text>
              )}

              {/* {!isEditID && (
                <Icon
                  name={'checkmark-sharp'}
                  size={20}
                  color={theme.layoutBg}
                  style={{marginLeft: 10}}
                />
              )} */}
            </Button>
          </View>
          <Button
            onPress={() => {
              setShowCard(false);
              setEditID('');
              setDataEdit(undefined);
            }}
            style={[
              styles.btnAdd,
              {
                flex: 0,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: theme?.primary,
              },
            ]}>
            <Text style={{color: theme?.primary}}>{'Cancel'}</Text>
          </Button>
        </Card>
      )}

      {!isShowCard && (
        <TouchableOpacity
          onPress={() => {
            setShowCard(true);
            setEditID('');
            setDataEdit(undefined);
            setFirstName('');
            setLastName('');
            setAge('');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            position: 'absolute',
            bottom: 14,
            right: 14,
            height: 60,
            elevation: 10,
            backgroundColor: theme?.primary,
            borderRadius: 100,
          }}>
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
      )}
    </Layout>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flatList: {
    paddingHorizontal: 12,
    paddingVertical: 30,
  },
  tickIcon: {
    width: 22,
    height: 22,
  },
  inputCard: {
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputBtnWrp: {
    flexDirection: 'row',
    flex: 1,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    height: 45,
    backgroundColor: '#f6f6f6',
  },
  btnAdd: {
    flexDirection: 'row',
    borderRadius: 5,
    padding: 6,
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    height: 42,
    marginBottom: 20,
  },
  btnCancel: {
    flexDirection: 'row',
    borderRadius: 5,
    padding: 6,
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ff4444',
    height: 42,
    marginBottom: 20,
  },
  btnAddText: {
    color: '#fff',
    fontSize: 14,
  },
  btnClear: {
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  btnClearText: {
    color: '#c50e29',
    fontSize: 14,
  },
});
