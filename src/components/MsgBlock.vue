<template>
    <div class="reversed" v-if="member_id === String(message.member.id)">
        <img src="../assets/user.png">
        <div class="msg-content">
            <div class="msg-content-author">{{ convertFromBase64(message.member.firstName) }}{{ convertFromBase64(message.member.lastName) }}</div>
            <div class="msg-content-text">{{ convertFromBase64(message.content) }}</div>
        </div>
    </div>
    <div class="msg-block" v-else>
        <img src="../assets/user.png">
        <div class="msg-content">
            <div class="msg-content-author">{{ convertFromBase64(message.member.firstName) }} {{ convertFromBase64(message.member.lastName) }}</div>
            <div class="msg-content-text">{{ convertFromBase64(message.content) }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            member_id: localStorage.getItem("member_id"),
        }
    },
    props:{
        message: {
            type: Object,
            required: true,
        }
    },
    methods: {
        convertFromBase64(message){
            try{
                return decodeURIComponent(escape(window.atob(message)));
            } catch {
                return message;
            }
        },
    }
}
</script>

<style>
.msg-block {
    display: flex;
    font-family: 'Roboto', sans-serif;    font-weight: 900;
    font-size: 24px;
    background-color: #dac4dd;
    border-radius: 100px;
    padding-left: 20px;
    margin-bottom: 10px;
    opacity: 0.9;
}

.reversed {
    display: flex;
    font-family: 'Roboto', sans-serif;    font-weight: 900;
    font-size: 24px;
    background-color: #c4d171;
    border-radius: 100px;
    padding-left: 20px;
    margin-bottom: 10px;
    opacity: 0.9;
    flex-direction: row-reverse;
}

.msg-content-author {
    color:rgb(0, 0, 0);
    font-family: 'Rampart One', cursive;
}

.msg-content-text {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
}

img {
    max-width: 100px;
    max-height: 100px;
}
</style>