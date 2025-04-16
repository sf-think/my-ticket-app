<template>
    <div class="login-container">
      <a-card title="Login" style="width: 350px;">
        <a-form :model="formState" @finish="handleLogin" layout="vertical">
          <a-form-item
            label="Username"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>
  
          <a-form-item
            label="Password"
            name="password"
             :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>
  
           <a-form-item v-if="loginError">
               <a-alert type="error" :message="loginError" banner />
           </a-form-item>
  
          <a-form-item>
            <a-button type="primary" html-type="submit" block :loading="loading">
              Log in
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  import { Form, Input, Button, Card, Alert } from 'ant-design-vue';
  
  const AForm = Form;
  const AFormItem = Form.Item;
  const AInput = Input;
  const AInputPassword = Input.Password;
  const AButton = Button;
  const ACard = Card;
  const AAlert = Alert;
  
  const router = useRouter();
  const userStore = useUserStore();
  
  const formState = reactive({
    username: '',
    password: '', // Required by form, but value isn't checked per requirements
  });
  
  const loading = ref(false);
  const loginError = ref('');
  
  const handleLogin = async () => {
    loading.value = true;
    loginError.value = ''; // Clear previous errors
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
  
      const success = userStore.login(formState.username);
  
      if (success) {
        router.push('/'); // Navigate to main page on successful login
      } else {
        // Although the requirement doesn't specify failure for non-admin,
        // good practice is to handle potential issues (e.g., empty username)
         loginError.value = 'Login failed. Please check your username.';
         // Clear password field on failure
         formState.password = '';
      }
    } catch (error) {
      console.error("Login error:", error);
      loginError.value = 'An unexpected error occurred.';
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
  }
  </style>