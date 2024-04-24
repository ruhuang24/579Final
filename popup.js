const inputBox = document.querySelector("#input-box");
const button = document.querySelector("button");
const list = document.querySelector("#list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("you must write something!");
    }else{
        let li = document.createElement("li");
        li.className = "task-item";

        let taskItemRow1 = document.createElement("div");
        taskItemRow1.className = "task-item-row";

        let taskTitle = document.createElement("div");
        taskTitle.innerHTML = inputBox.value;
        taskTitle.className = "task-text";
        taskItemRow1.appendChild(taskTitle);

        let taskButtons = document.createElement("div");
        
        list.appendChild(li);
        inputBox.value = '';

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        taskButtons.className = "task-buttons";
        taskButtons.appendChild(deleteButton);

        let focusButton = document.createElement("button");
        focusButton.textContent = "Focus";
        focusButton.className = "focus-btn";
        focusButton.onclick = () => startTimer(25, taskItemRow2);
        taskButtons.appendChild(focusButton);
        

        taskItemRow1.appendChild(taskButtons);
        li.appendChild(taskItemRow1);

        // Timers container
        let taskItemRow2 = document.createElement("div");
        taskItemRow2.className = "timer-item-row";
        li.appendChild(taskItemRow2);
    }
    saveData();
}

const startTimer = (duration, taskElement, taskId) => {
    let timer = 5;
    //let timer = duration * 60;
    let timerDiv = document.createElement("div");
    timerDiv.className = "timer";
    taskElement.appendChild(timerDiv);

    const interval = setInterval(() => {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDiv.textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            timerDiv.textContent = "Complete!";
            clearInterval(interval);
        }
    }, 1000);
}


list.addEventListener("click", (e)=>{
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.className === "delete-btn"){
        e.target.parentElement.parentElement.parentElement.remove();
        saveData();
    }
});

button.addEventListener("click", addTask);

function saveData(){
    localStorage.setItem("data", list.innerHTML);
}

function showTask(){
    const savedData = localStorage.getItem("data");
    if(savedData){
        list.innerHTML = savedData;

        // Reattach event listeners for each focus button
        const focusButtons = document.querySelectorAll('.focus-btn');
        focusButtons.forEach(button => {
            button.addEventListener('click', () => startTimer(5, button.parentElement.parentElement.nextElementSibling));
        });
    }
}


 window.addEventListener("load", showTask);

