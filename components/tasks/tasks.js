
// userContacts = USERS[ACTIVEUSERKEY].contacts; 
// userContacts will be set in uitils.js with setVariables()


let assignedToTask = [];
let assignedInitial = [];

let tasks = {};

let subtasksArray = {
    'subtaskContent': [],
    'subtaskStatus': []
};


/**
 * This function is used to fetch all the data for the new task from inputs and functions
 * 
 * @param {string} inputStatus This variable sets the status
 */
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

/**
 * This function is used to push all the data for the new task in the tasks object
 * 
 * @param {object} tasks this is the object where the task is compiled
 */
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

/**
 * This function is used to push the object tasks to guest and active User
 * 
 * 
 */
function pushUSERS(){
    if (!USERS[ACTIVEUSERKEY].tasks) {
        // add tasks object to active user object
        USERS[ACTIVEUSERKEY]["tasks"] = {};
    }
    USERS[ACTIVEUSERKEY].tasks = Object.assign.apply(USERS[ACTIVEUSERKEY].tasks, tasks);
    USERS["guest"].tasks = Object.assign.apply(USERS["guest"].tasks, tasks);
    setLocalStorage ("localUserTasks", tasks);
    setLocalStorage ("localGuestTasks", tasks);
    updateStorageData("users", USERS);
}

/**
 * This function is used to reset the add task inputs, images, classes and divs
 * 
 * 
 */
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

/**
 * This function is used to fetch the chosen priority
 * 
 *  
 */
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

/**
 * This function is used to set the priority to urgent and set the urgent button active
 * 
 * 
 */
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

/**
 * This function is used to set the priority to medium and set the medium button active
 * 
 * 
 */
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

/**
 * This function is used to set the priority to low and set the low button active
 * 
 * 
 */
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

/**
 * This function is used to transform the addSubtask button into an input and focus it
 * 
 * 
 */
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

/**
 * This function is used as means to confirm your new subtask with an 'enter' command on the keyboard
 * 
 * 
 */
function handleKeyUp(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        addNewSubtaskToList();
    }
}

/**
 * This function pushes the new subtask to the subtasks arrays
 * 
 * 
 */
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

/**
 * This function renders the subtask container with the subtasks in the subtask arrays
 * 
 * 
 */
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

/**
 * This function is used to edit an existing subtask
 * 
 * 
 */
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

/**
 * This function is used to confirm the changes to the subtask and close the edit input
 * 
 *  
 */
function acceptChanges(i) {
    let replacingElement = document.getElementById(`readonly_input${i}`).value;
    subtasksArray.subtaskContent.splice(i, 1, replacingElement);
    document.getElementById('new_subtask_list').classList.remove('edit_subtask_list');
    renderSubtaskContainer();
}

/**
 * This function is used to delete a subtask
 * 
 * 
 */
function deleteSubtaskItem(i) {
    subtasksArray.subtaskContent.splice(i, 1);
    subtasksArray.subtaskStatus.splice(i, 1);
    document.getElementById('new_subtask_list').classList.remove('edit_subtask_list');
    renderSubtaskContainer();
}

/**
 * This function is used to revert the subtask input into a button
 * 
 * 
 */
function revertBackToButton() {
    const subtaskButton = document.getElementById('subtask_button_input');

    subtaskButton.innerHTML = `
    <button class="add_task_inputs" id="task_subtask_button" onclick="transformSubtaskButton()" type="text">
    <span>Add new Subtask</span>
    <img src="/assets/img/addTask/add_subtask.png" alt=""></button>
    `;
}

/**
 * This function is used to filter by variables
 * 
 * 
 */
function filterByVariable(array, variable, value) {
    return array.find(item => item[variable] == value);
  }

/**
 * This function loads the users
 * 
 * 
 */
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
 * This function toggles the visibility of the tasks_contacts_container
 * 
 * 
 */
function toggleSelect() {
    document.getElementById('tasks_contacts_container').classList.toggle('d-none');
}

/**
 * This function adds the event that hides the contact selection when clicking somewhere else than the contact selection
 * 
 * 
 */
function hideContactSelect(event) {
    let nameContainer = document.getElementById('tasks_contacts_container');
    if (nameContainer) {
        if (event.target.id !== "task_user" && event.target.id !== "assigned_user" && !event.target.classList.contains('assigned_user_li') && !event.target.classList.contains('assigned_user_li_toggled') && !event.target.classList.contains('checkbox') && !event.target.classList.contains('assigned_initials') && event.target.id !== "assigned_name_span") {
            nameContainer.classList.add("d-none");
        }
    }
}

/**
 * This is an event when you click
 * 
 * 
 */
document.addEventListener("click", hideContactSelect);

/**
 * This function is used to assign a user and show it with css and images
 * 
 * 
 */
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

/**
 * This function is used to push the assigned user in userContacts
 * 
 * 
 */
async function pushAssignedContact(i, li) {
    const name = await userContacts[i];
    
    const index = await assignedToTask.indexOf(name);

    if (li.classList.contains('assigned_user_li_toggled')) {
        assignedToTask.push(name);
    } else { assignedToTask.splice(index, 1) }
    showAssignedInitials(i);
}

/**
 * This function shows the initials of the chosen user with his colors
 * 
 * 
 */
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

/**
 * This function validates if every required input was filled out and marks them if not
 * 
 * 
 */
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
        await openSection("sectionBoard");
        await updateBoardHTML(); // TODO it does not work. Why? -> visually-hidden ? The elements can not be accessed? Onclick better?
    }
}

/**
 * This function shows the succes of adding the task with a dialog
 * 
 * 
 */
function showSuccess() {
    const dialog = document.getElementById("succes_alert_addedTask");
    dialog.classList.add('d-flex');
    dialog.showModal();
    setTimeout(() => dialog.close(), 1000);
    dialog.classList.toggle('d-flex');
}