let tasks = [{
    'id': 0,
    'title': 'add Site',
    'description': 'open',
    'prio': 'urgent',
    'date': '03.12.2023',
    'category': 'user Story',
    'user': 'herbert',
    'subtasks': 'add HTML',
    'status': 'To do'
}, {
    'id': 1,
    'title': 'add second Site',
    'description': 'open',
    'prio': 'urgent',
    'date': '07.12.2023',
    'category': 'user Story',
    'user': 'Hans',
    'subtasks': 'add CSS',
    'status': 'in progress'
}];


let prio = '';
let subtasks = [''];


function addTask() {
    let id = 'ZUFALLLSGENERATOR';
    let title = document.getElementById('task_title');
    let description = document.getElementById('task_description');
    let date = document.getElementById('task_date');
    let category = document.getElementById('task_category');
    let user = document.getElementById('task_user');
    let status = 'To do';

    tasks['id'].push(id.value);
    tasks['title'].push(title.value);
    tasks['description'].push(description.value);
    tasks['prio'].push(prio.value);
    tasks['date'].push(date.value);
    tasks['category'].push(category.value);
    tasks['user'].push(user.value);
    tasks['subtasks'].push(subtasks.value);
    tasks['status'].push(status.value);

    resetTask();
}


function resetTask() {
    document.getElementById('title').value = '';
    document.getElementById('task_description').value = '';
    document.getElementById('task_task_date').value = '';
    document.getElementById('task_category').value = '';
    document.getElementById('task_user').value = '';
    let subtasks = [''];
}

function setPrio(i) {
    let priority = i;
    let prio = priority;
}

function addSubtask() {
    let subtask = document.getElementById('task_subtask').value;
    let newSubtask = document.getElementById('new_Subtask')
    subtasks.push(subtask.value);

    newSubtask.innerHTML += `
        <li id="subtask${i}">
        ${subtask.value} 
        <div><img onclick="editSubtask(${i})" src="/assets/img/addTask/edit.png" alt="">Delete</div>
        <img src="/assets/img/addTask/subtask_divide.png" alt=""> 
        <div><img onclick="deleteSubtask(${i})" src="/assets/img/addTask/delete.png" alt="">Edit</div>
        </li>
    `;

    document.getElementById('task_subtask').value = "";
}


function deleteSubtask(i) {
    subtasks.splice(i, 1);
}


function editSubtask(i) {
    document.getElementById("subtask${i}")
}