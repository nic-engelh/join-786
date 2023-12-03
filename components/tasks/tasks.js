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


let subtasksArray = {
    'subtaskContent': [],
    'subtaskStatus': []
};


async function addTask() {
    let id = 'ZUFALLLSGENERATOR';
    let title = document.getElementById('task_title');
    let description = document.getElementById('task_description');
    let user = document.getElementById('task_user');
    let date = document.getElementById('task_date');
    let prio = getPriority();
    let category = document.getElementById('task_category');
    let subtasks = subtasksArray;
    let status = 'To do';

    tasks['id'].push(id.value);
    tasks['title'].push(title.value);
    tasks['description'].push(description.value);
    tasks['user'].push(user.value);
    tasks['date'].push(date.value);
    tasks['prio'].push(prio);
    tasks['category'].push(category.value);
    tasks['subtasks'].push(subtasks);
    tasks['status'].push(status.value);

    resetTask();
}


function resetTask() {
    document.getElementById('title').value = '';
    document.getElementById('task_description').value = '';
    document.getElementById('task_user').value = '';
    document.getElementById('task_task_date').value = '';
    document.getElementById('urgent_button').classList.remove('urgent');
    document.getElementById('task_prio_img_urgent').src = '../img/urgent_no_bg.svg';
    document.getElementById('medium_button').classList.remove('medium');
    document.getElementById('task_prio_img_medium').src = '../img/medium_no_bg.svg';
    document.getElementById('low_button').classList.remove('low');
    document.getElementById('task_prio_img_low').src = '../img/low_no_bg.svg';
    document.getElementById('task_category').value = '';
    subtasksArray = {
        'subtaskContent': [],
        'subtaskStatus': []
    };
}


function getPriority() {
    const urgentButton = document.getElementById('urgent_button');
    const mediumButton = document.getElementById('medium_button');
    const lowButton = document.getElementById('low_button');

    if (urgentButton.classList.contains('urgent_button_active')) {
        return 'urgent';
    } else if (mediumButton.classList.contains('medium_button_active')) {
        return 'medium';
    } else if (lowButton.classList.contains('low_button_active')) {
        return 'low';
    }
}


function urgentButton() { 
    let img = document.getElementById('task_prio_img_urgent');
    const urgentButton = document.getElementById('urgent_button');

    if (!urgentButton.classList.contains('urgent_button_active')) {
        urgentButton.classList.add('urgent_button_active');
        img.src = '/assets/img/addTask/high_nocolor.png';
    } else {
        urgentButton.classList.remove('urgent_button_active');
        img.src = '/assets/img/addTask/prio_high.png';
    }

    document.getElementById('task_prio_img_medium').src = '/assets/img/addTask/prio_medium.png';
    document.getElementById('task_prio_img_low').src = '/assets/img/addTask/prio_low.png';
    document.getElementById('medium_button').classList.remove('medium_button_active');
    document.getElementById('low_button').classList.remove('low_button_active');
}


function mediumButton() {
    let img = document.getElementById('task_prio_img_medium');
    const mediumButton = document.getElementById('medium_button');

    if (!mediumButton.classList.contains('medium_button_active')) {
        mediumButton.classList.add('medium_button_active');
        img.src = '/assets/img/addTask/medium_nocolor.png';
    } else {
        mediumButton.classList.remove('medium_button_active');
        img.src = '/assets/img/addTask/prio_medium.png';
    }

    document.getElementById('task_prio_img_urgent').src = '/assets/img/addTask/prio_high.png';
    document.getElementById('task_prio_img_low').src = '/assets/img/addTask/prio_low.png';
    document.getElementById('urgent_button').classList.remove('urgent_button_active');
    document.getElementById('low_button').classList.remove('low_button_active');
}


function lowButton() {
    let img = document.getElementById('task_prio_img_low');
    const lowButton = document.getElementById('low_button');

    if (!lowButton.classList.contains('low_button_active')) {
        lowButton.classList.add('low_button_active');
        img.src = '/assets/img/addTask/low_nocolor.png';
    } else {
        lowButton.classList.remove('low_button_active')
        img.src = '/assets/img/addTask/prio_low.png';
    }

    document.getElementById('task_prio_img_urgent').src = '/assets/img/addTask/prio_high.png';
    document.getElementById('task_prio_img_medium').src = '/assets/img/addTask/prio_medium.png';
    document.getElementById('urgent_button').classList.remove('urgent_button_active');
    document.getElementById('medium_button').classList.remove('medium_button_active');
}


function transformSubtaskButton() { 
    const subtaskButton = document.getElementById('subtask_button_input');

    subtaskButton.innerHTML = `
    <div class="add_task_inputs">
        <input id="subtask"  onkeyup="handleKeyUp(event)" id="subtask-input" class="subtask-input" placeholder="Add Subtask">
        <div class="delete_and_check">
            <img onclick="revertBackToButton()" class="exit" id="exit" src="/assets/img/addTask/subtask_delete.png">
            <img src="/assets/img/addTask/subtask_divide.png">
            <img onclick="addNewSubtaskToList()" class="tick" id="tick" src="/assets/img/addTask/subtask_check.png">
        </div>
    </div>
    `;

    subtaskButton.replaceWith(input);
    document.getElementById('subtask-input').focus();
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