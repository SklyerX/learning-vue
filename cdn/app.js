// creating the vue app
const app = Vue.createApp({
    // returning a template/base userinfo
    data() {
        return {
            firstName: "Skyler",
            lastName: "X",
            email: "skyler.x@protonmail.com",
            gender: "male",
            picture: "https://avatars.githubusercontent.com/u/85718273?v=4"
        }
    },
    // creating method object so we can create our own functions
    methods: {
        // creating the getUser function
        getUser() {

            // creating the request options
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            }

            // fetching the randomuser api and then getting the response and changing the value above to the new value
            // and because we are rendering the above value the html gets updated
            fetch("https://api.randomuser.me", requestOptions).then((response) => response.json()).then((result) => {
            this.firstName = `${result.results[0].name.first}`,
            this.lastName = `${result.results[0].name.last}`,
            this.email = `${result.results[0].email}`,
            this.gender = `${result.results[0].gender}`,
            this.picture = `${result.results[0].picture.medium}`            
        }).catch((err) => console.error(err));
        }
    }
})

// We are loading all the vue js in the div called .app if its outside of .app then the vue js wont work
app.mount(".app");