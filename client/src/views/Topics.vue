<template>
  <div class="bg_content">
    <div>
      <ul class="list-unstyled">
        <li class="media" v-for="message in reversedMessages" :key="message._id">
          <div class="media-body">
            <small>{{message.created}}</small>
            <h5 class="mt-0 mb-1">{{message.topic}}</h5>
            <br>
          </div>
          <br>
          <hr>
          <br>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// <div class="home">
// <img alt="Vue logo" src="../assets/logo.png">
// <HelloWorld msg="Welcome to Your Vue.js App"/>
// </div>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

const API_URL = 'http://localhost:3000/messages/:topics';

export default {
  name: 'Topic',
  data: () => ({
    topics: [],
    message: {
      topic: '',
    },
  }),
  computed: {
    reversedMessages() {
      return this.topics.slice().reverse();
    }
  },
  mounted() {
    fetch(API_URL).then((response) => response.json())
      .then((result) => {
        this.topics = result;
      });
  },
  methods: {
    addMessage() {
      console.log(this.message);
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json'
        }
      }).then((response) => response.json())
      .then((result) => {
        if (result.details){
          //there was an error
          const error = result.details.map(detail => detail.message).join(' ');
          this.error = error;
          console.log(error);
        } else {
          this.topics.push(result);
        }
        console.log(result);
      });
    },
  },
};
</script>
