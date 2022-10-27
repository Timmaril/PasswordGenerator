var password = document.getElementById('password')
var char = "0123456789qwertyuiopasdfghjklxcvbnm!#$%^&*()_+QWERTYUIOPASDFGHJKLZXCVBNM"
var passwordLength = 10
var password =""   

for (var i = 0; i<= passwordLength; i++) {
   var randomNumber = Math.floor(Math.random() * char.length)
   password += char.substring(randomNumber, randomNumber +1)
    
}
document.getElementById("password").value = password