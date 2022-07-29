import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask:Task = {
      title: newTaskTitle,
      id: new Date().getTime(),
      done: false
    }

    setTasks((oldState: Task[]) => [...oldState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks: Task[] = [...tasks];
    const selectedTaskIndex = updatedTasks.findIndex(task => task.id === id);
    
    if(typeof(selectedTaskIndex) !== 'number') return;
    
    updatedTasks[selectedTaskIndex].done = !updatedTasks[selectedTaskIndex].done

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    const currentTasks: Task[] = [...tasks];  

    const filteredTasks = currentTasks.filter(taks => taks.id !== id)
    
    setTasks(filteredTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})