

const inputBox = document.getElementById("input-box");
const button = document.querySelector("button");
const list = document.getElementById("list-container");


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
       
        // Timers container
        let taskItemRow2 = document.createElement("div");
        taskItemRow2.className = "timer-item-row";

        let focusButton = document.createElement("button");
        focusButton.textContent = "Focus";
        focusButton.className = "focus-btn";
        focusButton.onclick = () => startTimer(25, taskItemRow2);
        taskButtons.appendChild(focusButton);
        

        taskItemRow1.appendChild(taskButtons);
        li.appendChild(taskItemRow1);
        // li.appendChild(taskButtons);

        
        li.appendChild(taskItemRow2);
    }
    saveData();
}

const startTimer = (duration, taskElement) => {
    let timer = 5;
    // let taskItemRow2 = document.createElement("div");
    // taskItemRow2.className = "task-item-row";

    // let timer = duration * 60;
    let timerDiv = document.createElement("div");
    timerDiv.className = "timer";

    // taskItemRow2.appendChild(timerDiv);


    
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
            // Optionally add a notification or alert here
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
    }
}
window.addEventListener("load", showTask);

