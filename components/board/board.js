let currentDraggedElement;

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
function updateToDoField () {
    let targetValue = 'todo';
    let inputObject = userTasks;
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
function updateInProgressField () {
    let targetValue = 'inprogress';
    let inputObject = userTasks;
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
function updateFeedbackField () {
    let targetValue = 'feedback';
    let inputObject = userTasks;
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
function updateDoneField () {
    let targetValue = 'done';
    let inputObject = userTasks;
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
    userTasks[currentDraggedElement]['status'] = status;
    updateBoardHTML();
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
 * @param {string} elementId
 */
function renderingBoardTasks(filteredTasks, elementId) {
    for (const key in filteredTasks) {
        let value = filteredTasks[key];
        document.getElementById(`${elementId}`).innerHTML += generateTodoHTML(value);
        renderingBoardUserInitials(value.user);
    }
}

/**
 * funcitons renders assigned user badged by iterating through user array form filtered userTasks
 * 
 * @param {array} assignedUser 
 */
function renderingBoardUserInitials (assignedUser) {
    let container = document.getElementById('boardAssignedUserInitialsContainer');
    for (const user of assignedUser) {
        container.innerHTML += generateUserInitialBadge(user);
        setBadgeColor(user.color, `boardAssignedUserInitials_${user.contactId}`);
    }
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


function findBoardTask () {
    // TODO use following funtion from utils: filterNestedObject(inputObject, targetValue, targetKey)
    return true
}

function checkUserSubtasksStatus () {
    let subTasksTotal = userTasks.subtasks.length;
    let subTasksDone = 0;
    for (const task of userTasks.subtasks) {
        if (task[0] == 0) { 
            continue;
        } ;
        subTasksDone++;
    }
}

function renderSubtasksProgress () {
    let container = document.getElementById();
}

/**
 * function generates html code for task cards within the board fields
 * 
 * @param {object} element 
 * @returns html code
 */
function generateTodoHTML(task) {
    return `
    <div class ="todo" id="taskBoardCard_${task.id})">
       <div draggable="true" ondragstart="startDragging('${task.id}')" class="taskToDo">
          <div class="userHeadline">${task.category}</div>
          <div class="title">${task.title}</div>
          <div class="description">${task.description}</div>
           <div class="progressPosition">
               <div class="w3-border">
                 <div class="w3-grey" style="height:8px;width:0%"></div>
              </div>
              <div class="subnumber">${(task.subtasks.length)}</div></div>
              <div id="boardAssignedUserInitialsContainer" class="d-flex" > 
              </div>
           </div>
       </div>
    </div>`;
}

/**
 * functions generates colored badges for assigned users
 * 
 * @param {array} elements 
 * @returns 
 */
function generateUserInitialBadge (user) {
    return /*html*/`
        <div class="boardAssignedUserInitials" id="boardAssignedUserInitials_${user.contactId}">
        ${(user.initials)}
        </div>
    `
    //style="background-color:#${(elements.color)};" 
}