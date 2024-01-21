let currentDraggedElement;

function init() {
    updateBoardHTML();
    searchFieldEventListener();
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
    searchFieldEventListener();
}



/**
 * function filters all tasks with status targetValue from active user tasks object in USERS
 * 
 * @param {string} targetValue 
 * @param {Object} inputObject 
 * @param {string} targetKey 
 */
function updateBoardField(targetValue, inputObject, targetKey) {
    let filteredTasks = filterNestedObject(inputObject, targetValue, targetKey);
    document.getElementById(targetValue).innerHTML = '';
    let size = Object.keys(filteredTasks).length;
    if (size == 0) {
        showNoTasksDone(targetValue);
    } else {
        showTask(targetValue);
        renderingBoardTasks(filteredTasks, targetValue);
    }
}


/**
 * function filters all tasks with status todo from active user tasks object
 * 
 */
function updateToDoField() {
    updateBoardField('todo', USERS[ACTIVEUSERKEY].tasks, 'status');
}

/**
 * function filters all tasks with status "inprogress" from active user tasks object
 * 
 */
function updateInProgressField() {
    updateBoardField('inprogress', USERS[ACTIVEUSERKEY].tasks, 'status');
}

/**
 * function filters all taks with status "feedback" from active user tasks object
 * 
 */
function updateFeedbackField() {
    updateBoardField('feedback', USERS[ACTIVEUSERKEY].tasks, 'status');
}

/**
 * function filters all tasks with status "done" from active user tasks object
 * 
 */
function updateDoneField() {

    updateBoardField('done', USERS[ACTIVEUSERKEY].tasks, 'status');
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
        let task = filteredTasks[key];
        renderBoardCard(task, containerId);
    }
}


/**
 * function renders the html of a board task card with a given task object and the ID of the html container
 * 
 * @param {object} task 
 * @param {string} containerId 
 */
function renderBoardCard(task, containerId) {
    document.getElementById(`${containerId}`).innerHTML += generateTodoHTML(task);
    renderingBoardUserInitials(task.user, task.id);
    generatePriority(task);
    renderSubtasksProgress(task.id);
}


/**
 * funcitons renders assigned user badged by iterating through user array form filtered userTasks
 * 
 * @param {array} assignedUser 
 */
function renderingBoardUserInitials(assignedUser, id) {

    let container = document.getElementById(`boardAssignedUserInitialsContainer_${id}`);
    let count = 0;

    for (const user of assignedUser) {
        if (count < 3) {
            container.innerHTML += generateUserInitialBadge(user, id);
            setBadgeColor(user.color, `boardAssignedUserInitials_${user.contactId}${id}`);
            count++;
        } else {
            break;
        }
    }
}

/**
 * functions generates the priority image
 * 
 * @param {array} elements 
 * @returns 
 */
function generatePriority(task) {
    let imagePrio = document.getElementById(`boardAssignedPriority_${task.id}`)

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
    element.setAttribute("onclick", `formValidation("${boardFieldStatus}")`);
    return true;
}

/***
 * function add Eventlistener to watch for search bar inputs
 * 
 */
function searchFieldEventListener() {
    document.getElementById("board_search_inputfield").addEventListener("onchange", resetFindBoardTask);
}


/**
 * function reloads the board if search bar is empty 
 * 
 * @returns {boolean}
 *
 */
function resetFindBoardTask() {
    let searchValue = document.getElementById("board_search_inputfield").value;
    if (searchValue.lenth == 0) {
        updateBoardHTML();
        return true
    }
    return false
}

/**
 * 
 * @returns {Array of objects} results
 */
function findBoardTask() {
    let container = document.getElementById("board_search_inputfield");
    let searchInput = container.value.toLowerCase();
    let tasks = new Map(Object.entries(USERS[ACTIVEUSERKEY].tasks));
    let results = [];
    for (const [key, value] of tasks.entries()) {
        let title = value.title.toLowerCase();
        if (title.search(searchInput) >= 0 && title.length > 0) {
            results.push(value);
        }
    }
    return results
}

/**
 * functions goes throught a {array of objects} filteredTasks and activates a render function a board card
 * 
 * @returns 
 */
async function renderFilteredTasks() {
    // TODO function needs so render the filtered array into the board
    let containerIds = ["todo", "inprogress", "feedback", "done"]
    let filteredTasks = await findBoardTask();
    for (const id of containerIds) {
        if (document.getElementById(id)) {
            document.getElementById(id).innerHTML = clear();
        }
        for (const task of filteredTasks) {
            let taskStatus = task.status.toLowerCase().replaceAll(" ", "");
            if (taskStatus == id.toLowerCase()) {
                renderBoardCard(task, id);
            }
        }
    }
    return true
}


/**
 * function checks the Tasks subtasks array for completed subtasks
 * 
 * @returns Number of finished subtasks
 */
function checkUserSubtasksStatus(taskId) {
    let subTasksDone = 0;
    let userSubTasks = USERS[ACTIVEUSERKEY].tasks[taskId].subtasks.subtaskStatus;
    if (userSubTasks != null) {
        for (const subtask of userSubTasks) {
            if (subtask == 1) {
                subTasksDone++;
            };
        }
    }
    return subTasksDone
}

/**
 * function renders progress bar according to finished subtasks for each board task card
 * 
 */
function renderSubtasksProgress(taskId) {
    let container = document.getElementById('taskBoardCarProgressBar');
    let subTasksTotal = USERS[ACTIVEUSERKEY].tasks[taskId].subtasks.subtaskContent.length;
    let subTasksDone = checkUserSubtasksStatus(taskId);
    if (subTasksDone == 0 && subTasksTotal == 0) {
        var progressbarWidth = 0;
    } else {
        var progressbarWidth = (subTasksDone / subTasksTotal) * 100;
    }
    updateProgressBar(progressbarWidth, taskId, subTasksDone, subTasksTotal);
}

function updateProgressBar(value, taskId, subTasksDone, subTasksTotal) {
    let progressBar = document.querySelector(`#progress_${taskId}`);
    value = Math.round(value);
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    document.getElementById(`progress__text_${taskId}`).innerHTML = `${subTasksDone}/${subTasksTotal} Subtasks`;
}

function changeStatusBoardMobile(id, status) {
    USERS[ACTIVEUSERKEY].tasks[id].status = status;
    setStorageData('users',USERS);
    updateBoardHTML();
}

function openDropDownBoard(taskid) {
    const dialog = document.getElementById(`board_modal_container${taskid}`);
    dialog.classList.toggle('visually-hidden');
    dialog.classList.toggle('d-flex');
    dialog.show();
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
    <div class ="todo" id="taskBoardCard_${task.id})" onclick="getTaskBoardModalValue('${task.id}')">
        <div draggable="true" ondragstart="startDragging('${task.id}')" class="taskToDo">
            <div class="userHeadline">${task.category}</div>
            <div  class="board_dropDown_position">
            <img onclick="event.stopPropagation(); openDropDownBoard('${task.id}')" id=board_dropDown class="board_dropDown" src="/assets/img/dropDown.png" alt="">
            <dialog id="board_modal_container${task.id}" class="visually-hidden board_popup">
            <div id="board_modal_category">
                <h3>Move to</h3>
                <b onclick="event.stopPropagation(); changeStatusBoardMobile('${task.id}', 'todo')">To-Do</b>
                <b onclick="event.stopPropagation(); changeStatusBoardMobile('${task.id}', 'inprogress')">In-progress</b>
                <b onclick="event.stopPropagation(); changeStatusBoardMobile('${task.id}', 'feedback')">Await-Feedback</b>
                <b onclick="event.stopPropagation(); changeStatusBoardMobile('${task.id}', 'done')">Done</b>
            </div>
        </dialog></div>
            <div class="title">${task.title}</div>
            <div class="description">${task.description}</div>
            <div class="progressPosition"> 
                  <div id="progress_${task.id}" class="progress">
                       <div class="progress__fill"></div>
                    </div>
                       <span id="progress__text_${task.id}" class="progress__text"></span>
            </div>
            <div class="boardAssignedUserAndPrio">
                <div id="boardAssignedUserInitialsContainer_${task.id}" class="d-flex boardAssignedUserInitialsContainer"></div>
                <div id="boardAssignedPriority_${task.id}"></div>
            </div>
        
    </div>`;

}

/**
 * functions generates colored badges for assigned users
 * 
 * @param {array} elements 
 * @returns 
 */
function generateUserInitialBadge(user, id) {
    return /*html*/`
        <div class="boardAssignedUserInitials" id="boardAssignedUserInitials_${user.contactId}${id}">
        ${(user.initials)}
        </div>
    `
    //style="background-color:#${(elements.color)};" 
}
