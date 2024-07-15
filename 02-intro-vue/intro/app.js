const { createApp, ref } = Vue;

const app = createApp({
  //   template: `
  //     <h1>{{message}}</h1>
  //     <p>{{author}}</p>
  //     `,
  setup() {
    const message = ref("I'm a message from App.js");
    const author = ref("Bruce Wayne");

    const changeQuote = () => {
      message.value = "Hola soy Goku!";
      author.value = "Goku";
    };

    // setTimeout(() => {
    //   message.value = "Hola soy Goku!";
    //   author.value = "Goku";
    // }, 1000);

    return {
      message,
      author,
      changeQuote,
    };
  },
});

app.mount("#my_app");
