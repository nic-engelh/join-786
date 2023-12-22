function init() {
    updateDashBoardHTML();
}

/**
 * main functions for updating the drag & drop fields for tasks objects
 */
function updateDashBoardHTML() {
    setVariables();
    updateToDoWidget();
    updateInProgressWidget();
    updateFeedbackWidget();
    updateDoneWidget();
}

/**
 * function filters all tasks with status todo from active user tasks object
 * 
 */
function updateToDoWidget() {
    let todo = document.getElementById('j36_todo');
    todo.innerHTML = ``;
    let targetValue = 'todo';
    let toDoTasks = getFilteredTasksByStatus(targetValue);
    let size = Object.keys(toDoTasks).length;
    todo.innerHTML = generateToDoWidget(size);
}

function generateToDoWidgetHTML (size) {
    return /*html*/`
    <div onclick="openSection('sectionBoard')" class="j36_toDo">
        <img src="/assets/img/Group 7.png" alt="">
        <div class="j36_numberPosition">
            <b>${size}</b>
            <p id="j36_todo" class="j36_todoText">To-Do</p>
    </div>
    `;
}

/**
 * function filters all tasks with status "inprogress" from active user tasks object
 * 
 */
function updateInProgressWidget() {
    let inprogress = document.getElementById('j36_progress');
    inprogress.innerHTML = ``;
    let targetValue = 'inprogress';
    let progressTasks = getFilteredTasksByStatus(targetValue);
    let size = Object.keys(progressTasks).length;
    inprogress.innerHTML = 
    
    `<b id="j36_progress" class="j36_numberOfTasks">${size}</b>
    <p>Task in Progress</p>`;
}

/**
 * function filters all taks with status "feedback" from active user tasks object
 * 
 */
function updateFeedbackWidget() {
    let feedback = document.getElementById('j36_feedback');
    feedback.innerHTML = ``;
    let targetValue = 'feedback';
    let feedbackTasks =  getFilteredTasksByStatus(targetValue);
    let size = Object.keys(feedbackTasks).length;
    feedback.innerHTML = `  <b class="j36_numberOfTasks">${size}</b>
    <p>Awaiting Feedback</p>`;
}

/**
 * function filters all tasks with status "done" from active user tasks object
 * 
 */
function updateDoneWidget() {
    let done = document.getElementById('j36_done');
    done.innerHTML = ``;
    let doneTasks = getFilteredTasksByStatus ("done");
    let size = Object.keys(doneTasks).length;
    done.innerHTML = `  <img src="/assets/img/Group 7 (1).png" alt="">
    <div class="j36_numberPosition">
        <b>${size}</b>
        <p  class="j36_todoText">Done</p>
    </div>`;
}


/**
 * functions searches userTasks for objects with status as target value
 * 
 * @param {string} targetValue 
 * @returns filtered object with tasks with status targetValue
 */
function getFilteredTasksByStatus (targetValue) {
    let inputObject = userTasks;
    let targetKey = 'status';
    let filteredObject = filterNestedObject(inputObject, targetValue, targetKey);
    return filteredObject;
}


// TODO cleaning and refactoring
function updateUrgentWidget() {
    let urgent = document.getElementById('j36_Urgent');
    urgent.innerHTML = ``;
    let targetValue = 'urgent';  //urgent
    let urgentTasks = Object.keys( filterNestedObject(userTasks, targetValue, 'prio') );
    let deadlineDate = urgentTasks[0].date; // urgentTasks[key].date
    for (const task of urgentTasks ){
        let nextDate = task.date;
        if (nextDate < deadlineDate) {
            deadlineDate = nextDate;
        }
     };
    urgent.innerHTML = generateUrgentWidgetHTML(size, deadlineDate);
}

function generateUrgentWidgetHTML(size, deadlineDate) {
    return /*html*/` 
        <div onclick="myfunction()" class="j36_urgent">
        <img class="j36_image1" src="/assets/img/Ellipse 4.jpg" alt="">
        <img class="j36_image2" src="/assets/img/Prio alta.jpg" alt="asdasd">
        <div class="j36_numberPosition">
            <b>${size}</b>
            <p class="j36_todoText">Urgent</p>
        </div>
        <div class="j36_partingLine"></div>
        <div class="j36_Date">
            <h2>${deadlineDate}</h2>  
            <p class="j36_dateText">Upcoming Deadline</p>
        </div>
    `
}


// komplette task in board plus rechenen und returnen
function updateBoardWidget() {
    let board = document.getElementById('j36_board');
    // size muss berechnet werden aus länge des key.userTasks
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


