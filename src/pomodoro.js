const pomodoro = document.querySelector("#pomodoro");
const pomoClock = document.querySelector("#pomoclock");
const checkPomo = document.querySelector("#checkPomo");
const pomoShow = checkPomo.querySelector("#showpomo");
const resetPomoButton = checkPomo.querySelector("#resetBtn");


let pomos = [];
const POMO_KEY = "pomo_list";
const CLASS_NAME = "hidden";

// 뽀모도로 타이머 (분 단위)
const PICK_TIME = 25;
function startTimer(){
  pomodoro.classList.add(CLASS_NAME);
  pomoClock.classList.remove(CLASS_NAME);

 
    let time = 60 * PICK_TIME;
	let min = "";
	let sec = "";

	
	let x = setInterval(function() {
		
		min = parseInt(time/60); 
		sec = time%60;

		pomoClock.innerHTML = min + "분" + sec + "초";
		time--;

		
		if (time < 0) {
			clearInterval(x);
			pomoClock.innerHTML = "완료!";
            pomodoro.classList.remove(CLASS_NAME);
            pomoShow.innerHTML = `달성한 뽀모도로 : ${pomos.length}번 `;

		}
	}, 1000);
}

pomodoro.addEventListener("click", startTimer);


function onClickPomo(event){
    event.preventDefault();
    const newpomo =  event.timeStamp;
    
    const newPomoObj = {
        text : newpomo,
        id : Date.now()
    };
    pomos.push(newPomoObj);
    savePomo();
   

}

function savePomo(){
    localStorage.setItem(POMO_KEY, JSON.stringify(pomos));
}

function resetPomo(){
    pomos = [];
    localStorage.removeItem(POMO_KEY);
    pomoShow.innerHTML = `달성한 뽀모도로 : ${pomos.length}번`;
}

// 뽀모도로 시작 클릭이벤트
pomodoro.addEventListener("click", onClickPomo);

//뽀모도로 배열 및 로컬스토리 초기화 이벤트 
resetPomoButton.addEventListener("click",resetPomo);

// 로컬스토리지로부터 저장된 배열이 있으면 불러옴.
const savedPomo = localStorage.getItem(POMO_KEY);
if(savedPomo !== null){
    const parsedPomo = JSON.parse(savedPomo);
    pomos = parsedPomo;
    pomoShow.innerHTML = `달성한 뽀모도로 : ${pomos.length}번`;

}




