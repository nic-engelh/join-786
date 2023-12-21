
// userContacts = USERS[ACTIVEUSERKEY].contacts; 
// userContacts will be set in uitils.js with setVariables()


let assignedToTask = [];
let assignedInitial = [];

let tasks = {};

let subtasksArray = {
    'subtaskContent': [],
    'subtaskStatus': []
};

async function getTaskValue(inputStatus) {
    let dateCreated = new Date().getTime();
    let id = randomString();
    let title = document.getElementById('task_title').value;
    let description = document.getElementById('task_description').value;
    let user = assignedToTask;
    let date = document.getElementById('task_date').value;
    let prio = getPriority();
    let category = document.getElementById('task_category').value;
    let subtasks = subtasksArray;
    let status;
    if (inputStatus) {
        status = inputStatus;
    };
    status = 'To Do';

    pushTask(dateCreated, id, title, description, user, date, prio, category, subtasks, status);
}

function pushTask(dateCreated, id, title, description, user, date, prio, category, subtasks, status) {
    tasks[id] = {
        dateCreated: dateCreated,
        id: id,
        title: title,
        description: description,
        prio: prio,
        date: date,
        category: category,
        user: user,
        subtasks: subtasks,
        status: status
    }
    pushUSERS();
    resetTask();
}

function pushUSERS(){
    if (!USERS[ACTIVEUSERKEY].tasks) {
        // add tasks object to acitve user object
        USERS[ACTIVEUSERKEY]["tasks"] = {};
    }
    USERS[ACTIVEUSERKEY].tasks = tasks;
    USERS["guest"].tasks = tasks;
}

function resetTask() {
    document.getElementById('task_title').value = '';
    document.getElementById('task_title').style.border = '1px solid #d1d1d1';
    document.getElementById('title_is_required').classList.add('d-none');
    document.getElementById('task_description').value = '';
    document.getElementById('task_user').value = '';
    document.getElementById('task_date').value = '';
    document.getElementById('task_date').style.border = '1px solid #d1d1d1';;
    document.getElementById('date_is_required').classList.add('d-none');
    document.getElementById('urgent_button').classList.remove('urgent_button_active');
    document.getElementById('task_prio_img_urgent').src = '/assets/img/addTask/prio_high.png';
    document.getElementById('medium_button').classList.remove('medium_button_active');
    document.getElementById('task_prio_img_medium').src = '/assets/img/addTask/prio_medium.png';
    document.getElementById('low_button').classList.remove('low_button_active');
    document.getElementById('task_prio_img_low').src = '/assets/img/addTask/prio_low.png';
    document.getElementById('task_category').value = '';
    document.getElementById('task_category').style.border = '1px solid #d1d1d1';;
    document.getElementById('category_is_required').classList.add('d-none');
    document.getElementById('assigned_user_initials').innerHTML = '';
    document.getElementById('tasks_contacts_container').classList.add('d-none');
    document.getElementById('new_subtask_list').innerHTML = '';
    assignedToTask = [];
    assignedInitial = [];
    const checkboxes = document.getElementsByClassName('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].src = '/assets/img/addTask/check_empty.png';
    }
    const assignedNameLI = document.getElementsByClassName('assigned_user_li');
    for (let i = 0; i < assignedNameLI.length; i++) {
        assignedNameLI[i].classList.remove('assigned_user_li_toggled');}
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

function filterByVariable(array, variable, value) {
    return array.find(item => item[variable] == value);
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

function toggleSelect() {
    document.getElementById('tasks_contacts_container').classList.toggle('d-none');
}

function chooseContact(i) {
    let li = document.getElementById(`toggle_name${i}`);
    let checkbox = document.getElementById(`checkbox${i}`);

    li.classList.toggle('assigned_user_li_toggled');

    if (checkbox.src.endsWith('/assets/img/addTask/check_empty.png')) {
        checkbox.src = '/assets/img/addTask/check_checked.png';
    } else {
        checkbox.src = '/assets/img/addTask/check_empty.png';
    }

    pushAssignedContact(i, li);
}

async function pushAssignedContact(i, li) {
    const name = await userContacts[i];
    
    const index = await assignedToTask.indexOf(name);

    if (li.classList.contains('assigned_user_li_toggled')) {
        assignedToTask.push(name);
    } else { assignedToTask.splice(index, 1) }
    showAssignedInitials(i);
}

function showAssignedInitials(i) {
    const toBeAssigned = userContacts[i]['initials'];
    const index = assignedInitial.indexOf(toBeAssigned);
    let checkbox = document.getElementById(`checkbox${i}`);
    let container = document.getElementById('assigned_user_initials');

    if (checkbox.src.endsWith('check_checked.png')) {
        assignedInitial.push(toBeAssigned);
    } else {
        if (index !== -1) {
            assignedInitial.splice(index, 1);
        }
    }

    container.innerHTML = '';
    for (let j = 0; j < assignedInitial.length; j++) {
        const displayedInitial = assignedInitial[j];
        let color = userContacts[j]["color"];            
        container.innerHTML += `<span id="assigned_initials${i}" class="assigned_initials" style="background-color:#${color};">${displayedInitial}</span>`;
    }
}

async function formValidation(status) {
    let title = document.getElementById('task_title');
    let date = document.getElementById('task_date');
    let category = document.getElementById('task_category');

    if (title.value == '') {
        title.style.border = '1px solid red';
        document.getElementById('title_is_required').classList.remove('d-none');
    };
    if (date.value == '') {
        date.style.border = '1px solid red';
        document.getElementById('date_is_required').classList.remove('d-none');
    };
    if (category.value == '') {
        category.style.border = '1px solid red';
        document.getElementById('category_is_required').classList.remove('d-none');
    };

    if (
        title.value !== '' &&
        date.value !== '' &&
        category.value !== ''
    ) {
        await getTaskValue(status);
        showSuccess();
        openSection("sectionBoard");
    }
}

function showSuccess() {
    const dialog = document.getElementById("succes_alert_addedTask");
    dialog.style.display = 'flex';
    dialog.showModal();
}

// function openBoard() {
//     setTimeout(() => {
//         window.location.replace("/components/board/board.html");
//     }, "1000");
// }
