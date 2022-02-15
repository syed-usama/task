import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import C_Icon from 'react-native-vector-icons/Feather';
import B_Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const [selectedValue, setSelectedValue] = useState('Select Vehicle Type');
  const [pickup, setpickup] = useState('');
  const [dropoff, setdropoff] = useState('');
  const [price, setprice] = useState('');
  const [time, settime] = useState('');
  const [notes, setnotes] = useState('');
  const [filePath, setFilePath] = useState([]);

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      const filteredArray = response.assets.filter(item => {
        setFilePath(filePath => [...filePath, item.uri]);
      });
    });
  };
  const deleteImage = file => {
    const filteredArray = filePath.filter(item => {
      if (item != file) {
        return item;
      }
    });
    setFilePath(filteredArray);
  };

  return (
    <ScrollView>
      <View style={styles.Container}>
        <View style={styles.header}>
          <View style={styles.heading}>
            <View style={styles.arrow}>
              <Icon name="angle-left" size={35} color="#2c5d82" />
            </View>
            <View style={styles.headtext}>
              <Text style={styles.headerText}>Create Order</Text>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <Text style={styles.headerText1}>Create a New order</Text>
        </View>
        <View style={styles.image}>
          <View style={{flex: 4, flexDirection: 'row'}}>
            <ScrollView horizontal={true}>
              {filePath.map(image => (
                <View>
                  <Image
                    style={styles.imageView}
                    resizeMode="stretch"
                    source={{uri: image}}
                  />
                  <Icon
                    onPress={() => deleteImage(image)}
                    name="remove"
                    size={18}
                    color="red"
                    style={styles.remove}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={styles.imagePicker}>
              <C_Icon
                name="camera"
                size={25}
                onPress={() => chooseFile('photo')}
              />
            </View>
          </View>
        </View>
        <View style={styles.detail}>
          <View style={styles.type}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item
                style={styles.detailText}
                label="Select Vehicle Type"
                value="Select Vehicle Type"
              />
              <Picker.Item
                style={styles.detailText}
                label="Mini"
                value="Mini"
              />
              <Picker.Item
                style={styles.detailText}
                label="Delux"
                value="Delux"
              />
              <Picker.Item
                style={styles.detailText}
                label="Luxury"
                value="Luxury"
              />
            </Picker>
          </View>
          <View style={styles.detailView}>
          <View style={styles.location}>
              <View style={{flex: 9}}>
                <TextInput
                  placeholder="Select Pickup Location"
                  style={styles.detailText}
                  value={pickup}
                  onChangeText={pickup => setpickup(pickup)}
                />
              </View>
              <View style={{flex: 1}}>
                <B_Icon name="md-bookmark" size={30} color="orange" />
              </View>
            </View>
          </View>
          <View style={styles.detailView}>
            <View style={styles.location}>
              <View style={{flex: 9}}>
                <TextInput
                  placeholder="Select Dropoff Location"
                  style={styles.detailText}
                  value={dropoff}
                  onChangeText={dropoff => setdropoff(dropoff)}
                />
              </View>
              <View style={{flex: 1}}>
                <B_Icon name="md-bookmark" size={30} color="orange" />
              </View>
            </View>
          </View>
          <View style={styles.detailView}>
            <TextInput
              placeholder="Enter Shipping Price"
              style={styles.detailText}
              value={price}
              onChangeText={price => setprice(price)}
            />
          </View>
          <View style={styles.detailView}>
            <TextInput
              placeholder="Select Receiving & Delivery Time"
              style={styles.detailText}
              value={time}
              onChangeText={time => settime(time)}
            />
          </View>
          <View style={styles.notes}>
            <TextInput
              placeholder="Driver Notes"
              style={styles.detailText}
              numberOfLines={4}
              value={notes}
              onChangeText={notes => setnotes(notes)}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => console.log('pressed')}
            activeOpacity={0.8}>
            <View style={styles.footerView}>
              <Text style={styles.footerText}>Create Order</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  Container: {
    height: height - 80,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  imageView: {
    width: 55,
    height: 55,
    borderRadius: 15,
    marginRight: 25,
  },
  remove:{
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 26,
  },
  imagePicker:{
    borderWidth: 1,
    borderRadius: 10,
    padding: 13,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  detail: {
    flex: 3.6,
    marginRight: 15,
  },
  footer: {
    flex: 1.4,
    justifyContent: 'flex-end',
  },
  heading: {
    flexDirection: 'row',
  },
  headtext: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 4,
  },
  headerText1: {
    fontSize: 12,
    color: 'black',
    alignSelf: 'center',
  },
  detailText: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: '700',
    //backgroundColor: 'green'
  },
  location:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomStartRadius: 20,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  detailView: {
    flex: 1,
    marginLeft: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  notes: {
    flex: 2,
    marginLeft: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  footerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c5d82',
    marginHorizontal: 50,
    marginBottom: 10,
    borderRadius: 20,
    height: 40,
  },
  footerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 4,
  },
});

export default App;
