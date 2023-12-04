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
        <input onkeyup="handleKeyUp(event)" id="subtask_input" class="subtask_input" placeholder="Add new Subtask">
        <div class="delete_and_check">
            <img onclick="revertBackToButton()" class="exit" id="exit" src="/assets/img/addTask/subtask_delete.png">
            <img src="/assets/img/addTask/subtask_divide.png">
            <img onclick="addNewSubtaskToList()" class="tick" id="tick" src="/assets/img/addTask/subtask_check.png">
        </div>
    </div>
    `;

    document.getElementById('subtask_input').focus();
}

function handleKeyUp(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        addNewSubtaskToList();
    }
}

function addNewSubtaskToList() { 
    let newSubtask = document.getElementById('subtask_input').value;

    console.log(newSubtask);

    if (newSubtask != '') {
        subtasksArray.subtaskContent.push(newSubtask);
        subtasksArray.subtaskStatus.push(0);
        renderSubtaskContainer();
        revertBackToButton();
    } else {
        document.getElementById('subtask_is_required').classList.remove('d-none');
    }
}

function renderSubtaskContainer() { 
    let subtaskContainer = document.getElementById('new_subtask_list');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < subtasksArray.subtaskContent.length; i++) {
        const addedTask = subtasksArray.subtaskContent[i];
        subtaskContainer.innerHTML +=
            `<li id="subtask_list_item${i}" class="add_subtask_list">
        <div style="display: flex; align-items: center; gap: 8px;">
            <input readonly id="readonly_input${i}" value="${addedTask}"
                class="input_edit_subtask"></input>
            <div id="edit_and_delete${i}" class="edit_and_delete">
                <img id="edit${i}" onclick="editSubtask(${i})" src="/assets/img/addTask/edit.png">
                <img src="/assets/img/addTask/subtask_divide.png">
                <img id="delete${i}" onclick="deleteSubtaskItem(${i})" class="delete" src="/assets/img/addTask/delete.png"
            </div>
        </div>
    </li>`;
    }
}

function editSubtask(i) { 
    const editIcons = document.getElementById(`edit_and_delete${i}`);
    editIcons.innerHTML = "";
    editIcons.innerHTML = `
        <img id="delete${i}" onclick="deleteSubtaskItem(${i})" class="delete" src="/assets/img/addTask/delete.png"
        <img src="/assets/img/addTask/subtask_divide.png">
        <img src="/assets/img/addTask/subtask_divide.png">
        <img onclick="acceptChanges(${i})" src="/assets/img/addTask/subtask_check.png">
    `;
    const changeBackground = document.getElementById('new_subtask_list')
    changeBackground.classList.add('edit_subtask_list');

    const listItem = document.getElementById(`subtask_list_item${i}`);
    listItem.classList.add('editable_list_element');
    listItem.classList.remove('addsubtask_list_element');

    const input = document.getElementById(`readonly_input${i}`);
    input.removeAttribute('readonly');
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
}

function acceptChanges(i) {
    let replacingElement = document.getElementById(`readonly_input${i}`).value;
    subtasksArray.subtaskContent.splice(i, 1, replacingElement);
    document.getElementById('new_subtask_list').classList.remove('edit_subtask_list');
    renderSubtaskContainer();
}

function deleteSubtaskItem(i) {
    subtasksArray.subtaskContent.splice(i, 1);
    subtasksArray.subtaskStatus.splice(i, 1);
    document.getElementById('new_subtask_list').classList.remove('edit_subtask_list');
    renderSubtaskContainer();
}

function revertBackToButton() {
    const subtaskButton = document.getElementById('subtask_button_input');

    subtaskButton.innerHTML = `
    <button class="add_task_inputs" id="task_subtask_button" onclick="transformSubtaskButton()" type="text">
    <span>Add new Subtask</span>
    <img src="/assets/img/addTask/add_subtask.png" alt=""></button>
    `;
}

