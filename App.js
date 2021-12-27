import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';

const AnimatableBtn = Animatable.createAnimatableComponent(TouchableOpacity);




export default function App() {
  const [task, setTask] = useState([]);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  function handleAdd() {
    if (input === '') return;

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');

  }


  const handleDelete = useCallback(
    (data) => {
      const find = task.filter(r => r.key !== data.key);
      setTask(find);
      
    }
  );


  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor='#171d31' barStyle="ligth-content" />
      <View style={styles.content}>
        <Text style={styles.title}> Minhas Tarefas </Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false} // desativa barra de scroll
        data={task} // contem todos itens da lista
        keyExtractor={(item) => String(item.key)} // cada item tem uma chave
        renderItem={({ item }) => <TaskList data={item} handleDelete={handleDelete} />} // rederiza (mostra) os itens
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView>
          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver >

            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Ionicons size={35} style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back"></Ionicons>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Nova tarefa</Text>
            </View>

            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              autoCorrect={false}
              placeholder="O que precisa fazer hoje"
              style={styles.input}
              value={input}
              onChangeText={(text) => setInput(text)}

              placeholder='O que precisa fazer hoje?'
              style={styles.input}
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>

          </Animatable.View>

        </SafeAreaView>
      </Modal>

      <AnimatableBtn style={styles.fab}
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={() => setOpen(true)}
      >
        <Ionicons name="ios-add" size={35} color="#FFF" />
      </AnimatableBtn>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31'
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: "center",
    color: 'white'
  },
  fab: {
    position: 'absolute',
    width: 60,
    heigth: 60,
    backgroundColor: '#0094FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    }
  },


  modal: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: '#FFF'
  },
  modalBody: {
    backgroundColor: '#AAA',
    textAlign: 'center'
  },


  handleAdd: {
    backgroundColor: '#FFF',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5
  },
  handleAddText: {
    fontSize: 20,
  }



})