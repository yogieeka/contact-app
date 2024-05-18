import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {useTheme} from '../theme/useTheme';
import Layout from '../components/Layout';
import NetwokExampleCard from '../components/NetwokExampleCard';
import Text from '../components/Text';

import {RootState, AppDispatch} from '../store/store';
import {
  fetchUserContact,
  createUserContact,
  deleteUserContact,
} from '../store/dummyNetwork';

const dummyData = {
  firstName: 'Bilbo',
  lastName: 'Baggins',
  age: 111,
  photo:
    'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
};

export default function NetworkExample() {
  const {theme} = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.dummyNetwork.data);
  const newUser = useSelector((state: RootState) => state.dummyNetwork.newUser);
  const deleteUser = useSelector(
    (state: RootState) => state.dummyNetwork.deleteUser,
  );

  const dataStatus = useSelector(
    (state: RootState) => state.dummyNetwork.data.status,
  );
  const newUserStatus = useSelector(
    (state: RootState) => state.dummyNetwork.newUser.status,
  );

  const deleteUserStatus = useSelector(
    (state: RootState) => state.dummyNetwork.deleteUser.status,
  );

  const fetchData = () => {
    dispatch(fetchUserContact());
  };

  const postData = () => {
    dispatch(createUserContact(dummyData));
  };

  const deleteData = (id: string) => {
    dispatch(deleteUserContact(id));
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollview}>
        {/* Get Card */}
        <NetwokExampleCard
          title="GET"
          loading={dataStatus === 'loading'}
          onPress={fetchData}>
          <Text style={[styles.url, {color: theme.color}]}>
            URL: https://contact.herokuapp.com/contact
          </Text>
          <Text style={[styles.status, {color: theme.color}]}>
            {dataStatus}
          </Text>

          {dataStatus === 'success' ? (
            <>
              {user.contacts.map((contact, index) => (
                <View key={index} style={{marginBottom: 10}}>
                  <Text style={{color: theme.color}}>
                    {'id : ' + contact.id}
                  </Text>
                  <Text style={{color: theme.color}}>
                    {'firstName : ' + contact.firstName}
                  </Text>
                  <Text style={{color: theme.color}}>
                    {'lastName : ' + contact.lastName}
                  </Text>
                  <Text style={{color: theme.color}}>
                    {'age : ' + contact.age}
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <>
              <Text style={[styles.url, {color: theme.color}]}>
                Press fire to fetch the data
              </Text>
            </>
          )}
        </NetwokExampleCard>

        {/* Post Card */}
        <NetwokExampleCard
          title="POST"
          loading={newUserStatus === 'loading'}
          onPress={postData}>
          <Text style={[styles.url, {color: theme.color}]}>
            URL: https://contact.herokuapp.com/contact
          </Text>
          <Text style={[styles.status, {color: theme.color}]}>
            {newUserStatus}
          </Text>

          <View style={styles.row}>
            <View style={styles.grid}>
              <Text style={[styles.code, {color: theme.color}]}>Payload:</Text>
              <Text style={[styles.code, {color: theme.color}]}>
                {JSON.stringify(dummyData, null, 2)}
              </Text>
            </View>
            <View style={styles.grid}>
              <Text style={[styles.code, {color: theme.color}]}>
                From network:
              </Text>
              <Text style={[styles.code, {color: theme.color}]}>
                {JSON.stringify(newUser, null, 2)}
              </Text>
            </View>
          </View>
        </NetwokExampleCard>

        {user.contacts.length > 0 && (
          <NetwokExampleCard
            title="DELETE"
            loading={newUserStatus === 'loading'}
            onPress={() =>
              deleteData(user.contacts[user.contacts.length - 1].id)
            }>
            <Text style={[styles.url, {color: theme.color}]}>
              URL: https://contact.herokuapp.com/contact/id
            </Text>
            <Text style={[styles.status, {color: theme.color}]}>
              {deleteUserStatus}
            </Text>

            <View style={styles.row}>
              <View style={styles.grid}>
                <Text style={[styles.code, {color: theme.color}]}>
                  Payload:
                </Text>
                <Text style={[styles.code, {color: theme.color}]}>
                  {user.contacts[user.contacts.length - 1].id}
                </Text>
              </View>
              <View style={styles.grid}>
                <Text style={[styles.code, {color: theme.color}]}>
                  From network:
                </Text>
                <Text style={[styles.code, {color: theme.color}]}>
                  {JSON.stringify(deleteUser, null, 2)}
                </Text>
              </View>
            </View>
          </NetwokExampleCard>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  url: {
    marginBottom: 10,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  code: {
    fontSize: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  grid: {
    flex: 0.5,
  },
});
