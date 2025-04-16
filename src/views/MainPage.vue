<template>
    <a-layout class="layout-container">
       <a-layout-header style="background: #fff; padding: 0 16px; display: flex; justify-content: space-between; align-items: center;">
           <h2>Ticket Management</h2>
           <a-button type="link" @click="handleLogout">Logout ({{ userStore.role }})</a-button>
       </a-layout-header>
       <a-layout-content style="padding: 24px;">
          <a-row :gutter="[16, 16]">
              <a-col :xs="24" :sm="24" :md="12" :lg="14" :xl="14"> 
                  <TicketTable
                    :tickets="tickets"
                    :is-admin="userStore.isAdmin"
                    @delete-ticket="handleDeleteTicket"
                  />
              </a-col>
              <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
                  <ProjectChart :tickets="tickets" />
              </a-col>
          </a-row>
       </a-layout-content>
    </a-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  import TicketTable from '@/components/TicketTable.vue';
  import ProjectChart from '@/components/ProjectChart.vue';
  import { Layout, Row, Col, Button } from 'ant-design-vue';
  
  const ALayout = Layout;
  const ALayoutHeader = Layout.Header;
  const ALayoutContent = Layout.Content;
  const ARow = Row;
  const ACol = Col;
  const AButton = Button;
  
  const userStore = useUserStore();
  const router = useRouter();
  
  // Initial mock data (保持不变)
  const initialTickets = [
    { id: "001", project: "Road Project A", overtime: true, hours: 3.5, created_at: "2024-04-10 10:30" },
    { id: "002", project: "Bridge Maintenance B", overtime: false, hours: 2, created_at: "2024-04-09 13:00" },
    { id: "003", project: "Pipeline Fix C", overtime: true, hours: 4.5, created_at: "2024-04-08 08:00" },
    { id: "004", project: "Tunnel Cleaning D", overtime: false, hours: 3, created_at: "2024-04-07 16:45" }
  ];
  
  const tickets = ref([...initialTickets]);
  
  const handleDeleteTicket = (ticketId) => {
    tickets.value = tickets.value.filter(ticket => ticket.id !== ticketId);
  };
  
  const handleLogout = () => {
      userStore.logout();
      router.push('/login');
  }
  
  </script>
  
  <style scoped>
  .layout-container {
      min-height: 100vh;
  }
  </style>