//Dom elements
const resultElement = document.getElementById('passwordDisplay')
const lengthElement = document.getElementById('characterAmountNumber')
const uppercaseElement = document.getElementById('includeUppercase')
const numbersElement = document.getElementById('includeNumbers')
const symbolsElement = document.getElementById('includeSymbols')
const generateElement = document.getElementById('button')
const rangeElement = document.getElementById('characterAmountRange')
const form = document.getElementById('passwordGeneratorForm')
const copyClipboard = document.getElementById('clipboard')

const randomFunc = {
   upper: getRandomUpper,
   number: getRandomNumber,
   symbol: getRandomSymbol
}
//event liste
form.addEventListener('submit', (e)=>{
   e.preventDefault()
})
characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)

generateElement.addEventListener('click', ()=>{
   const length = lengthElement.value
   // console.log(length)
   const hasUpper = uppercaseElement.checked
   const hasNumber = numbersElement.checked
   const hasSymbols = symbolsElement.checked

   resultElement.innerText = generatePassword(
      hasUpper,
      hasNumber, 
      hasSymbols, 
      length)

})
copyClipboard.addEventListener('click',()=>{
   const textarea = document.createElement('textarea')
   const password = resultElement.innerText

   if(!password){
      return
   }

   textarea.value = password
   document.body.appendChild(textarea)
   textarea.select()
   document.execCommand('copy')
   textarea.remove()
   alert('password has been copied to clipboard!')
})
//Generate password function
function generatePassword(upper,lower,number,symbol, length){
  
   let genaratedPassword = ''

   const typesCount = upper + lower + number + symbol
   // console.log('typesCount:', typesCount)
   const typesArr = [{upper},{lower},{symbol},{number}].filter
   (item => Object.values(item)[0])
   // console.log('typesArr:',typesArr)

   if(typesCount === 0){
      return ''
   }
   // if(typesCount != upper){
   //    getRandomLower()
   // }
   if(typesCount === upper){
      getRandomUpper()
   }
   if(typesCount === lower){
      getRandomLower()
   }

   for(let i =0; i< length; i+= typesCount){
      typesArr.forEach(type => {
         const funcName = Object.keys(type)[0]

         genaratedPassword += randomFunc[funcName]()
      })
   }
   const finalPassword = genaratedPassword.slice(0, length)
   return finalPassword
}



//Generator functions
 function getRandomLower(){
   return String.fromCharCode(Math.floor(Math.random() * 26)+ 97)
 }

 function getRandomUpper(){
   return String.fromCharCode(Math.floor(Math.random()*26) +65)
 }
 function getRandomNumber(){
   return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
 }

 function getRandomSymbol(){
   const symbols ='!@#$%^&*(){}><,.'
   return symbols[Math.floor(Math.random()* symbols.length)]
 }



 function syncCharacterAmount(e){
   const value = e.target.value
   lengthElement.value = value
   rangeElement.value = value
}