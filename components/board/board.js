let todos = [{
    'headline': 'UserStory',
    'title': 'Kochwelt Page',
    'description': 'page start decription',
    'subtask':  '1/2 Subtasks',
    'persons':3,
    'category': 'todo',
    'tasks':3,
    'tasksdone':1,
    'id': 0,
},];



let currentDraggedElement;

function init() {
    updateHTML()
}

function updateHTML() {
    //todo//
    let todo = todos.filter(t => t['category'] == 'todo');

    document.getElementById('todo').innerHTML = '';
    if (todo.length == 0) {
        document.getElementById('todo').classList.add('noTask')
        document.getElementById('todo').innerHTML = 'No tasks To do'

    } else {
        document.getElementById('todo').classList.remove('noTask')
        for (let index = 0; index < todo.length; index++) {
            const element = todo[index];
            document.getElementById('todo').innerHTML += generateTodoHTML(element);
        }
    }

    //in progress//
    let progress = todos.filter(t => t['category'] == 'inProgress');

    document.getElementById('inProgress').innerHTML = '';
    if (progress.length == 0) {
        document.getElementById('inProgress').classList.add('noTask')
        document.getElementById('inProgress').innerHTML = 'No tasks in progress'

    } else {
        document.getElementById('inProgress').classList.remove('noTask')
        for (let index = 0; index < progress.length; index++) {
            const element = progress[index];
            document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
        }
    }
    //feedback//
    let feedback = todos.filter(t => t['category'] == 'feedback');

    document.getElementById('feedback').innerHTML = '';
    if (feedback.length == 0) {
        document.getElementById('feedback').classList.add('noTask')
        document.getElementById('feedback').innerHTML = 'No tasks in feedback'

    } else {
        document.getElementById('feedback').classList.remove('noTask')
        for (let index = 0; index < feedback.length; index++) {
            const element = feedback[index];
            document.getElementById('feedback').innerHTML += generateTodoHTML(element);
        }
    }
    //done//
    let done = todos.filter(t => t['category'] == 'done');

    document.getElementById('done').innerHTML = '';
    if (done.length == 0) {
        document.getElementById('done').classList.add('noTask')
        document.getElementById('done').innerHTML = 'No tasks in done'

    } else {
        document.getElementById('done').classList.remove('noTask')
        for (let index = 0; index < done.length; index++) {
            const element = done[index];
            document.getElementById('done').innerHTML += generateTodoHTML(element);
        }
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

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

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    todos[currentDraggedElement]['category'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}