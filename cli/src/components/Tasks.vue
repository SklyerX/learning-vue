<template>
    
    <!-- making a div with key of task.id because we are looping through all the data in the array and each task has its own unique id -->
    <div :key="task.id" v-for="task in tasks">
        <!-- Returning the Task component that was exported from a different vue file -->
        <!-- listening for the toggle-reminder event and when that executes we are going to send another event called toggle-reminder with the task.id so we can update it in the App.vue -->
        <!-- listening for the delete-task event and when that executes we are going to send another event called delete-task with the task.id so we can delete it in the App.vue -->
        <Task @toggle-reminder="$emit('toggle-reminder', task.id)" @delete-task="$emit('delete-task', task.id)" :task="task" />
    </div>

</template>

<script>
// Importing task from the Task.vue file
import Task from "./Task.vue";

export default {
    // Setting a name for this component
    name: "Tasks",
    // Including the props/params that we want included
    props: {
        tasks: Array
    },
    // Rendering the Task component
    components: { 
        Task
    },
    // creating our emitters
    emits: ["delete-task", "toggle-reminder"]
}
</script>