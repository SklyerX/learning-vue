<template>
  <!-- Listening for the double click function. this is a vue event and not a self created one -->
  <!-- If we recive a double click on the task we are going to send an event called toggle-reminder with the id of the task they clicked on so we can update it in App.vue -->
  <!-- We are making the class into a vue class so we can change the class if the task has some data -->
  <!-- We are saying if the reminder is turned on make the class reminder if not make it nothing or task -->
  <div @dblclick="$emit('toggle-reminder', task.id)" :class="[task.reminder ? 'reminder' : '', 'task']">
    <!-- the task name -->
    <h3>{{ task.text }}
        <!-- using font-awesome to include an x icon -->
        <!-- Listening for a click event on the delete icon and emmiting a new event called delete-task with the id of the task they clicked on so we can delete the task in the App.vue -->
        <i @click="$emit('delete-task', task.id)" class="fas fa-times"></i>
    </h3>
    <!-- rendering the date of the task -->
    <p>{{ task.day }}</p>
  </div>
</template>

<script>
export default {
  // Giving our componenet the name of task
  name: "Task",
  // including our props and making it into an object
  props: {
    task: Object,
  },
};
</script>

<!-- styles that only apply to the task.vue because we used the scoped on our style -->
<style scoped>
.fas {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>