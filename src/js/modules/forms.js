import checkNumInputs from './checkNumInputs';
import checkEmptyInputs from './checkEmptyInputs';

const forms = (state) => {

    'use strict';

  const forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        
        statusPattern = {
            success: "Отлично! Мы скоро с вами свяжемся!",
            loading: "Пожалуйста подождите идет загрузка",
            failure: "Что-то пошло не так"
        };

    checkNumInputs('input[name="user_phone"]');
    
    const clearInput = () =>{
        inputs.forEach(item =>{item.value = '';});
    };


    const postData = async (url, data) =>{
        document.querySelector('.status').textContent = statusPattern.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };
    
    const bindPostData = () =>{
        forms.forEach(item => {
            item.addEventListener('submit', (e)=>{
                e.preventDefault();
                
                const statusMessage = document.createElement('div');
                statusMessage.classList.add("status");
                item.appendChild(statusMessage);

                const formData = new FormData(item);
                if(item.getAttribute('data-calc') === 'end'){
                    for(let key in state){
                        formData.append(key, state[key]);
                    }
                }

                postData('assets/server.php', formData)
                .then(data =>{
                    console.log(data);
                    document.querySelector('.status').textContent = statusPattern.success;
                })
                .catch(()=>{
                    document.querySelector('.status').textContent = statusPattern.failure;
                })
                .finally(()=>{
                    clearInput();
                    setTimeout(()=> statusMessage.remove(), 5000);
                    // Скрыть все модальные окна
                    setTimeout(()=> {
                        document.querySelectorAll('div[data-modal]').forEach(item => item.style.display = 'none');
                        document.body.style.overflow = '';
                    }, 1000);
                    // ---
                    // Очистить обьект дополнительных данных для формы.
                    Object.keys(state).forEach(key => delete state[key]);
                    // ---
                    // Заблокировать кнопку первого (из трех) модального окна.
                    checkEmptyInputs('button[data-lockBtn-for-input]', document.querySelectorAll('#width')[0], document.querySelectorAll('#height')[0]);
                    // ---
                    // Поставить выбраный элемент опять на первую позицию.
                    const resetBalconHeader = () =>{
                        const a = document.querySelectorAll('.balcon_icons_img');
                        a.forEach(item => {
                            item.classList.remove('do_image_more'); 
                        });
                        a[0].classList.add('do_image_more');
                    };
                    resetBalconHeader();
                    // ---
                    // Очистить Checkbox, состояние по умолчанию.
                    const resetCheckbox = (selectorBtn) =>{
                        document.querySelector(selectorBtn).setAttribute('disabled', 'disabled');
                        document.querySelector(selectorBtn).style.cssText = 'filter: opacity(0.5);';
                        document.querySelectorAll('.checkbox').forEach(item => item.checked = false);
                    };
                    resetCheckbox('.popup_calc_profile_button');
                    // ---
                    // Сбросить Select по умолчанию во второй модалке
                    document.querySelector('#view_type').value = 'tree';
                    // 
                });
            });
        });
    };
    
    bindPostData();

};

export default forms; 