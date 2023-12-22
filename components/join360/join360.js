function init() {
    updateBoardHTML();
}

/**
 * main functions for updating the drag & drop fields for tasks objects
 */
function updateBoardHTML() {
    setVariables();
    updateToDoField();
    updateInProgressField();
    updateFeedbackField();
    updateDoneField();
}

/**
 * function filters all tasks with status todo from active user tasks object
 * 
 */
function updateToDoField() {
    let todo = document.getElementById('j36_todo');
    todo.innerHTML = ``;
    let targetValue = 'todo';
    let inputObject = userTasks;
    let targetKey = 'status';
    let toDoTasks = filterNestedObject(inputObject, targetValue, targetKey);
    let size = Object.keys(toDoTasks).length;
    todo.innerHTML = `<div onclick="myfunction()" class="j36_toDo">
    <img src="/assets/img/Group 7.png" alt="">
    <div class="j36_numberPosition">
        <b>${size}</b>
        <p id="j36_todo" class="j36_todoText">To-Do</p>
    </div>`;
}

/**
 * function filters all tasks with status "inprogress" from active user tasks object
 * 
 */
function updateInProgressField() {
    let inprogress = document.getElementById('j36_progress');
    inprogress.innerHTML = ``;
    let targetValue = 'inprogress';
    let targetKey = 'status';
    let progressTasks = filterNestedObject(inputObject, targetValue, targetKey);
    //let progress = userTasks.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'inprogress');
    let size = Object.keys(progressTasks).length;
    inprogress.innerHTML = `<b id="j36_progress" class="j36_numberOfTasks">${size}</b>
    <p>Task in Progress</p>`;
}

/**
 * function filters all taks with status "feedback" from active user tasks object
 * 
 */
function updateFeedbackField() {
    let feedback = document.getElementById('j36_feedback');
    feedback.innerHTML = ``;
    let targetValue = 'feedback';
    let inputObject = userTasks;
    let targetKey = 'status';
    let feedbackTasks = filterNestedObject(inputObject, targetValue, targetKey);
    let size = Object.keys(feedbackTasks).length;
    feedback.innerHTML = `  <b class="j36_numberOfTasks">${size}</b>
    <p>Awaiting Feedback</p>`;
}

/**
 * function filters all tasks with status "done" from active user tasks object
 * 
 */
function updateDoneField() {
    let done = document.getElementById('j36_done');
    done.innerHTML = ``;
    let targetValue = 'done';
    let inputObject = userTasks;
    let targetKey = 'status';
    let doneTasks = filterNestedObject(inputObject, targetValue, targetKey);
    let size = Object.keys(doneTasks).length;
    done.innerHTML = `  <img src="/assets/img/Group 7 (1).png" alt="">
    <div class="j36_numberPosition">
        <b>${size}</b>
        <p  class="j36_todoText">Done</p>
    </div>`;
}

//der task der gerade am meisten eilt und aktueller datum bis wan es fertig sein musss
function updateUrgentField() {
    let urgent = document.getElementById('j36_Urgent');
    urgent.innerHTML = ``;
    let targetValue = 'done';  //urgent
    let inputObject = userTasks;
    let targetKey = 'status';
    let doneTasks = filterNestedObject(inputObject, targetValue, targetKey);
    let size = Object.keys(doneTasks).length;
    urgent.innerHTML = ` <div onclick="myfunction()" class="j36_urgent">
    <img class="j36_image1" src="/assets/img/Ellipse 4.jpg" alt="">
    <img class="j36_image2" src="/assets/img/Prio alta.jpg" alt="asdasd">
    <div class="j36_numberPosition">
        <b>${size}</b>
        <p class="j36_todoText">Urgent</p>
    </div>
    <div class="j36_partingLine"></div>
    <div class="j36_Date">
        <h2>October 16, 2022</h2>        <---------------datum bis wan es fertig sein muss///////////////////////////
        <p class="j36_dateText">Upcoming Deadline</p>
    </div>`;
}

// komplette task in board plus rechenen und returnen
function updateBoardField() {
    let board = document.getElementById('j36_board');
    board.innerHTML = ``;
    board.innerHTML = `  <img src="/assets/img/Group 7 (1).png" alt="">
    <div class="j36_numberPosition">
        <b>${size}</b>
        <p  class="j36_todoText">Done</p>
    </div>`;
}

function myfunction() {
    return true
}


