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
    let toDo = filterNestedObject(inputObject, targetValue, targetKey);
    //let toDo = userTasks.filter(t => (t['status'].toLowerCase().replaceAll(" ","")) == 'todo');
    let size = Object.keys(toDo).length;
    document.getElementById('todo').innerHTML = '';
    if (size == 0) {
        showNoTasksDone('todo');
    } else {
        showTask('todo');
        renderingBoardTasks(Object.keys(toDo), 'todo');
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
    let progress = filterNestedObject(inputObject, targetValue, targetKey);
    //let progress = userTasks.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'inprogress');
    let size = Object.keys(progress).length;
    document.getElementById('inProgress').innerHTML = '';
    if (size == 0) {
        showNoTasksDone('inProgress');
    } else {
        showTask('inProgress');
        renderingBoardTasks(progress, 'inProgress');
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
    let feedback = filterNestedObject(inputObject, targetValue, targetKey);
    //feedback = userTasks.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'feedback');
    let size = Object.keys(feedback).length;
    document.getElementById('feedback').innerHTML = '';
    if (size == 0) {
        showNoTasksDone('feedback');
    } else {
        showTask('feedback');
        renderingBoardTasks(feedback, 'feedback');
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
    let done = filterNestedObject(inputObject, targetValue, targetKey);
    // done = userTasks.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'done');
    let size = Object.keys(feedback).length;
    document.getElementById('done').innerHTML = '';
    if (size == 0) {
        showNoTasksDone('done');
    } else {
        showTask('done');
        renderingBoardTasks(Object.keys(done), 'done');
    }
}

/**which id will be dropped
 * 
 * @param {string} id 
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**allows to drop and element
 * 
 * @param {*} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * for drag and drop movement
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
 * @param {string} id 
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function loadAssignableNames() {
    const selectElement = document.getElementById("assigned_user");
    for (let i = 0; i < userContacts.length; i++) {
        const initial = userContacts[i]["initials"];
        const name = userContacts[i]["name"];
        const color = userContacts[i]["color"];
        selectElement.innerHTML += `
            <li onclick="chooseContact(${i})" id="toggle_name${i}" class="assigned_user_li">
                <div class="task_contacts_name_initials">
                    <div id="initials_img${i}" class="assigned_initials" style="background-color:#${color};">${initial}</div>
                    <span id="assigned_name_span">${name}</span>
                </div>
                <img class="checkbox" id="checkbox${i}" src="/assets/img/addTask/check_empty.png">
            </li>`;
    }
}

/**
 * for of loop for tasks to render board elements html
 * 
 * @param {object} filteredTasks
 * @param {string} elementId
 */
function renderingBoardTasks(filteredTasks, elementId) {
    for (const object of filteredTasks) {
        document.getElementById(`${elementId}`).innerHTML += generateTodoHTML(object);
        // TODO hier deine function für user kreise ( initials)
        // Zugriff mit object.user[1]
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

/**
 * html codes
 * @param {string} element 
 * @returns html code
 */
function generateTodoHTML(element) {
    return `
    <div class ="todo">
       <div draggable="true" ondragstart="startDragging(${element['id']})" class="taskToDo">
          <div class="userHeadline">${element['category']}</div>
          <div class="title">${element['title']}</div>
          <div class="description">${element['description']}</div>
           <div class="progressPosition">
               <div class="w3-border">
                 <div class="w3-grey" style="height:8px;width:0%"></div>
              </div>
              <div class="subnumber">${(element['subtasks'])}</div></div>
              <div class="persons">${(element['user'])}</div>
           </div>
       </div>
    </div>`;
}