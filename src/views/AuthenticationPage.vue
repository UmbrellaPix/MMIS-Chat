<template>
  <div class="container">
    <div class="screen">
      <div class="screen__content">
        <form class="login" @submit.prevent="auth_member({url})">

          <div class="login__field">
            <i class="login__icon fas fa-user"></i>
            <input type="text" class="login__input" id="login" placeholder="Логин">
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input type="password" class="login__input" id="password" placeholder="Пароль">
          </div>
          <div v-if="url == 'registration/'" class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input type="text" class="login__input" id="firstName" placeholder="Имя">
          </div>
          <div v-if="url == 'registration/'" class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input type="text" class="login__input" id="lastName" placeholder="Фамилия">
          </div>
          <div v-if="url == 'registration/'" class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input type="text" class="login__input" id="age" placeholder="Возраст">
          </div>

          <button class="button login__submit">
            <span class="button__text">{{ buttonText }}</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </button>				
        </form>
        <div class="social-login">
          <h3>MMIS LAB</h3>
        </div>
      </div>
      <div class="screen__background">
        <span class="screen__background__shape screen__background__shape4"></span>
        <span class="screen__background__shape screen__background__shape3"></span>		
        <span class="screen__background__shape screen__background__shape2"></span>
        <span class="screen__background__shape screen__background__shape1"></span>
      </div>		
    </div>
  </div>
</template>

<script>
import {server} from "@/server";
import {method} from "@/server";
import {sendRequest} from "@/server";
import {headerHandler} from "@/server";

export default {
  props:{
	buttonText:{
		type: String,
		required: true
	},
	url:{
		type: String,
		required: true
	}
  },

  name: 'AuthenticationPage',

  methods: {
	auth_member: (url)=> {
		if (validationRegForm(url.url)){
			let headers = {
				login:btoa(unescape(encodeURIComponent(document.getElementById('login').value))),
				password:btoa(unescape(encodeURIComponent(document.getElementById('password').value)))
			}
			
			//Формирование и отправка запросов в зависимости от формы reg/auth
			switch(url.url){
				case "authorization/": 
					sendRequest(method, server + url.url, headers)
					.then(data => {
						let headerMap = headerHandler(data); //парсинг заголовков из response в удобочитаемый вид
						localStorage.setItem("uuid", headerMap["uuid"]);
						localStorage.setItem("member_id", headerMap["member_id"]);
						alert("Вы успешно авторизированны");
						window.location.reload();
						window.location.replace("mess/");
					})
					.catch(()=>{alert("Неправильная пара логин-пароль")})
					break;

				case "registration/":
					headers.firstName = btoa(unescape(encodeURIComponent(document.getElementById('firstName').value)));
					headers.lastName = btoa(unescape(encodeURIComponent(document.getElementById('lastName').value)));
					headers.age = document.getElementById('age').value;
					sendRequest(method, server + url.url, headers)
						.then(() => {alert("Аккаунт успешно создан!")})
						.catch(()=>{alert("Такой аккаунт уже существует.")});
					break;
			}
		}
	}
  }
}

//Проверка парсинга строки в число, принимает только тип string
function isNumeric(str) {
  if (typeof str != "string") return false 
  return !isNaN(str) &&
         !isNaN(parseFloat(str))
}

//Валидация форм регистрации и авторизации, возвращает false или true (плохой код)
function validationRegForm(url){
	if (
		document.getElementById('login').value == "" ||
		document.getElementById('password').value == ""
	){
		alert("Заполнены не все поля.");
		return false;
	} else if(url == "registration/"){
		if (
			document.getElementById('firstName').value == "" ||
			document.getElementById('lastName').value == "" ||
			isNumeric(document.getElementById('age').value) == false
		){
			alert("Заполнены не все поля или поле 'Возраст' заполнено не верно.");
			return false;
		}
		else {
			return true;
		}
	}
	return true;
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');

body {
	background: linear-gradient(90deg, #C7C5F4, #776BCC);		
}

.container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
  padding-left: 25%;
}

.screen {		
	background: linear-gradient(90deg, #5D54A4, #7C78B8);		
	position: relative;	
	height: 600px;
	width: 360px;	
	box-shadow: 0px 0px 24px #5C5696;
}

.screen__content {
	z-index: 1;
	position: relative;	
	height: 100%;
}

.screen__background {		
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	-webkit-clip-path: inset(0 0 0 0);
	clip-path: inset(0 0 0 0);	
}

.screen__background__shape {
	transform: rotate(45deg);
	position: absolute;
}

.screen__background__shape1 {
	height: 520px;
	width: 520px;
	background: #FFF;	
	top: -50px;
	right: 120px;	
	border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
	height: 220px;
	width: 220px;
	background: #6C63AC;	
	top: -172px;
	right: 0;	
	border-radius: 32px;
}

.screen__background__shape3 {
	height: 540px;
	width: 190px;
	background: linear-gradient(270deg, #5D54A4, #6A679E);
	top: -24px;
	right: 0;	
	border-radius: 32px;
}

.screen__background__shape4 {
	height: 400px;
	width: 200px;
	background: #7E7BB9;	
	top: 420px;
	right: 50px;	
	border-radius: 60px;
}

.login {
	width: 320px;
	padding: 30px;
	padding-top: 50px;
}

.login__field {
	padding: 20px 0px;	
	position: relative;	
}

.login__icon {
	position: absolute;
	top: 30px;
	color: #7875B5;
}

.login__input {
	border: none;
	border-bottom: 2px solid #D1D1D4;
	background: none;
	padding: 10px;
	padding-left: 24px;
	font-weight: 700;
	width: 75%;
	transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
	outline: none;
	border-bottom-color: #6A679E;
}

.login__submit {
	background: #fff;
	font-size: 14px;
	margin-top: 30px;
	padding: 16px 20px;
	border-radius: 26px;
	border: 1px solid #D4D3E8;
	text-transform: uppercase;
	font-weight: 700;
	display: flex;
	align-items: center;
	width: 100%;
	color: #4C489D;
	box-shadow: 0px 2px 2px #5C5696;
	cursor: pointer;
	transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
	border-color: #6A679E;
	outline: none;
}

.button__icon {
	font-size: 24px;
	margin-left: auto;
	color: #7875B5;
}

.social-login {	
	position: absolute;
	height: 140px;
	width: 160px;
	text-align: center;
	bottom: 0px;
	right: 0px;
	color: #fff;
}

.social-icons {
	display: flex;
	align-items: center;
	justify-content: center;
}

.social-login__icon {
	padding: 20px 10px;
	color: #fff;
	text-decoration: none;	
	text-shadow: 0px 0px 8px #7875B5;
}

.social-login__icon:hover {
	transform: scale(1.5);	
}
</style>
