import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Picker } from 'react-native';

export default function App() {
  const [task, setTask] = useState({ name: "", category: "" });
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState(['Work', 'School']);
  const filteredTasks = selectedCategory === null
    // === check same value AND same type
    ? tasks
    : tasks.filter((t) => t.category === selectedCategory);

  const createTask = () => {
    addTask();
  }
  const addTask = () => {
    if (task.name && task.category) {
      setTasks([...tasks, task]);
      if (!categories.includes(task.category)) {
        setCategories([...categories, task.category]);
      }
    }
    setTask({ name: "", category: "" });
  }

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }
  const clearTasks = () => {
    setTasks([]);
  }
  const displayTask = ({ item, index }) => (
    <View style={styles.task}>
      <Text style={styles.task_name}>{item.name}</Text>
      <Text style={styles.task_category}>{item.category}</Text>
      <TouchableOpacity onPress={() => deleteTask(index)}>
        <Text style={styles.task_del}>Tickle!</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks Tickler</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task.name}
        onChangeText={(text) => setTask({ ...task, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter category"
        value={task.category}
        onChangeText={(text) => setTask({ ...task, category: text })}
      />
      <TouchableOpacity
        style={styles.create_btn}
        onPress={createTask}>
        <Text style={styles.create_btn_text}>Create</Text>
      </TouchableOpacity>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => {
          const categoryValue = itemValue === "All Categories" ? null : itemValue;
          setSelectedCategory(categoryValue);
        }}>

        <Picker.Item label="All Categories" value={null} />
        {categories.map((category, index) => (<Picker.Item key={index} label={category} value={category} />))}
      </Picker>
      <FlatList
        data={filteredTasks}
        renderItem={displayTask}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        styles={styles.clear_btn}
        onPress={clearTasks}>
        <Text style={styles.clear_btn_text}>Clear List</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: "pink",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 7,
    alignSelf: "center",
    marginTop: 90,
  },
  input: {
    borderWidth: 3,
    borderColor: "pink",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 18,

  },
  create_btn: {
    backgroundColor: "pink",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  create_btn_text: {
    color: "white",
    alignContent: "center",
    fontSize: 18,
    alignSelf: "center",
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontSize: 18,
    paddingLeft: 40,
    paddingRight: 40,
  },
  task_name: {
    fontSize: 24,
  },
  task_category: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
  task_del: {
    backgroundColor: "pink",
    color: "white",
    fontSize: 14,
    padding: 5,
    borderRadius: 10,
    marginLeft: 10
  },
  clear_btn: {
    backgroundColor: "red",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  clear_btn_text: {
    color: "white",
    alignContent: "center",
    fontSize: 18,
    alignSelf: "center",
  },
});
