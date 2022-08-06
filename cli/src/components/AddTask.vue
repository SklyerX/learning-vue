<template>
    <!-- creating a form and adding the onsubmit event and running our on onSubmit event -->
    <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <!-- Adding a v-model to create a two-way data binding -->
      <input type="text" v-model="text" name="text" placeholder="Add Task" />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <!-- Adding a v-model to create a two-way data binding -->
      <input
        type="text"
        v-model="day"
        name="day"
        placeholder="Add Day & Time"
      />
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <!-- Adding a v-model to create a two-way data binding -->
      <input type="checkbox" v-model="reminder" name="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script>
export default {
    // Naming our component
    name: "AddTask",
    // returing a text a day and the reminder state (boolean)
    data() {
        return {
            text: "",
            day: "",
            reminder: false,
        }
    },
    // Creating methods object so we can initiate our own functions
    methods: {
      // creating onSubmit event with the param of e so we can remove the defaults of a form
        onSubmit(e) {
            // preventing the default functions from being ran
            e.preventDefault();
            // form handling. making sure if the user provided a task in the input field
            if(!this.text) {
                alert("Please fill add a task!");
                return;
            }

            // Creating the new task object and including the form data
            // I have commented the id: because this was made before using the fake backend so we created our own random number
            const newTask = {
                // id: Math.floor(Math.random() * 10000),
                text: this.text,
                day: this.day,
                reminder: this.reminder
            };

            // Emmiting an event called add-task
            this.$emit('add-task', newTask);

            // Clearing the form
            this.text = "";
            this.day = "";
            this.reminder = false

        }
    }
}
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>