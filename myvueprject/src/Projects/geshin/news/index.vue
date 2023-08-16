
    <template>
        <div>
          <h1>新闻界面</h1>
        </div>
    </template>

    <script setup lang="ts">
import { reactive } from "vue";
// import {Public} from "@/utils/require"
//  let  da = new Public
//  da.getDataObj("/api/geshin/public","get",{})


    const textcontent = reactive([
      {
        licontent:"最新"
      },
      {
        licontent:"新闻"
      },
      {
        licontent:"公告"
      },
      {
        licontent:"活动"
      }
    ])


    </script>
    
    <style scoped>
    
    </style>
