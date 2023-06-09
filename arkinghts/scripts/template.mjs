export default {
  vueTemplate: (compoenntName) => {
    return `<template>
                <h1>${compoenntName}组件</h1>
            </template>

            <script>

            export default {
              name:'${compoenntName}',
                setup() {
                    return {
                    }
                }
            }
            </script>

            <style lang="scss" scoped>
            </style>
`;
  },
  entryTemplate: `import Main from './main.vue'export default Main`,
};
