<template>


  <div class="background">
    <!-- <div class="nav">
      <span>欢迎使用武小理医疗智能QA系统！</span>
    </div> -->
    

    <div class="menu">

      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="rgb(67, 142, 219)"
        text-color="#fff"
        active-text-color="#ffd04b"
        >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-menu-item index="2" @click="openInstructions">使用说明</el-menu-item>
        <el-menu-item index="3" @click="openContactUs">联系我们</el-menu-item>
      </el-menu>
    </div>

    <div class="nav">
      <span>欢迎使用武小理医疗智能QA系统！</span>
    </div>

    <div class="talk" v-show="flag">
        <div class="talk-header">
          <div class="talk-header-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gengduocaozuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="exit">
              <use xlink:href="#icon-guanbi"></use>
            </svg>
          </div>
        </div>

        <div class="talk-content">
          <div style="width:100%;height:20px;"></div>
          <div style="display: flex">
          <div class="url-left">
                <el-avatar shape="circle" :size="30" :src="require('@/assets/wuxiaoli.png')"></el-avatar>
              </div>
              <div class="name_left">
                <p style="font-size: 1px">武小理</p>
              </div>
          </div>
            <div class="content_left">您好，欢迎使用武小理健康智能问答Bot！请在聊天框中输入您想咨询的健康问题，武小理收到后马上回复！
            </div>

          <div v-for="item in contentDiv" style="margin-top: 20px">
            <!-- 时间 -->
            <div style="text-align: center">
              <p style="font-size: 1px; color: #9b9b9b">{{ item.time }}</p>
            </div>
            <!-- 用户、QA的名字、头像 -->
            <div style="display: flex">
              <div class="url_right" v-if="item.show">
                <el-avatar shape="circle" :size="30" :src="item.url"></el-avatar>
              </div>
              <div class="name_right" v-if="item.show">
                <p style="font-size: 1px">{{ item.name }}</p>
              </div>
              <div class="url-left" v-if="!item.show">
                <el-avatar shape="circle" :size="30" :src="item.url"></el-avatar>
              </div>
              <div class="name_left" v-if="!item.show">
                <p style="font-size: 1px">{{ item.name }}</p>
              </div>
            </div>

            <div v-html="item.content" class="content_left" v-if="!item.show"></div>

            <div v-html="item.content" class="content_right" v-if="item.show"></div>
          </div>
        </div>

        <div class="talk-message">
          <div class="talk-message-face">
            <!-- <svg class="icon" aria-hidden="true" @click="isShow">
              <use xlink:href="#icon-biaoqing"></use>
            </svg> -->
            <!-- <emotion
              :emotionIsShow="emotionIsShow"
              @sendEmotionSelect="getValue"
            ></emotion> -->
          </div>
          <div class="talk-message-content">
            <el-input
              v-model="textarea"
              resize="none"
              type="textarea"
              rows="6"
              @keyup.enter.native="submit"
            ></el-input>
          </div>
          <div class="talk-message-send">
            <el-button type="primary" @click="submit">
              发送
            </el-button>
          </div>
        </div>
      </div>
  </div>
   
</template>

<script>
import emotion from "../components/emotion.vue";
import "../assets/talk.css";
import "../utils/iconfont";
import axios from "axios";
import { format } from "../utils/datetime";
export default {
  components: {
    emotion,
  },

  data() {
    return {
      contentDiv: [],
      textarea: "",
      textarea1: "",
      a: [],
      flag: true,
      show: false,
      closeChat: this.close,
    };
  },
  created() {},
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    openInstructions() {
        this.$alert('请在聊天框中输入您想咨询的问题，点击发送即可！', '使用说明', {
          confirmButtonText: '我已知晓',
          // callback: action => {
          //   this.$message({
          //     type: 'info',
          //     message: ''
          //   });
          // }
        });
    },
    openContactUs() {
        this.$alert('如有使用问题或建议，请发送邮件至adizeroyu@163.com，欢迎您的联络！', '联系我们', {
          confirmButtonText: '我已知晓',
          // callback: action => {
          //   this.$message({
          //     type: 'info',
          //     message: ''
          //   });
          // }
        });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        let box = this.$el.querySelector(".talk-content");
        box.scrollTop = box.scrollHeight;
      });
    },
    sendInfo() {
      alert("aaa");
    },
    isShow() {
      if (this.emotionIsShow === false) {
        this.emotionIsShow = true;
      } else {
        this.emotionIsShow = false;
      }
      // this.emotionIsShow = !this.emotionIsShow;
    },
    iptFocus() {
      this.emotionIsShow = true;
    },
    getValue(val, item) {
      let img =
        '<img src="' +
        this.url +
        val +
        '.png"  style= "width: 22px;height: 22px">';
      let el = "[" + item + "]";
      this.emotionIsShow = false;
      this.textarea = this.textarea + el;
      this.textarea1 += img;
    },
    submit() {
      let a = this.textarea;
      let pre = 0;
      let last = 0;
      let flag = false;
      while (true) {
        if (!a.match("]")) {
          break;
        }
        pre = a.indexOf("[");
        last = a.indexOf("]");

        let face = a.substring(pre + 1, last);
        let b;
        for (let j = 0; j < this.eList.length; j++) {
          if (face == this.eList[j]) {
            b = j;
            break;
          }
        }
        let img =
          '<img src="' +
          this.url +
          b +
          '.png"  style= "width: 22px;height: 22px">';
        a = a.substring(0, pre) + img + a.substring(last + 1, a.length);
        pre = 0;
        last = 0;
        flag = false;
      }
      let c = {
        name: "用户",
        url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
        content: a,
        show: true,
        time: "",
      };
      c.time = format();
      this.contentDiv.push(c);
      let d = {
        name: "武小理",
        url: "https://img0.baidu.com/it/u=1741172190,3962404342&fm=26&fmt=auto&gp=0.jpg",
        content: "",
        show: false,
        time: "2021-7-12 17:12:46",
      };
      let formData = new FormData();
      formData.append("question", this.textarea);
      axios.post("api/chat", formData).then(({ data: res }) => {
        d.content = res.ans;
        d.time = format();
        this.contentDiv.push(d);
      });

      this.textarea = "";
      this.textarea1 = "";
    },

    exit() {
      this.$emit("close", this.fleg);
    },
  },
};
</script>

