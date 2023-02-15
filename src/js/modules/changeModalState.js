import checkEmptyInputs from "./checkEmptyInputs";
import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) =>{
    const dataForm = document.querySelectorAll('.balcon_icons_img'),
          dataWidth = document.querySelectorAll('#width'),
          dataHeight = document.querySelectorAll('#height'),
          dataType = document.querySelectorAll('#view_type'),
          dataProfile = document.querySelectorAll('.checkbox');
   
    
    checkNumInputs('#width');
    checkNumInputs('#height');
    checkEmptyInputs('button[data-lockBtn-for-input]', dataWidth[0], dataHeight[0]);

    const checkEmptyCheckbox = (selectorBtn) =>{
        const chackboxCustom = document.querySelectorAll('.popup_calc_profile_content > label > span.checkbox-custom');
        const openBtn = () => document.querySelector(selectorBtn).removeAttribute('disabled', 'disabled');
    
        document.querySelector(selectorBtn).setAttribute('disabled', 'disabled');
        document.querySelector(selectorBtn).style.cssText = 'filter: opacity(0.5);';
        
    
    
        chackboxCustom.forEach((item) =>{
            item.addEventListener('click', ()=>{
                document.querySelector(selectorBtn).style.cssText = 'filter: unset;';
                openBtn();
            });
        });
    };

    checkEmptyCheckbox('.popup_calc_profile_button');

    const bindActionToElements = (event, element, prop) =>{
        element.forEach((item, i)=>{
            item.addEventListener(event, ()=>{

                switch(item.nodeName){
                    case 'SPAN':
                        state[prop] = i;
                        break; 
                    case 'INPUT':
                        if(item.getAttribute('type') === 'checkbox'){
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое';
                            element.forEach((box, j)=>{
                                box.checked = false;
                                if(i == j) box.checked = true; 
                            });
                            // Код для добавления первого пункта в обьект по умолчнию, дополнение для отправки формы. 'select.form-control'
                            if(!Object.keys(state).includes('type')) state['type'] = 'tree';
                            // ---
                        }else{
                            state[prop] = item.value;
                            // Код для добавления первого пункта в обьект по умолчнию, дополнение для отправки формы. '.balcon_icons_img'
                            if(!Object.keys(state).includes('form')) state['form'] = 0;
                            // ---
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }   
                console.log(state);
            });
        });
    };

    bindActionToElements('click', dataForm, 'form');
    bindActionToElements('input', dataHeight, 'height');
    bindActionToElements('input', dataWidth, 'width');
    bindActionToElements('change', dataType, 'type');
    bindActionToElements('change', dataProfile, 'profile');

};

export default changeModalState;
