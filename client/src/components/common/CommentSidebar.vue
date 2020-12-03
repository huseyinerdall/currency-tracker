<template>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="$store.getters.commentDrawer"
        permanent
        fixed
        right
        mini-variant-width="0"
        width="425"
    >
      <v-main
      class="pa-0 fill-height">
        <div class="chat">
          <div class="chat-container">
            <div class="conversation">
              <div class="conversation-container">
                <div style="height: 40px;">
                  <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="transparent"
                      width="30"
                      height="30"
                      style="position:absolute;right:6px;top:6px;"
                      @click.stop="$store.commit('commentDrawer');"
                  >
                    <v-icon color="red">
                      mdi-close
                    </v-icon>
                  </v-btn>
                </div>
                <h3 v-if="data.length == 0" class="text-center">İlk yorumu siz yapın.</h3>
                <div v-for="comment in data" :key="comment.id" class="message received" >
                  <div class="user-info d-flex flex">
                    <v-avatar v-if="comment.profileImage" :src="comment.profileImage" size="36"></v-avatar>
                    <v-avatar v-else color="indigo" size="36" class="white--text">{{comment.fullName | nameAvatar}}</v-avatar>
                    <h4 class="ml-4" style="line-height:36px;">{{comment.fullName}}</h4>
                  </div>
                  {{comment.comment}}
                  <span class="metadata"><span class="time">{{comment.createdAt}}</span></span>
                </div>
                <!--<div class="message sent">
                  What happened last night?
                  <span class="metadata">
                      <span class="time"></span><span class="tick"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg></span>
                  </span>
                </div>-->

              </div>
            </div>
          </div>
        </div>
      </v-main>
      <v-footer
        class="pa-0"
        style="position:absolute;bottom:0;width:425px;max-width:100%;">
        <form class="conversation-compose">
          <div class="emoji">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="smiley" x="3147" y="3209"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z" fill="#7d8489"/></svg>
          </div>
          <input
              v-model="message"
              class="input-msg disabled" name="input" placeholder="Yorumunuzu yazın..." autocomplete="off" autofocus />
          <button class="send" @click.prevent="sendComment">
            <div class="circle">
              <v-icon>mdi-send</v-icon>
            </div>
          </button>
        </form>
      </v-footer>
    </v-navigation-drawer>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                drawer: true,
                message: '',
                data: [],
            }
        },
        methods: {
            sendComment: function() {
                let userInfo = JSON.parse(localStorage.getItem('user'));
                let fullName = userInfo["fullName"];
                if (this.message == '') return;
                axios.post(`http://${this.$store.state.addr}:${this.$store.state.port}/sendcomment`, {
                        message: this.message,
                        fullName: fullName,
                        subject: this.$route.params.coin,
                    })
                    .then(response => {
                        console.log(response)
                        this.message = '';
                        this.data.push(response.data);
                    })
            },
            getComments: function() {
                axios.post(`http://${this.$store.state.addr}:${this.$store.state.port}/getcomments`, {
                        subject: this.$route.params.coin,
                    })
                    .then(response => {
                        this.data = response.data;
                    })
            }
        },
        created() {
            this.getComments();
        },
    }
</script>

<style scoped lang="scss">
    .marvel-device .screen {
        text-align: left;
    }
    
    .screen-container {
        height: 100%;
    }
    /* Chat */
    
    .chat * {
        user-select: none;
    }
    
    .chat {
        height: 100%;
    }
    
    .chat-container {
        height: 100%;
    }
    /* Conversation */
    
    .conversation {
        height: calc(100% - 50px);
        position: relative;
        background: rgba(0, 0, 0, .3);
        z-index: 0;
        overflow-y: hidden;
    }
    
    .conversation ::-webkit-scrollbar {
        transition: all .5s;
        width: 5px;
        height: 1px;
        z-index: 10;
    }
    
    .conversation ::-webkit-scrollbar-track {
        background: transparent;
    }
    
    .conversation ::-webkit-scrollbar-thumb {
        background: #b3ada7;
    }
    
    .conversation .conversation-container {
        height: 100%;
        box-shadow: inset 0 10px 10px -10px #000000;
        overflow-x: hidden;
        padding: 0 16px;
        margin-bottom: 5px;
    }
    
    .conversation .conversation-container:after {
        content: "";
        display: table;
        clear: both;
    }
    /* Messages */
    
    .message {
        color: #000;
        clear: both;
        line-height: 18px;
        font-size: 15px;
        padding: 8px;
        position: relative;
        margin: 8px 0;
        word-wrap: break-word;
        z-index: -1;
    }
    
    .message:after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
    }
    
    .metadata {
        display: inline-block;
        float: right;
        padding: 0 0 0 7px;
        position: relative;
        bottom: -4px;
    }
    
    .metadata .time {
        color: rgba(0, 0, 0, .45);
        font-size: 11px;
        display: inline-block;
    }
    
    .metadata .tick {
        display: inline-block;
        margin-left: 2px;
        position: relative;
        top: 4px;
        height: 16px;
        width: 16px;
    }
    
    .metadata .tick svg {
        position: absolute;
        transition: .5s ease-in-out;
    }
    
    .metadata .tick svg:first-child {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: perspective(800px) rotateY(180deg);
        transform: perspective(800px) rotateY(180deg);
    }
    
    .metadata .tick svg:last-child {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: perspective(800px) rotateY(0deg);
        transform: perspective(800px) rotateY(0deg);
    }
    
    .metadata .tick-animation svg:first-child {
        -webkit-transform: perspective(800px) rotateY(0);
        transform: perspective(800px) rotateY(0);
    }
    
    .metadata .tick-animation svg:last-child {
        -webkit-transform: perspective(800px) rotateY(-179.9deg);
        transform: perspective(800px) rotateY(-179.9deg);
    }
    
    .message:first-child {
        margin: 16px 0 8px;
    }
    
    .message.received {
        background: #fff;
        border-radius: 0px 5px 5px 5px;
        float: left;
    }
    
    .message.received .metadata {
        padding: 0 0 0 16px;
    }
    
    .message.received:after {
        border-width: 0px 10px 10px 0;
        border-color: transparent #fff transparent transparent;
        top: 0;
        left: -10px;
    }
    
    .message.sent {
        background: #e1ffc7;
        border-radius: 5px 0px 5px 5px;
        float: right;
    }
    
    .message.sent:after {
        border-width: 0px 0 10px 10px;
        border-color: transparent transparent transparent #e1ffc7;
        top: 0;
        right: -10px;
    }
    /* Compose */
    
    .conversation-compose {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        overflow: hidden;
        height: 50px;
        width: 100%;
        z-index: 2;
        border-radius: 0 40px 40px 0;
        border: 1px solid rgba(0, 0, 0, .2);
    }
    
    .conversation-compose div,
    .conversation-compose input {
        background: #fff;
        height: 100%;
    }
    
    .conversation-compose .emoji {
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 5px 0 0 5px;
        flex: 0 0 auto;
        margin-left: 4px;
        width: 36px;
    }
    
    .conversation-compose .input-msg {
        border: 0;
        flex: 1 1 auto;
        font-size: 16px;
        margin: 0;
        outline: none;
        min-width: 50px;
    }
    
    .conversation-compose .send {
        background: transparent;
        border: 0;
        cursor: pointer;
        flex: 0 0 auto;
        margin-left: 8px;
        padding: 0;
        position: relative;
        outline: none;
    }
    
    .conversation-compose .send .circle {
        background: #008a7c;
        border-radius: 50%;
        color: #fff;
        position: relative;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .conversation-compose .send .circle i {
        font-size: 24px;
        margin-left: 5px;
    }
    /* Small Screens */
    
    @media (max-width: 768px) {
        .marvel-device.nexus5 {
            border-radius: 0;
            flex: none;
            padding: 0;
            max-width: none;
            overflow: hidden;
            height: 100%;
            width: 100%;
        }
        .marvel-device>.screen .chat {
            visibility: visible;
        }
        .marvel-device {
            visibility: hidden;
        }
        .marvel-device .status-bar {
            display: none;
        }
        .screen-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .conversation {
            height: calc(100vh - 50px);
        }
        .conversation .conversation-container {
            height: calc(100vh - 120px);
        }
    }
    
    .theme--light.v-input input,
    .theme--light.v-input textarea,
    .theme--light.v-select .v-select__selection--comma {
        color: black !important;
    }
</style>