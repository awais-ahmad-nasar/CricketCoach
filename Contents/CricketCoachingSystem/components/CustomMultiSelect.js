// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Modal,
// } from 'react-native';

// const CustomMultiSelect = ({
//   items,
//   selectedItems,
//   onSelectedItemsChange,
//   placeholder,
// }) => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const toggleItem = itemKey => {
//     const newSelectedItems = selectedItems.includes(itemKey)
//       ? selectedItems.filter(id => id !== itemKey)
//       : [...selectedItems, itemKey];
//     onSelectedItemsChange(newSelectedItems);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={() => setModalVisible(true)}
//         style={styles.input}>
//         <Text style={styles.placeholderText}>
//           {selectedItems.length > 0
//             ? `${selectedItems.length} selected`
//             : placeholder}
//         </Text>
//       </TouchableOpacity>

//       <Modal
//         visible={modalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <FlatList
//               data={items}
//               keyExtractor={item => item.key}
//               renderItem={({item}) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.item,
//                     selectedItems.includes(item.key) && styles.selectedItem,
//                   ]}
//                   onPress={() => toggleItem(item.key)}>
//                   <Text style={styles.itemText}>{item.value}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(false)}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// // Keep the styles the same as before
// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   placeholderText: {
//     color: '#000',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     maxHeight: '70%',
//   },
//   item: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   selectedItem: {
//     backgroundColor: '#90C290',
//   },
//   itemText: {
//     color: '#000',
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#000080',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default CustomMultiSelect;

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';

const CustomMultiSelect = ({
  items,
  selectedItems,
  onSelectedItemsChange,
  placeholder,
  maxSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleItem = itemKey => {
    const newSelectedItems = selectedItems.includes(itemKey)
      ? selectedItems.filter(id => id !== itemKey)
      : [...selectedItems, itemKey];
    onSelectedItemsChange(newSelectedItems);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdown}>
        <Text style={styles.placeholderText}>
          {selectedItems.length > 0
            ? `${selectedItems.length} selected`
            : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Select Players (Max {maxSelect})
            </Text>
            <FlatList
              data={items}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    selectedItems.includes(item.key) && styles.selectedItem,
                  ]}
                  onPress={() => toggleItem(item.key)}>
                  <Text style={styles.itemText}>{item.value}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  dropdown: {
    borderWidth: 2,
    borderColor: 'rgba(28,58,107,1)',
    borderRadius: 15,
    width: '83%',
    padding: 10,
    justifyContent: 'center',
    height: 50,
  },
  placeholderText: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000080',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#90C290',
  },
  itemText: {
    color: '#000',
    fontSize: 15,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#000080',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomMultiSelect;
