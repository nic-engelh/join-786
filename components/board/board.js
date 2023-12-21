/* array was placeholder and test object
let todos = [{
    'category': 'UserStory',
    'title': 'Kochwelt Page',
    'description': 'page start decription',
    'subtask': '1/2 Subtasks', // delete / placeholder
    'persons': 3, // ToDos.persons.length
    'status': 'todo', 
    'tasks': 3, // subtaks
    'tasksdone': 1, // summe subtasks done
    'id': 0,
},];
*/

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
        renderingBoardTasks(toDo, 'todo');
    }
}

/**
 * function filters all tasks with status "inprogress" from active user tasks object
 * 
 */
function updateInProgressField () {
    let progress = userTasks.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'inprogress');
    document.getElementById('inProgress').innerHTML = '';
    if (progress.length == 0) {
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
    let feedback = userTasks.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'feedback');
    document.getElementById('feedback').innerHTML = '';
    if (feedback.length == 0) {
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
    let done = userTasks.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'done');
    document.getElementById('done').innerHTML = '';
    if (done.length == 0) {
        showNoTasksDone('done');
    } else {
        showTask('done');
        renderingBoardTasks(done, 'done');
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

/**
 * for schleife for tasks to rendering board elements html
 * 
 * @param {array} id 
 * @param {string} name 
 */
function renderingBoardTasks(id, name) {
    for (let index = 0; index < id.length; index++) {
        const element = id[index];
        document.getElementById(`${name}`).innerHTML += generateTodoHTML(element);
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
              <div class="subnumber">${(element['subtasks'].length)}</div></div>
              <div class="persons">${(element['user'].length)}</div>
           </div>
       </div>
    </div>`;
}