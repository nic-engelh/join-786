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
    let targetValue = 'todo';
    let inputObject = userTasks;
    let targetKey = 'status';
    let toDoTasks = filterNestedObject(inputObject, targetValue, targetKey);
    let size = Object.keys(toDoTasks).length;
    document.getElementById('j36_todo').innerHTML = `<div onclick="myfunction()" class="j36_toDo">
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
    let targetValue = 'inprogress';
    let targetKey = 'status';
    let progressTasks = filterNestedObject(inputObject, targetValue, targetKey);
    //let progress = userTasks.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'inprogress');
    let size = Object.keys(progressTasks).length;
    document.getElementById('j36_progress').innerHTML = '';
}

/**
 * function filters all taks with status "feedback" from active user tasks object
 * 
 */
function updateFeedbackField() {
    let targetValue = 'feedback';
    let inputObject = userTasks;
    let targetKey = 'status';
    let feedbackTasks = filterNestedObject(inputObject, targetValue, targetKey);
    let size = Object.keys(feedbackTasks).length;
    document.getElementById('j36_feedback').innerHTML = '';
}

/**
 * function filters all tasks with status "done" from active user tasks object
 * 
 */
function updateDoneField() {
    let done = document.getElementById('j36_done');
    done.getElementById('j36_done').innerHTML = ``;
    let targetValue = 'done';
    let inputObject = userTasks;
    let targetKey = 'status';
    let doneTasks = filterNestedObject(inputObject, targetValue, targetKey);
    let size = Object.keys(doneTasks).length;
    document.getElementById('j36_done').innerHTML = `${size}`;
}

function myfunction() {
    return true
}


