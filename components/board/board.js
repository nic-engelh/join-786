let todos = [{
    'headline': 'UserStory',
    'title': 'Kochwelt Page',
    'description': 'page start decription',
    'subtask': '1/2 Subtasks',
    'persons': 3,
    'category': 'todo',
    'tasks': 3,
    'tasksdone': 1,
    'id': 0,
},];



let currentDraggedElement;

function init() {
    updateHTML()
}

/**
 * main code for tasks
 */
function updateHTML() {
    ///////////////////////todo//////////////////////
    let todo = todos.filter(t => t['category'] == 'todo');
    document.getElementById('todo').innerHTML = '';
    if (todo.length == 0) {
        noTask('todo')
    } else {
        task('todo')
        forFunction(todo, 'todo')
    }
    /////////////////in progress////////////////////
    let progress = todos.filter(t => t['category'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';
    if (progress.length == 0) {
        noTask('inProgress')
    } else {
        task('inProgress')
        forFunction(progress, 'inProgress')
    }
    /////////////////////feedback/////////////////////
    let feedback = todos.filter(t => t['category'] == 'feedback');
    document.getElementById('feedback').innerHTML = '';
    if (feedback.length == 0) {
        noTask('feedback')
    } else {
        task('feedback')
        forFunction(feedback, 'feedback')
    }
    /////////////done///////////////
    let done = todos.filter(t => t['category'] == 'done');
    document.getElementById('done').innerHTML = '';
    if (done.length == 0) {
        noTask('done')
    } else {
        task('done')
        forFunction(done, 'done')
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
          <div class="userHeadline">${element['headline']}</div>
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
function moveTo(category) {
    todos[currentDraggedElement]['category'] = category;
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
 * remove a class
 * @param {string} id 
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * for schleife for tasks
 * @param {array} id 
 * @param {string} name 
 */
function forFunction(id, name) {
    for (let index = 0; index < id.length; index++) {
        const element = id[index];
        document.getElementById(`${name}`).innerHTML += generateTodoHTML(element);
    }
}

/**
 * remove and add class
 * @param {string} id 
 */
function noTask(id) {
    document.getElementById(`${id}`).classList.add('noTask')
    document.getElementById(`${id}`).innerHTML = 'No tasks in done'
}

/**
 * remove classes
 * @param {string} id 
 */
function task(id) {
    document.getElementById(`${id}`).classList.remove('noTask')
}