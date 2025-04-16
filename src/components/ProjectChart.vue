<template>
    <a-card title="Project Hours Distribution">
       <div ref="chartRef" style="height: 300px;"></div>
    </a-card>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue';
  import * as echarts from 'echarts/core';
  import { BarChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
  } from 'echarts/components';
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  import { CanvasRenderer } from 'echarts/renderers';
  import { Card } from 'ant-design-vue';
  
  const ACard = Card;
  
  // Register the required components
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    CanvasRenderer,
    LabelLayout,
    UniversalTransition,
  ]);
  
  const props = defineProps({
    tickets: {
      type: Array,
      required: true,
    },
  });
  
  const chartRef = ref(null);
  let chartInstance = null;
  
  // Function to process ticket data for the chart
  const getChartData = (ticketsData) => {
    const projectHours = ticketsData.reduce((acc, ticket) => {
      acc[ticket.project] = (acc[ticket.project] || 0) + ticket.hours;
      return acc;
    }, {});
  
    return {
      projects: Object.keys(projectHours),
      hours: Object.values(projectHours),
    };
  };
  
  // Function to initialize or update the chart
  const updateChart = () => {
      if (!chartInstance) return;
  
      const { projects, hours } = getChartData(props.tickets);
  
      const option = {
          tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
          },
          grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
          },
          xAxis: [
          {
              type: 'category',
              data: projects, // Project names
              axisTick: {
              alignWithLabel: true
              }
          }
          ],
          yAxis: [
          {
              type: 'value',
              name: 'Total Hours'
          }
          ],
          series: [
          {
              name: 'Hours',
              type: 'bar',
              barWidth: '60%',
              data: hours // Cumulative hours
          }
          ]
      };
      chartInstance.setOption(option);
  };
  
  onMounted(() => {
    // Ensure the DOM element is ready before initializing
    nextTick(() => {
        if (chartRef.value) {
          chartInstance = echarts.init(chartRef.value);
          updateChart(); // Initial chart draw
           // Add resize listener
          window.addEventListener('resize', resizeChart);
        }
    });
  });
  
  // Watch for changes in the tickets data and update the chart
  watch(
    () => props.tickets,
    () => {
      updateChart();
    },
    { deep: true } // Watch for changes within the array elements
  );
  
  // Resize chart logic
  const resizeChart = () => {
      if (chartInstance) {
          chartInstance.resize();
      }
  };
  
  // Clean up on unmount
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart);
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }
  });
  
  </script>
  
  <style scoped>
  /* Optional: Add specific styles for the chart container if needed */
  </style>