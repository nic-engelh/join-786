// function init() {
//     updateDashBoard();
// }

/**
 * main functions for updating the drag & drop fields for tasks objects
 */
async function updateDashBoard() {
    await updateToDoWidget();
    await updateInProgressWidget();
    await updateFeedbackWidget();
    await updateDoneWidget();
    await updateNameWidget();
    await updateUrgentWidget();
}

/**
 * function filters all tasks with status todo from active user tasks object
 * 
 * 
 * WENN DIESE FUNKTION ASYNC updateBoardWidget Await hat funktioniert es nicht mehr
 * 
 */
function updateToDoWidget() {
    let todo = document.getElementById('j36_todo');
    todo.innerHTML = clear();
    let targetValue = 'todo';
    let toDoTasks = getFilteredTasksByStatus(targetValue);
    let size = Object.keys(toDoTasks).length;
    updateBoardWidget(size);
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
    updateBoardWidget(size);
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
    updateBoardWidget(size);
    feedback.innerHTML = `<b>${size}</b>`;
}

/**
 * function filters all tasks with status "done" from active user tasks object
 * 
 */
async function updateDoneWidget() {
    let done = document.getElementById('j36_done');
    done.innerHTML = clear();
    let doneTasks = getFilteredTasksByStatus("done");
    let size = Object.keys(doneTasks).length;
    await updateBoardWidget(size);
    done.innerHTML = `<b>${size}</b>`;
}

/**
 * update task in board; adds up all tasks on the board and saves it within the global variable BOARDTASKS
 * @param {number} number 
 */
async function updateBoardWidget(number) {
    let board = document.getElementById('j36_board');
    BOARDTASKS += number;
    board.innerHTML = clear();
    board.innerHTML = `<b>${BOARDTASKS}</b>`;
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
async function updateUrgentWidget() {
    let deadlineDate, nextDate, urgentWidget, size;
    urgentWidget = document.getElementById('j36_Urgent');
    urgentWidget.innerHTML = clear();    
    urgentTaskIds = Object.keys(filterNestedObject(userTasks, 'urgent', 'prio'));
    size = Object.keys(urgentTaskIds).length;
    deadlineDate = 'No';
    if (size > 0) {
        deadlineDate = checkUrgentDates(urgentTaskIds);
    }
    urgentWidget.innerHTML = generateUrgentWidgetHTML(size, deadlineDate);
}

/**
 * functions compares dates. It will return the nearest urgent date as string. Format: "Fri Dec 29 2023"
 * 
 * @param {array} urgentTasks 
 * @returns {string} deadline 
 */
function checkUrgentDates(urgentTaskIds) {
    deadlineDate = new Date(USERS[ACTIVEUSERKEY].tasks[urgentTaskIds[0]].date); 
    for (const taskId of urgentTaskIds) {
        nextDate = new Date(USERS[ACTIVEUSERKEY].tasks[taskId].date) ;
        if (nextDate < deadlineDate) { 
            deadlineDate = nextDate;
        }
    };
    deadlineDate = deadlineDate.toLocaleDateString('de-DE', { month: 'long', day: 'numeric', year: 'numeric' });;
    return deadlineDate;
} 

function generateUrgentWidgetHTML(size, deadlineDate) {
    return /*html*/` 
        <div class="j36_urgent">
        <img class="j36_image1" src="assets/img/Ellipse 4.svg" alt="">
        <div class="j36_numberPosition">
            <b>${size}</b>
            <p class="j36_todoText">Urgent</p>
        </div>
        <div class="j36_partingLine"></div>
        <div class="j36_Date">
            <h2 class="j_36UserDate">${deadlineDate}</h2>  
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


