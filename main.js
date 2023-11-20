//1. 컴퓨터는 게임이 시작할때 랜덤한 숫자를 뽑는다
//2.유저는 숫자를 입력할 수 있다
//3. 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 작으면 Up! 이라고 알려준다
//3. 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 크면 Down! 이라고 알려준다
//3. 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자와 일치하다면 That's right이라고 뜨고 게임이 종료된다.
//4. 리셋버튼을 누르면 게임이 초기화된다
//5.유저는 총 5번의 기회가 있다 그러고 게임이 끝난다.
//6. 유저가 1~100범위 밖에 숫자를 입력할시에 경고메세지가 뜬다
//7. 유저가 이미 입력한 값을 또 입력할 시에 경고메세지가 뜬다
// 반응형 UI

let computerNum = 0;//1번-랜덤번호를 지정
let goButton = document.getElementById("go-button");//2번- go라는 버튼을 가져옴
let userInput = document.getElementById("input-area")//2번 - 값의 변수지정
let resultArea = document.getElementById("result-area")//*유저에게 결괏값을 보여주기
let resetButton = document.getElementById("reset-button")//4-리셋버튼을 활성화 시켜주기
let chances = 5 //5-기회가 몇 번인지 저장하기
let gameOver = false//5-처음에는 게임오버가 false였는데
let chanceArea = document.getElementById("chance-area")
let history = [] //7- 입력한 값들을 배열안에 저장한다
let resultAreaImg = document.querySelector('.main-image');


goButton.addEventListener("click",play)//-2-이 버튼을 클릭하는 이벤트를 했을 때 play라는 함수를 실행시키자,이때 play라는 함수는 매개변수로 값이 들어감
resetButton.addEventListener("click",reset)//-4 reset 버튼을 누르면
userInput.addEventListener("click",focus)

function focus(){
    userInput.value =""
}

function pickRandomNum() { //1번 
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답",computerNum);
}

function play(){ // 2-play버튼을 눌렸을 때 일어나는 일
    let userValue = userInput.value //2번-play 버튼을 눌렀을 때 값을 들고온다
    
    if(userValue<1 || userValue>100){//6번
        resultArea.textContent = "1 과 100사이의 숫자를 이용해주세요"
        return
    }
    
    if(history.includes(userValue)){
        resultArea.textContent = "이미 사용한 숫자입니다"
        return
    }

    chances --//5-게임을 한 번 할때마다 챈스가 줄어든다
    chanceArea.textContent=`chances : ${chances}`//5-챈스가 몇 번 줄어들고 있는지 실제로 유저에게 보여준다

    if( userValue < computerNum){//3-입력 숫자가 크면 혹은 작으면 혹은 맞추면
        resultAreaImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcK-dl6qubQJOudua_56KzWYrVy9XY9J9z6A&usqp=CAU';
        resultArea.textContent = "UP!"//*유저에게 결괏값을 보여주기
    }else if( userValue > computerNum){
        resultArea.textContent = "Down!"
        resultAreaImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcK-dl6qubQJOudua_56KzWYrVy9XY9J9z6A&usqp=CAU';
    }else{
        resultArea.textContent = "That's right!!"
        resultAreaImg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTL4GLv26LDmKx8LSALFywLKEc-BVd6BWwqA&usqp=CAU"
    }

    history.push(userValue)//7-유저값변수(배열)에 히스토리의 값을 넣어준다
    console.log(history)
  
    if(chances<1){//5-챈스가 한 번 미만으로 남았을 때
        gameOver = true//게임 오버가 트루가 되고 (첨에는 false였다가 이제는 변수가 true가되고)
}
    if(gameOver==true){//게임오버가 트루가 되었을 때 (값이 true값이 되었을 때)
        goButton.disabled = true; // GO 버튼이 비활성화되며 더이상의 게임진행 불가
        resultAreaImg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx6VCrmhAZHTYm_7DSb0qtemqmLMtgVZ5Y_Q&usqp=CAU"
        resultArea.textContent = "Oops!"
        
    }
}

function reset(){
    userInput.value = ""//4-창의 값이 비워지고
    pickRandomNum()//4-다시 새로운 번호가 부여되고
    chanceArea.textContent = "chances : 5"
    resultAreaImg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCK0d-OhVgmVRbnbZs5KXSeJ_qg5-3I2D9EA&usqp=CAU"
    resultArea.textContent = "Let's guess the number!"
}
pickRandomNum();