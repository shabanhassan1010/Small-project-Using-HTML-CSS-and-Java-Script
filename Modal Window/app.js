'use strict';

const show_All_Model = document.querySelectorAll('.show-Model');
const hidden = document.querySelector('.hidden');
const overlay = document.querySelector('.overlay');
const close_model = document.querySelector('.close-model');

const openModel = function(){
    hidden.style.display = 'block';
    overlay.style.display = 'block'
}
for(let i = 0 ; i < show_All_Model.length ; i ++){
    show_All_Model[i].addEventListener('click' , openModel)}

const CloseModel = function(){
    hidden.style.display = 'none';
    overlay.style.display = 'none';
}

close_model.addEventListener('click' , CloseModel)
overlay.addEventListener('click' , CloseModel )

document.addEventListener('keydown' , (e)=>{
    if(e.key == 'Escape'){
        hidden.style.display = 'none';
        overlay.style.display = 'none';
    }
        
}) 