<!-- creating template -->
<template>
  <div class="container">
    <!-- including our header and adding params to it -->
    <!-- First Param: we are listening for the toggleAddTask event that is getting emmited through a different file and we are running the toggleAddTask function when we recive that event -->
    <!-- Second Param: The title param is included in the header.vue file so we can custom text -->
    <!-- Third Param: We are listening for the showAddTask and running the showAddTask function when we recive it -->
    <Header
      @toggle-add-task="toggleAddTask"
      title="Task Tracker"
      :showAddTask="showAddTask"
    />
    <!-- We are writing an if statement using v-if to check if showAddTask is equal to true if so we are going to render the <AddTask> componenet exported from a different file -->
    <div v-if="showAddTask">
      <!-- Listening for the add-task event and running the addTask function -->
      <AddTask @add-task="addTask" />
    </div>
    <!-- Importing the Tasks component and adding the event listeners for delete and toggleRemind -->
    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      :tasks="tasks"
    />
  </div>
</template>

<script>
// Importing our components from different files
import Header from "./components/Header.vue";
import Tasks from "./components/Tasks.vue";
import AddTask from "./components/AddTask.vue";

// exporting the app
export default {
  // giving our "app"/"component" a name.
  name: "App",
  // Rendering the components exported
  components: {
    Header,
    Tasks,
    AddTask,
  },
  data() {
    return {
      // making our data return an array and showAddTask as a boolean
      tasks: [],
      showAddTask: false,
    };
  },
  // we need to include any functions we have in the methods object
  methods: {
    // Creating the toggleAddTask so we can run it once we get it through the event listeneres above
    toggleAddTask() {
      // We are making it so the showAddTask above is the oposite of what it is. if true it gets change to false if false it gets changed to true
      this.showAddTask = !this.showAddTask;
    },
    // Creating the addTask function with the param of task so we can extract the needed data from the task that is being executed
    async addTask(task) {
      // Making our post request to the fake backend api running on this app.
      const res = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      // Making our data a json
      const data = await res.json();

      // Adding the new data to the tasks array and including the tasks and the data we found.
      this.tasks = [...this.tasks, data];
    },
    // Creating the delete function with the param of id so we can deleted the correct task
    async deleteTask(id) {
      // Making sure that the user is ready to delete their task
      if (confirm("Are you sure")) {
        // Creating the delete request and sending it to the fake backend
        const res = await fetch(`api/tasks/${id}`, {
          method: "DELETE",
        });

        // Saying if the status code of the delete request is equal to 200 meaning success we should execute the option below
        // The option below says if its true we are going to filter the array of tasks and make sure that the task id is not the same id they passed in
        // Returning an error message if the status code is not 200
        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("Error while deleting task");
      }
    },
    // Creating toggleReminder function
    async toggleReminder(id) {

      // declaring the taskToToggle as the fetchTask function that was made above
      // declaring the updateTaskReminder as an object, we are telling it to include what it already included and just change the reminder to the opposite boolean value
      const taskToToggle = await this.fetchTask(id);
      const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder }

      // Sending our update request to the fake backend and filtering all our data to match the id provided
      const res = await fetch(`api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateTask)
      });

      // making the returned data a json
      const data = await res.json();

      // mapping through our array and updating the reminder in the ui aswell
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      );
    },
    // Creating the fetchTasks function
    async fetchTasks() {
      // creating our get request
      const res = await fetch("api/tasks");

      // Making the returned data a json
      const data = await res.json();

      // Returning the data found
      return data;
    },
    // creating the fetchTask function
    async fetchTask(id) {
      // creating the get request to match the id provided in the function
      const res = await fetch(`api/tasks/${id}`);

      // Making the returned data a json
      const data = await res.json();

      // returning the data found
      return data;
    },
  },
  // out of the methods we are declaring the created function the created function is a vuejs function that runs when the site loads
  async created() {
    // we are running the fetchTask function
    this.tasks = await this.fetchTasks();
  },
};
</script>

<style>
/* Styles */

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
