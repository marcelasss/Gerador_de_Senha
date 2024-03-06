function getChartTypes(){
    const uppercase = document.querySelector('#include-uppercase').checked;
    const lowercase = document.querySelector('#include-lowercase').checked;
    const number = document.querySelector('#include-number').checked;
    const characters = document.querySelector('#include-characters').checked;

    const charTypes = [];

    if (uppercase){
        charTypes.push('ABCDEFGHIJLMNOPQRSTUVWXYZ')
    }
     if (lowercase){
        charTypes.push('abcdefghijlmnopqrstuvwxyz')
     }

     if (number) {
        charTypes.push('0123456789')
     }

     if (characters) {
        charTypes.push('@#$%&*+!?></')
     }

    return charTypes;
}

function getPasswordSize(){
    const size = document.querySelector('#size').value;
    if (isNaN(size) || size < 4 || size > 128){
      
     message('Tamanho inválido, digite um número entre 4 e 128!','warning')
    }  

    return size;
}

function randomCharTypes(charTypes){
    const randomIndex = Math.floor( Math.random() * charTypes.length);
    
    return charTypes [randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

function generatePassword(size,charTypes ){
    let passwordGenerate = '';

    while (passwordGenerate.length < size){
        passwordGenerate += randomCharTypes(charTypes)
    }

    return passwordGenerate;
}

function message(text, status = 'success'){
    Toastify({
        text: text,
        duration: 3000,
        style: {
            background: status === 'success' ? '#8fb339' : '#dc2626',
            boxShadow: 'none'
         }

    }).showToast();
}

document.querySelector('#generator').addEventListener('click', function (){
   const size= getPasswordSize();
   const charTypes = getChartTypes();

   if(!size) {
    return;
   }

   if(!charTypes.length){
    message('Selecione pelo menos algum tipo de caractere!', 'warning');
    return;
   }
   
   const passwordGenerate = generatePassword( size, charTypes);

   document.querySelector('#password-container').classList.add('show')
   document.querySelector('#password').textContent = passwordGenerate;
})

document.querySelector('#copy').addEventListener('click', function(){
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Senha copiada com sucesso!', 'success')
})
