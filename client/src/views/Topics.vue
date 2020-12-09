<template>
  <div class="bg_content">
    <form @submit.prevent="addMessage">
      <div class="form-group">
        <label for="topic">Topic</label>
        <input v-model="message.topic" type="text" class="form-control"
        id="topic" placeholder="Enter topic" required>
      <button type="submit" class="ruoskButton">Create Topic</button>
      </div>
    </form>
    <div>
      <ul class="list-unstyled">
        <li class="media" v-for="message in reversedMessages" :key="message._id">
          <div class="media-body">
            <small>{{message.created}}</small>
            <button class="mt-0 mb-1 ruoskButton" @click="openTopic(message.topic)">{{message.topic}}</button>
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
    error: '',
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
    openTopic(element){
      console.log(element);
      window.location.href = `/filter?tid=${element}`;
    }
  },
};
</script>
