<template>
<div class="bg_content">
  <div>
    <form @submit.prevent="doLogin">
      <div v-if="error">
        <h4>Error!</h4>
        <p>{{error}}</p>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="session_user.username" type="text" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="message">Password</label>
        <input v-model="session_user.message" class="form-control" type="password" id="password" required>
      </div>
      <button type="submit" class="ruoskButton">Login</button>
    </form>
  </div>
</div>
</template>

<script>

const API_login_URL = 'http://localhost:3000/messages/login';

export default {
    name: 'Login',
    data: () => ({
        error: '',
        session_user: {
            username: '',
            message: '',
        },
    }),
    methods: {
        doLogin() {
            fetch(API_login_URL, {
                method: 'POST',
                body: JSON.stringify(this.session_user),
                headers: {
                    'content-type': 'application/json'
                }
            }).then((response) => response.json())
            .then((result) => {
                console.log(result);
            });
        }
    }
};
</script>
