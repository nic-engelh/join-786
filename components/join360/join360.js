function init() {
    updateDashBoard();
}

/**
 * main functions for updating the drag & drop fields for tasks objects
 */
function updateDashBoard() {
    updateToDoWidget();
    updateInProgressWidget();
    updateFeedbackWidget();
    updateDoneWidget();
    updateNameWidget();
    updateUrgentWidget();
}

/**
 * function filters all tasks with status todo from active user tasks object
 * 
 */
function updateToDoWidget() {
    let todo = document.getElementById('j36_todo');
    todo.innerHTML = clear();
    let targetValue = 'todo';
    let toDoTasks = getFilteredTasksByStatus(targetValue);
    let size = Object.keys(toDoTasks).length;
    updateBoardWidget(size)
    todo.innerHTML = `<b>${size}</b>`;
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
    inprogress.innerHTML = `<b>${size}</b>`;
}

/**
 * function filters all taks with status "feedback" from active user tasks object
 * 
 */
function updateFeedbackWidget() {
    let feedback = document.getElementById('j36_feedback');
    feedback.innerHTML = clear();
    let targetValue = 'feedback';
    let feedbackTasks = getFilteredTasksByStatus(targetValue);
    let size = Object.keys(feedbackTasks).length;
    updateBoardWidget(size)
    feedback.innerHTML = `<b>${size}</b>`;
}

/**
 * function filters all tasks with status "done" from active user tasks object
 * 
 */
function updateDoneWidget() {
    let done = document.getElementById('j36_done');
    done.innerHTML = clear();
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
    let size = + number;
    board.innerHTML = clear();
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


/**
 * function changes the urgent widget data. It searches for the number of tasks which are urgent and the next upcoming dead line date.
 * 
 */
function updateUrgentWidget() {
    let deadlineDate, nextDate, urgentWidget, size;
    urgentWidget = document.getElementById('j36_Urgent');
    urgentWidget.innerHTML = clear();    
    urgentTasks = Object.keys(filterNestedObject(userTasks, 'urgent', 'prio'));
    size = Object.keys(urgentTasks).length;
    deadlineDate = 'No';
    if (size > 0) {
        deadlineDate = checkUrgentDates(urgentTasks);
    }
    urgentWidget.innerHTML = generateUrgentWidgetHTML(size, deadlineDate);
}

/**
 * functions compares dates. It will return the nearest urgent date as string.
 * 
 * @param {array} urgentTasks 
 * @returns {string} deadline
 */
function checkUrgentDates(urgentTasks) {
    deadlineDate = new Date(urgentTasks[0].date);
    for (const task of urgentTasks) {
        nextDate = new Date(task.date);
        if (nextDate < deadlineDate) { 
            deadlineDate = nextDate;
        }
    };
    deadlineDate = deadlineDate.toDateString();
    return deadlineDate;
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
    let nameWidget = document.getElementById('j36_person-Name');
    nameWidget.innerHTML = clear();
    let name = USERS[ACTIVEUSERKEY].userData.name;
    // String has shortened for forename
    nameWidget.innerHTML = `  
    <h2 id="j36_person-Name" class="j36_person-Name">dear ${name}</h2>`;
}

function myfunction() {
    return true
}


