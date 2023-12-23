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
    updateNameWidget();
    updateUrgentWidget()
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
    updateBoardWidget(size)
    todo.innerHTML =`<b>${size}</b>`;
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
    updateBoardWidget(size)
    inprogress.innerHTML =`<b>${size}</b>`;
}

/**
 * function filters all taks with status "feedback" from active user tasks object
 * 
 */
function updateFeedbackWidget() {
    let feedback = document.getElementById('j36_feedback');
    feedback.innerHTML = ``;
    let targetValue = 'feedback';
    let feedbackTasks = getFilteredTasksByStatus(targetValue);
    let size = Object.keys(feedbackTasks).length;
    updateBoardWidget(size)
    feedback.innerHTML =`<b>${size}</b>`;
}

/**
 * function filters all tasks with status "done" from active user tasks object
 * 
 */
function updateDoneWidget() {
    let done = document.getElementById('j36_done');
    done.innerHTML = ``;
    let doneTasks = getFilteredTasksByStatus("done");
    let size = Object.keys(doneTasks).length;
    updateBoardWidget(size)
    done.innerHTML = `<b>${size}</b>`;
}

/**
 * update task in board 
 * @param {number} number 
 */
function updateBoardWidget(number) {
    let board = document.getElementById('j36_board');
    let size =+ number;
    board.innerHTML = ``;
    board.innerHTML = `<b>${size}</b>`;
}

/**
 * functions searches userTasks for objects with status as target value
 * 
 * @param {string} targetValue 
 * @returns filtered object with tasks with status targetValue
 */
function getFilteredTasksByStatus(targetValue) {
    let inputObject = userTasks;
    let targetKey = 'status';
    let filteredObject = filterNestedObject(inputObject, targetValue, targetKey);
    return filteredObject;
}

function updateUrgentWidget() {
    let urgent = document.getElementById('j36_Urgent');
    urgent.innerHTML = ``;
    let targetValue = 'urgent';
    let urgentTasks = Object.keys(filterNestedObject(userTasks, targetValue, 'prio'));
    let deadlineDate = urgentTasks[0].date;
    for (const task of urgentTasks) {
        let nextDate = task.date;
        if (nextDate < deadlineDate) {
            deadlineDate = nextDate;
        }
    };
    urgent.innerHTML = generateUrgentWidgetHTML(size, deadlineDate);
}

function generateUrgentWidgetHTML(size, deadlineDate) {
    return /*html*/` 
        <div class="j36_urgent">
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


function updateNameWidget() {//die funktion soll den namen raus suchen
    let name = document.getElementById('j36_person-Name');
    name.innerHTML = ``;
    let doneTasks = getFilteredTasksByStatus("done");///hier muss in den namen der person rausgesucht werden
    let size = Object.keys(doneTasks).length;
    done.innerHTML = `  
    <h2 id="j36_person-Name" class="j36_person-Name">${name}</h2>`;
}

function myfunction() {
    return true
}


