let currentDraggedElement;

function init() {
    updateBoardHTML();
}

/**
 * main functions for updating the drag & drop fields for tasks objects
 */
async function updateBoardHTML() {
    // TODO aktuelle tasks/variables müssen abgerufen und geupdated werden
    updateToDoField();
    updateInProgressField();
    updateFeedbackField();
    updateDoneField();
    updateDashBoard();
}

/**
 * function filters all tasks with status todo from active user tasks object
 * 
 */
function updateToDoField() {
    let targetValue = 'todo';
    let inputObject = USERS[ACTIVEUSERKEY].tasks;
    let targetKey = 'status';
    let toDoTasks = filterNestedObject(inputObject, targetValue, targetKey);
    let size = Object.keys(toDoTasks).length;
    document.getElementById('todo').innerHTML = '';
    if (size == 0) {
        showNoTasksDone('todo');
    } else {
        showTask('todo');
        renderingBoardTasks(toDoTasks, 'todo');
    }
}

/**
 * function filters all tasks with status "inprogress" from active user tasks object
 * 
 */
function updateInProgressField() {
    let targetValue = 'inprogress';
    let inputObject = USERS[ACTIVEUSERKEY].tasks;
    let targetKey = 'status';
    let progressTasks = filterNestedObject(inputObject, targetValue, targetKey);
    //let progress = userTasks.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'inprogress');
    let size = Object.keys(progressTasks).length;
    document.getElementById('inProgress').innerHTML = '';
    if (size == 0) {
        showNoTasksDone('inProgress');
    } else {
        showTask('inProgress');
        renderingBoardTasks(progressTasks, 'inProgress');
    }
}

/**
 * function filters all taks with status "feedback" from active user tasks object
 * 
 */
function updateFeedbackField() {
    let targetValue = 'feedback';
    let inputObject = USERS[ACTIVEUSERKEY].tasks;
    let targetKey = 'status';
    let feedbackTasks = filterNestedObject(inputObject, targetValue, targetKey);
    let size = Object.keys(feedbackTasks).length;
    document.getElementById('feedback').innerHTML = '';
    if (size == 0) {
        showNoTasksDone('feedback');
    } else {
        showTask('feedback');
        renderingBoardTasks(feedbackTasks, 'feedback');
    }
}

/**
 * function filters all tasks with status "done" from active user tasks object
 * 
 */
function updateDoneField() {
    let targetValue = 'done';
    let inputObject = USERS[ACTIVEUSERKEY].tasks;
    let targetKey = 'status';
    let doneTasks = filterNestedObject(inputObject, targetValue, targetKey);
    let size = Object.keys(doneTasks).length;
    document.getElementById('done').innerHTML = '';
    if (size == 0) {
        showNoTasksDone('done');
    } else {
        showTask('done');
        renderingBoardTasks(doneTasks, 'done');
    }
}

/**
 * which id will be dropped
 * 
 * @param {string} id 
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * allows to drop and element
 * 
 * @param {*} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * for drag and drop movement
 * 
 * @param {string} category 
 */
function moveTo(status) {
    USERS[ACTIVEUSERKEY].tasks[currentDraggedElement]['status'] = status;
    updateBoardHTML();
    // tasks müssen upgedatet werden
}

/**
 * add a class
 * @param {string} id 
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * remove the class "drag-area-highlight"
 * 
 * @param {string} id 
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * for of loop for tasks to render board elements html
 * 
 * @param {object} filteredTasks
 * @param {string} containertId
 */
function renderingBoardTasks(filteredTasks, containerId) {
    for (const key in filteredTasks) {
        let value = filteredTasks[key];
        document.getElementById(`${containerId}`).innerHTML += generateTodoHTML(value);
        renderingBoardUserInitials(value.user);
        generatePriority(value);
        renderSubtasksProgress(filteredTasks[key].id);
    }
}

/**
 * funcitons renders assigned user badged by iterating through user array form filtered userTasks
 * 
 * @param {array} assignedUser 
 */
function renderingBoardUserInitials(assignedUser) {
    let container = document.getElementById('boardAssignedUserInitialsContainer');
    for (const user of assignedUser) {
        container.innerHTML += generateUserInitialBadge(user);
        setBadgeColor(user.color, `boardAssignedUserInitials_${user.contactId}`);
    }
}

/**
 * functions generates the priority image
 * 
 * @param {array} elements 
 * @returns 
 */
function generatePriority(task) {
    let imagePrio = document.getElementById('boardAssignedPriority')

    if (task.prio == 'urgent') {
        imagePrio.innerHTML = `
        <img src="/assets/img/addTask/prio_high.png" alt="prio high">
        `}

    if (task.prio == 'medium') {
        imagePrio.innerHTML = `
        <img src="/assets/img/addTask/prio_medium.png" alt="prio medium">
    `}

    if (task.prio == 'low') {
        imagePrio.innerHTML = `
        <img src="/assets/img/addTask/prio_low.png" alt="prio low">
    `}

}

/**
 * remove and add class for information that no tasks are done 
 * 
 * @param {string} id 
 */
function showNoTasksDone(id) {
    document.getElementById(`${id}`).classList.add('noTask');
    document.getElementById(`${id}`).innerHTML = 'No tasks are done';
}

/**
 * remove class "no tasks" don at the board
 * 
 * @param {string} id 
 */
function showTask(id) {
    document.getElementById(`${id}`).classList.remove('noTask');
}

function openCreateTaskModal(section, boardFieldStatus) {
    openSection(section);
    let element = document.getElementById("create_task_button");
    element.setAttribute("onclick", `formValidation(${boardFieldStatus})`);
    return true;
}


function findBoardTask() {
    // TODO use following funtion from utils: filterNestedObject(inputObject, targetValue, targetKey)
    return true
}

/**
 * function checks the Tasks subtasks array for completed subtasks
 * 
 * @returns Number of finished subtasks
 */
function checkUserSubtasksStatus(taskId) {
    let subTasksDone = 0;
    let userSubTasks = USERS[ACTIVEUSERKEY].tasks[taskId].subtasks;
    for (const subtask of userSubTasks) {
        if (subtask[0].length == 0) {
            continue;
        };
        subTasksDone++;
    }
    return subTasksDone
}

/**
 * function renders progress bar according to finished subtasks for each board task card
 * 
 */
function renderSubtasksProgress(taskId) {
    // TODO Task card needs specific ID in order to get
    let container = document.getElementById('taskBoardCarProgressBar');
    let subTasksTotal = USERS[ACTIVEUSERKEY].tasks[taskId].subtasks.length;
    let subTasksDone = checkUserSubtasksStatus(taskId);
    let progressbarWidth = (subTasksDone / subTasksTotal) * 100;
    // TODO chance style width = progressbar length
}

/**
 * function generates html code for task cards within the board fields 
 * 
 * @param {object} element 
 * @returns html code
 */
function generateTodoHTML(task) {
    // TODO CSS balken anpassen; Änderung der Width muss über funktion erfolgen
    return `
    <div class ="todo" id="taskBoardCard_${task.id})">
        <div draggable="true" ondragstart="startDragging('${task.id}')" class="taskToDo">
            <div class="userHeadline">${task.category}</div>
            <div class="title">${task.title}</div>
            <div class="description">${task.description}</div>
            <div class="progressPosition">
                <div class="w3-light-grey w3-round">
                    <div id="taskBoardCarProgressBar" class="w3-container w3-round w3-blue" style="height:8px; width:1%"></div></div>
                <div class="subnumber"> 0/${(task.subtasks.length)}</div>
            </div>
            <div class="boardAssignedUserAndPrio">
                <div id="boardAssignedUserInitialsContainer" class="d-flex"></div>
                <div id="boardAssignedPriority"></div>
            </div>
        
    </div>`;
}

/**
 * functions generates colored badges for assigned users
 * 
 * @param {array} elements 
 * @returns 
 */
function generateUserInitialBadge(user) {
    return /*html*/`
        <div class="boardAssignedUserInitials" id="boardAssignedUserInitials_${user.contactId}">
        ${(user.initials)}
        </div>
    `
    //style="background-color:#${(elements.color)};" 
}
