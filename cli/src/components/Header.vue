<template>
    <header>
        <!-- Rendering the title that we define in other files -->
        <h1>{{ title }}</h1>
        <!-- listening for the button click event (this is a self created event) -->
        <!-- first prop/param: If the button gets clicked we are going to emit a new event called toggle-add-task -->
        <!-- second prop/param: adding the text prop and making it vue prop so we can check if its true to make the text close and its false making it Add -->
        <!-- third prop/param: same thing as the text just changing the color if some value is true or false -->
        <Button @btn-click="$emit('toggle-add-task')" :text="showAddTask ? 'Close' : 'Add Task'" :color="showAddTask ? 'red' : 'green'"/>
    </header>
</template>

<script>
// importing the button.vue file
import Button from "./Button.vue";

export default {
    // giving our component a name
    name: "Header",
    // creating the props. now there are two ways to do this.
    // 1: make an array ["title", "showAddTask"]
    // or
    // 2: make an object and make the params an object so you can give it a type and a default value
    props: {
        title: {
            type: String,
            default: "Hello"
        },
        showAddTask: {
            type: Boolean
        }
    },
    // rendering the button component
    components: {
        Button
    }
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin-bottom: 20px;
    }
</style>