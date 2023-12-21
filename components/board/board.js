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



//let toDos = USERS[ACTIVEUSERKEY].tasks;

let currentDraggedElement;

function placeholder() {
    return true;
}

function init() {
    updateHTML();
}

/**
 * main code for tasks
 */
function updateHTML() {
    updateToDo();
    updateInProgress();
    updateFeedback();
    updateDone();
}

/**
 * function filters all tasks with status todo
 * 
 */
function updateToDo () {
    let todo = todos.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'todo');
    document.getElementById('todo').innerHTML = '';
    if (todo.length == 0) {
        showNoTasksDone('todo');
    } else {
        showTask('todo');
        renderingBoardTasks(todo, 'todo');
    }
}


/**
 * function filters all tasks with status "inprogress"
 * 
 */
function updateInProgress () {
    let progress = todos.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'inprogress');
    document.getElementById('inProgress').innerHTML = '';
    if (progress.length == 0) {
        showNoTasksDone('inProgress');
    } else {
        showTask('inProgress');
        renderingBoardTasks(progress, 'inProgress');
    }
}

/**
 * function filters all taks with status "feedback"
 * 
 */
function updateFeedback () {
    let feedback = todos.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'feedback');
    document.getElementById('feedback').innerHTML = '';
    if (feedback.length == 0) {
        showNoTasksDone('feedback');
    } else {
        showTask('feedback');
        renderingBoardTasks(feedback, 'feedback');
    }
}

/**
 * function filters all tasks with status "done"
 * 
 */
function updateDone () {
    let done = todos.filter(t => t['status'].toLowerCase().replaceAll(" ","") == 'done');
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
              <div class="subnumber">${element['subtask']}</div></div>
              <div class="persons">${element['persons']}</div>
           </div>
       </div>
    </div>`;
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
    todos[currentDraggedElement]['status'] = status;
    updateHTML();
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
    document.getElementById(`${id}`).classList.add('noTask')
    document.getElementById(`${id}`).innerHTML = 'No tasks are done'
}

/**
 * remove class "no tasks" don at the board
 * 
 * @param {string} id 
 */
function showTask(id) {
    document.getElementById(`${id}`).classList.remove('noTask')
}
