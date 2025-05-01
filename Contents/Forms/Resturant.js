import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const RestApp = () => {
  // State variables
  const [userCate, setUserCate] = useState(''); // To store selected category
  const [userPrice, setUserPrice] = useState(''); // To store selected price range
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] =
    useState(false); // To toggle category dropdown
  const [isPriceDropdownVisible, setIsPriceDropdownVisible] = useState(false); // To toggle price dropdown

  // Menu items data
  const [stock, setStock] = useState([
    {Price: 800, name: 'Spring Rolls', category: 'Appetizers'},
    {Price: 500, name: 'Cheese Burger', category: 'Main Course'},
    {Price: 1200, name: 'Tikka', category: 'Appetizers'},
    {Price: 1500, name: 'Chicken Karahi', category: 'Main Course'},
    {Price: 400, name: 'Cup Cake', category: 'Desserts'},
  ]);

  // Dropdown options
  const categoryOptions = ['Appetizers', 'Main Course', 'Desserts'];
  const priceOptions = ['Below 1000 PKR', '1000 - 1500 PKR', 'Above 1500 PKR'];

  // Filtering logic
  const filterItems = () => {
    return stock.filter(item => {
      const matchesCategory = userCate ? item.category === userCate : true;
      const matchesPrice = (() => {
        if (userPrice === 'Below 1000 PKR') return item.Price < 1000;
        if (userPrice === '1000 - 1500 PKR')
          return item.Price >= 1000 && item.Price <= 1500;
        if (userPrice === 'Above 1500 PKR') return item.Price > 1500;
        return true;
      })();
      return matchesCategory && matchesPrice;
    });
  };

  // Render item for menu display
  const renderMenuItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>Price: {item.Price} PKR</Text>
      <Text style={styles.itemText}>Category: {item.category}</Text>
    </View>
  );

  // Render item for dropdown list
  const renderDropdownItem = (item, setValue, setVisible) => (
    <TouchableOpacity
      onPress={() => {
        setValue(item);
        setVisible(false);
      }}
      style={styles.dropdownItem}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, padding: 10}}>
      {/* App Header */}
      <Text style={styles.mainHeading}>Restaurant Menu</Text>

      {/* Category Dropdown */}
      <Text style={styles.catText}>Select Category</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() =>
          setIsCategoryDropdownVisible(!isCategoryDropdownVisible)
        }>
        <Text>{userCate || 'All'}</Text>
      </TouchableOpacity>
      {isCategoryDropdownVisible && (
        <FlatList
          data={categoryOptions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) =>
            renderDropdownItem(item, setUserCate, setIsCategoryDropdownVisible)
          }
        />
      )}

      {/* Price Range Dropdown */}
      <Text style={styles.catText}>Select Price Range</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsPriceDropdownVisible(!isPriceDropdownVisible)}>
        <Text>{userPrice || 'All'}</Text>
      </TouchableOpacity>
      {isPriceDropdownVisible && (
        <FlatList
          data={priceOptions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) =>
            renderDropdownItem(item, setUserPrice, setIsPriceDropdownVisible)
          }
        />
      )}

      {/* Filtered Items Display */}
      <FlatList
        data={filterItems()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMenuItem}
        style={{marginTop: 20}}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mainHeading: {
    backgroundColor: 'skyblue',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'skyblue',
    borderRadius: 10,
    textAlign: 'center',
  },
  catText: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: 'white',
    backgroundColor: 'white',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'black',
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#FF9966',
  },
});

export default RestApp;
