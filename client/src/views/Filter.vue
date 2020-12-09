<template>
<div class="bg_content">
  <div>
  <button @click="showMessageForm = !showMessageForm" type="button" class="ruoskButton">Toggle Message Form</button>
    <form v-if="showMessageForm" @submit.prevent="addMessage">
      <div v-if="error">
        <h4>Error!</h4>
        <p>{{error}}</p>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="message.username" type="text" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="topic">Topic</label>
        <select v-model="message.topic" type="text" class="form-control"
        id="topic" placeholder="Enter topic" required>
          <option v-for="topic in topics" :key="topic._id">{{topic.topic}}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="message.message" class="form-control" id="message" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Image</label>
        <input v-model="message.imageURL" type="url" class="form-control"
        id="imageURL" placeholder="Enter image url" required>
      </div>
      <button type="submit" class="ruoskButton">Add Message</button>
    </form>
  </div>
    <div>
      <ul class="list-unstyled">
        <li class="media" v-for="message in reversedMessages" :key="message._id">
          <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.topic">
          <div class="media-body">
            <small>{{message.created}}</small>
            <h4 class="mt-0 mb-1">{{message.username}}</h4>
            <h5 class="mt-0 mb-1">{{message.topic}}</h5>
            <p>{{message.message}}</p>
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

const API_URL = 'http://localhost:3000/messages/:filter';

export default {
  name: 'T_Filter',
  data: () => ({
    showMessageForm: false,
    error: '',
    messages: [],
    message: {
      username: 'Anon',
      topic: '',
      message: '',
      imageURL: '',
    },
    topics: [],
    topic: {
      topic: ''
    },
  }),
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    }
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
          this.error = '';
          this.showMessageForm = false;
          this.messages.push(result);
        }
        console.log(result);
      });
    },
  },
};
</script>
