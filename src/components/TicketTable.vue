<template>
    <a-card title="Ticket List">
      <a-table :columns="columns" :data-source="tickets" :row-key="'id'" size="small">
        <template #bodyCell="{ column, record }">
           <template v-if="column.key === 'overtime'">
               <span>{{ record.overtime ? 'Yes' : 'No' }}</span>
           </template>
          <template v-if="column.key === 'action'">
            <a-button
              v-if="isAdmin"
              type="link"
              danger
              size="small"
              @click="onDelete(record.id)"
            >
              Delete
            </a-button>
             <span v-else>-</span>
          </template>
        </template>
      </a-table>
    </a-card>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import { Table, Button, Card, Popconfirm } from 'ant-design-vue';
  
  const ATable = Table;
  const AButton = Button;
  const ACard = Card;
  // const APopconfirm = Popconfirm; // Optional: Add confirmation before deleting
  
  const props = defineProps({
    tickets: {
      type: Array,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['delete-ticket']);
  
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Project', dataIndex: 'project', key: 'project' },
    { title: 'Overtime', dataIndex: 'overtime', key: 'overtime' },
    { title: 'Hours', dataIndex: 'hours', key: 'hours', sorter: (a, b) => a.hours - b.hours },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at', sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at) },
    { title: 'Action', key: 'action' },
  ];
  
  const onDelete = (ticketId) => {
    // Optional: Add a Popconfirm here for better UX
    emit('delete-ticket', ticketId);
  };
  </script>