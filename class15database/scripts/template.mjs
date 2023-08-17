export default {
  vueTemplate: inputName => {
    return `
    
    <template>
        <div>
          <h1>${inputName}</h1>
        </div>
    </template>

    <script setup lang="ts">

    </script>

    
    <style scoped>
    
    </style>
`;
  },
  entryTemplate: `import Main from './main.vue'export default Main`,
};
