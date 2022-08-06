// importing create app function from vue to mount our application to the html div with the id of #app
// importing our app file that includes our main code
import { createApp } from 'vue'
import App from './App.vue'

// Running the function and adding our app file to it.
createApp(App).mount('#app')
