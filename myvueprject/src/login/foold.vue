<template>
  <div class="foold">
    <div>
      <section>
        <img :src="data.list.bottom.leftImg.MIHOYO" alt="" />
      </section>
      <section></section>
      <section>
        <img :src="data.list.bottom.leftImg.LOGO" alt="" />
      </section>
    </div>

    <div>
      <section>
        <ul>
          <li
            v-for="(item, index) in data.list.bottom.aboutMeWebs"
            :key="index"
          >
            <span> {{ item.title }}</span>
            <span style="margin-left: 10px">|</span>
          </li>
        </ul>
      </section>

      <section>
        {{ data.list.bottom.words.Illegal1Text }}
        <p>{{ data.list.bottom.words.Illegal1Text }}</p>
        <p>{{ data.list.bottom.words.adviceInfo }}</p>
        <p>{{ data.list.bottom.words.banquan }}</p>
        <p>{{ data.list.bottom.words.fanzhaText }}</p>
        <p>{{ data.list.bottom.words.gongguan }}</p>
        <p>{{ data.list.bottom.words.gongguanwen }}</p>
        <p>{{ data.list.bottom.words.guanaiPhone }}</p>
      </section>

      <section>
        <ul>
          <li>
            <img
              src="http://8.134.179.237:8081/geshin/index/1689394951159.png"
              alt=""
            />
            <img
              src="http://8.134.179.237:8081/geshin/index/1689394985914.png"
              alt=""
            />
            <img
              src="http://8.134.179.237:8081/geshin/index/1689395010058.png"
              alt=""
            />
            <img
              src="http://8.134.179.237:8081/geshin/index/1689395035358.png"
              alt=""
            />
            <img
              src="http://8.134.179.237:8081/geshin/index/1689395097299.png"
              alt=""
            />
            <img
              src="http://8.134.179.237:8081/geshin/index/1689395137536.png"
              alt=""
            />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const data = defineProps(['list'])

console.log(data)
</script>

<style scoped lang="scss">
.foold {
  width: 100vw;
  height: 55vh;
  margin-top: 10vh;
  display: flex;
  background-color: rgb(0, 0, 0);
  > div:first-child {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    > section > img {
      width: 8vw;
    }

    > section:nth-child(2) {
      width: 1px;
      height: 7vh;
      margin-left: 2vw;
      border: 1px solid #ccc;
    }
  }
  > div:last-child {
    flex: 5;
    display: flex;
    flex-direction: column;
    > section:nth-child(1) {
      flex: 1;
      > ul {
        display: flex;

        > li {
          height: 10vh;
          margin-left: 1vw;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 13px;
        }
      }
    }
    > section:nth-child(2) {
      flex: 4;
      color: #ccc;
      font-size: 15px;

      > p {
        margin-top: 1vh;
      }
    }
    > section:nth-child(3) {
      flex: 2;
      margin-top: 2vh;
      > ul > li > img {
        margin-left: 1vw;
      }
    }
  }
}
</style>