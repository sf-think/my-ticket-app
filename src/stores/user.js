import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const role = ref(null); // 'admin', 'user', or null

  const isAuthenticated = computed(() => !!role.value);
  const isAdmin = computed(() => role.value === 'admin');

  function login(username) {
    // Simplified logic based on requirements
    if (username === 'admin') {
      role.value = 'admin';
    } else if (username) { // Any other non-empty username
      role.value = 'user';
    } else {
        role.value = null; // Handle potential empty input case
    }
    // In a real app, you'd handle password validation and fetch tokens here.
    // For this task, we directly set the role.
    return isAuthenticated.value; // Return true if login was successful
  }

  function logout() {
    role.value = null;
  }

  return { role, isAuthenticated, isAdmin, login, logout };
});