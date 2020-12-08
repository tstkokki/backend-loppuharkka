<template>
    <div class="bg_content">
        <h2>TOPICS</h2>
        <ul class="list-unstyled hori_list">
        <li class="media" v-for="topic in topics" :key="topic._id">
          <div class="media-body">
            <h3 class="mt-0 mb-1">{{topic.topic}}</h3>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
const API_URL = 'http://localhost:3000/messages/:topics';

export default {
  name: 'Topic',
  data: () => ({
    topics: [],
    topic: {
      topic: '',
    },
  }),
  mounted() {
    fetch(API_URL).then((response) => response.json())
      .then((result) => {
        this.topics = result;
      });
  },
//   methods: {
//     addMessage() {
//       console.log(this.message);
//       fetch(API_URL, {
//         method: 'POST',
//         body: JSON.stringify(this.message),
//         headers: {
//           'content-type': 'application/json'
//         }
//       }).then((response) => response.json())
//       .then((result) => {
//         if (result.details){
//           //there was an error
//           const error = result.details.map(detail => detail.message).join(' ');
//           this.error = error;
//           console.log(error);
//         } else {
//           this.error = '';
//           this.showMessageForm = false;
//           this.messages.push(result);
//         }
//         console.log(result);
//       });
//     },
//   },
};
</script>
