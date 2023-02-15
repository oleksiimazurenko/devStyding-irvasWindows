const timer = (id, deadline)=>{

    const getZero = (num)=>{
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    };

    const getTimeRemaining = (endtime) =>{
        const getTimeMilisecund = Date.parse(endtime) - Date.parse(new Date()),
              normalTimeDays = Math.floor(getTimeMilisecund / (1000 * 60 * 60 * 24)),
              normalTimeHours = Math.floor(getTimeMilisecund / (1000 * 60 * 60) % 24),
              normalTimeMinutes = Math.floor(getTimeMilisecund / (1000 * 60) % 60),
              normalTimeSeconds = Math.floor((getTimeMilisecund / 1000) % 60);
    
        return {
            'getTimeMilisecund': getTimeMilisecund,
            'normalTimeDays': normalTimeDays,
            'normalTimeHours': normalTimeHours,
            'normalTimeMinutes': normalTimeMinutes,
            'normalTimeSeconds': normalTimeSeconds
        }; 
        
    };
    
    const setClock = (selector, endtime)=>{
        const timer = document.querySelector(selector),
              selectorDays = timer.querySelector('#days'),
              selectorHours = timer.querySelector('#hours'),
              selectorMinutes = timer.querySelector('#minutes'),
              selectorSeconds = timer.querySelector('#seconds'),
              constTimeInterval = setInterval(updateClock, 1000);

        // Для того чтобы не было мигания таймера при первичной загрузке сайта
        updateClock();
        // ---
    
        function updateClock(){
            const t = getTimeRemaining(endtime);
    
            selectorDays.innerHTML = getZero(t.normalTimeDays);
            selectorHours.innerHTML = getZero(t.normalTimeHours);
            selectorMinutes.innerHTML = getZero(t.normalTimeMinutes);
            selectorSeconds.innerHTML = getZero(t.normalTimeSeconds);
    
            if(t.getTimeMilisecund <= 0){

                selectorDays.textContent = '00';
                selectorHours.textContent = '00';
                selectorMinutes.textContent = '00';
                selectorSeconds.textContent = '00'; 

                clearInterval(constTimeInterval);
            }
        }
    };

    setClock(id, deadline); 

};



export default timer;
