<template>
    <div class="messages-form">
        <div class="messages-list" id="messages-list">

            <MsgBlock v-for="message of messages" :key="message"
            v-bind:message="message"
            ></MsgBlock>

        </div>

        <div class="message-send">
            <form @submit.prevent="sendMessage()">
                <input type="text" placeholder="Введите ваше сообщение" id="message">
            </form>
        </div>
    </div>
</template>

<script>
import MsgBlock from "@/components/MsgBlock.vue"
import {headerHandler, sendRequest, method, server} from "@/server";

export default {
    components: {
        MsgBlock,
    },
    data(){
        return {
            messages:{}
        }
    },
    methods:{
        sendMessage(){
            let message = document.getElementById("message");
            const url = "send/";

            if (message == ""){
                alert("Введите сообщение");
            } else
            {
                let headers = {
                    content: btoa(unescape(encodeURIComponent(message.value))),
                    uuid: localStorage.getItem("uuid")
                };
                sendRequest(method, server + url, headers);

                var objDiv = document.getElementById("messages-list");
                objDiv.scrollTop = objDiv.scrollHeight;

                message.value = null;
            }
        },
    },
    beforeMount() {
        //Проверка на авторизацию (!Без проверки на истекшую сессию если uuid ключ присутствует, дописать)
        if (localStorage.getItem("uuid") != null){
            const headers = {
            uuid: localStorage.getItem("uuid"),
        };
        const url = "read/"
        
        //цикличный запрос на получение 15 последних сообщений
        setInterval(()=>{sendRequest(method, server + url, headers).then(
            data => {
                let headerMap = headerHandler(data);
                let valueStringHeaderMessages = JSON.parse(headerMap['messages']);
                this.messages = valueStringHeaderMessages["messages"];
                console.log(this.messages);
            })}, 1500);

        //Ожидание загрузки первых сообщений, пролистывает div вниз
        setTimeout(()=>{
            var objDiv = document.getElementById("messages-list");
            objDiv.scrollTop = objDiv.scrollHeight;
        }, 2000);
        } else {
            alert("Время сесси истекло, пожалуйста авторизируйтесь!")
        }
    },
}

</script>


<style>  
    .messages-form {
        width: 100vh;
    }

    .messages-list {
        margin: 50px;
        height: 75vh;
        overflow: hidden;
        Overflow-y: scroll;
    }

    .message-send {
        margin-left: 50px;
        margin-right: 50px;
    }

    .message-send input {
        width: 100%;
        height: 4vh;
        border-radius: 10px;
        background-color: rgb(255, 255, 255);
        font-family: 'Roboto', sans-serif;
        font-weight: 900;
        font-size: 24px;
    }
</style>