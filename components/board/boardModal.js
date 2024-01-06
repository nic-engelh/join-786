
let ID = "";

function showBoardModal() {
    const dialog = document.getElementById("board_modal");
    dialog.classList.remove('visually-hidden');
    dialog.classList.add('d-flex');
    dialog.showModal();
}

async function getTaskBoardModalValue(id) {
    chosenTask = USERS[ACTIVEUSERKEY].tasks[id];
    let title = chosenTask["title"];
    let description = chosenTask["description"];
    let user = chosenTask["user"];
    let date = chosenTask["date"];
    let prio = chosenTask["prio"];
    let category = chosenTask["category"];
    let subtasks = chosenTask["subtasks"].subtaskContent;
    let status = chosenTask["status"];
    ID = id
    showBoardModal();
    loadBoardModal(id, title, description, date, category);
    loadBoardModalPrio(prio);
    loadBoardModalAssignedUsers(user);
    loadBoardModalSubtasks(subtasks, status, id);
}

async function loadBoardModal(id, title, description, date, category) {
    document.getElementById("board_modal_category").innerHTML = category;
    document.getElementById("board_modal_title").innerHTML = title;
    document.getElementById("board_modal_description").innerHTML = description;
    document.getElementById("board_modal_date").innerHTML = date;
    document.getElementById("board_modal_edit_task_button").innerHTML =`
        <div onclick="openBoardModalEditTask('${id}')">
            <img src="/assets/img/board/edit.png" alt="edit">
                <span class="task_category_font">Edit</span>
        </div>`;
    document.getElementById("subtask_button_input_modal").innerHTML =`
    <button class="add_task_inputs" id="task_subtask_button_modal" onclick="transformSubtaskButtonModal('${id}')" type="text"><span>Add new Subtask</span><img src="/assets/img/addTask/add_subtask.png" alt=""></button>
    `;
    document.getElementById("modal_edit_task_finish").innerHTML =`
    <button id="create_task_button" value="Create Task " onclick="formValidationModal('${id}')"><span>OK</span><img src="/assets/img/addTask/check_icon.png" alt=""></button>
    `;
}

async function loadBoardModalPrio(prio) {
    let prioSpan = document.getElementById("board_modal_prio_span")
    let prioImg = document.getElementById("board_modal_prio_img")
    if (prio == "urgent") {
        prioSpan.innerHTML = "Urgent";
        prioImg.innerHTML = `<img src="/assets/img/board/prio_high.png" alt="Prio High">`;
    }

    if (prio == "medium") {
        prioSpan.innerHTML = "Medium";
        prioImg.innerHTML = `<img src="/assets/img/board/prio_medium.png" alt="Prio Medium">`;
    }

    if (prio == "low") {
        prioSpan.innerHTML = "Low";
        prioImg.innerHTML = `<img src="/assets/img/board/prio_low.png" alt="Prio Low">`;
    }
}

async function loadBoardModalSubtasks(subtasks, status, id) {
    const subtaskContainer = document.getElementById("board_modal_subtasks");
    subtaskContainer.innerHTML = "";
    if (subtasks != "undefined") {
        for (let i = 0; i < subtasks.length; i++) {
            subtaskContainer.innerHTML += `
            <div class="task_card_subtask">
            <img id="board_modal_subtask_status_${id}" src="/assets/img/board/check_empty.png" alt="checkbox empty">
            <span>${subtasks[i]}</span>
          </div>`;
        }
    }
}

async function loadBoardModalSubtasksStatus(subtasks, status) {
    const subtaskContainer = document.getElementById("board_modal_subtasks")
    if (subtasks != "undefined") {
        for (let i = 0; i < subtasks.length; i++) {
            subtaskContainer.innerHTML += subtasks[i];
        }
    }
}

/**
 * This function loads the users
 * 
 * 
 */
function loadBoardModalAssignedUsers(user) {
    const selectElement = document.getElementById("board_modal_assigned_user");

    selectElement.innerHTML = "";
    for (let i = 0; i < user.length; i++) {
        const initial = user[i]["initials"];
        const name = user[i]["name"];
        const color = user[i]["color"];
        selectElement.innerHTML += `
            <li onclick="chooseContactModal(${i})" id="toggle_name_modal${i}" class="assigned_user_li">
                <div class="task_contacts_name_initials">
                    <div id="modal_initials_img${i}" class="assigned_initials" style="background-color:#${color};">${initial}</div>
                    <span id="assigned_name_span">${name}</span>
                </div>
            </li>`;
    }
}

/**
 * This function closes the modal
 * 
 * 
 */
function closeBoardModal() {
    const dialog = document.getElementById("board_modal");
    dialog.classList.add('visually-hidden');
    dialog.classList.remove('d-flex');
    dialog.close();
    updateBoardHTML()
}

/**
 * This function closes the modal
 * 
 * 
 */
function closeBoardModalTask() {
    const dialog = document.getElementById("board_modal_task");
    dialog.classList.add('visually-hidden');
    dialog.classList.remove('d-flex');
    dialog.close();
    updateBoardHTML()
}

/**
 * This function adds the event that hides the board_modal when clicking somewhere else
 * 
 * 
 */
function eventCloseBoardModal(event) {
    const dialog = document.getElementById("board_modal");
    if (!event.target.contains(dialog)) return;
    closeBoardModal()
}

/**
 * This function adds the event that hides the board_modal_task when clicking somewhere else
 * 
 * 
 */
function eventCloseBoardModalTask(event) {
    const dialogTask = document.getElementById("board_modal_task");
    if (!event.target.contains(dialogTask)) return;
    closeBoardModalTask()
}

/**
 * This is an event when you click
 * 
 * 
 */
document.addEventListener("click", eventCloseBoardModal);
document.addEventListener("click", eventCloseBoardModalTask);



///////////////////////////////////edit Task Modal///////////////////////////////////////////////////



/**
 * This function opens the editor for the Task
 * 
 * 
 */
function openBoardModalEditTask(id) {
    const dialogTask = document.getElementById("board_modal_task");
    closeBoardModal()
    dialogTask.classList.toggle('visually-hidden');
    dialogTask.classList.add('d-flex');
    dialogTask.showModal();
    modalTaskFillValues(id);
    modalTaskAddPrio(id);
    modalTaskAddContacts(id);
    editTaskLoadUsers();
    modalTaskAddSubtasks(id);
}

/**
 * This function fills the edit task modal with title, description, date and category
 * 
 * 
 */
function modalTaskFillValues(id) {
    let chosenTask = USERS[ACTIVEUSERKEY].tasks[id];
    document.getElementById('modal_task_title').value = chosenTask["title"];
    document.getElementById('modal_task_description').value = chosenTask["description"];
    document.getElementById('modal_task_date').value = chosenTask["date"];
    document.getElementById('modal_task_category').value = chosenTask["category"];
}

/**
 * This function toggles the visibility of the tasks_contacts_container
 * 
 * 
 */
function toggleSelectModal() {
    document.getElementById('modal_tasks_contacts_container').classList.toggle('d-none');
}

/**
 * This function adds the event that hides the contact selection when clicking somewhere else than the contact selection
 * 
 * 
 */
function hideContactSelect(event) {
    let nameContainer = document.getElementById('modal_tasks_contacts_container');
    if (nameContainer) {
        if (event.target.id !== "modal_task_user" && event.target.id !== "modal_assigned_user" && !event.target.classList.contains('assigned_user_li') && !event.target.classList.contains('assigned_user_li_toggled') && !event.target.classList.contains('checkbox') && !event.target.classList.contains('assigned_initials') && event.target.id !== "assigned_name_span") {
            nameContainer.classList.add("d-none");
        }
    }
}

/**
 * This function loads all users in the edit Task modal 
 * 
 * 
 */
function editTaskLoadUsers() {
    const selectElement = document.getElementById("modal_assigned_user");
    let user = USERS[ACTIVEUSERKEY].contacts
    selectElement.innerHTML = "";
    for (let i = 0; i < user.length; i++) {
        const initial = user[i]["initials"];
        const name = user[i]["name"];
        const color = user[i]["color"];
        selectElement.innerHTML += `
            <li onclick="chooseContactModal(${i})" id="toggle_name_modal${i}" class="assigned_user_li">
                <div class="task_contacts_name_initials">
                    <div id="modal_initials_img${i}" class="assigned_initials" style="background-color:#${color};">${initial}</div>
                    <span id="assigned_name_span">${name}</span>
                </div>
                <img class="checkbox" id="checkboxModal${i}" src="/assets/img/addTask/check_empty.png">
            </li>`;
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
function chooseContactModal(i) {
    let li = document.getElementById(`toggle_name_modal${i}`);
    let checkbox = document.getElementById(`checkboxModal${i}`);

    li.classList.toggle('assigned_user_li_toggled');

    if (checkbox.src.endsWith('/assets/img/addTask/check_empty.png')) {
        checkbox.src = '/assets/img/addTask/check_checked.png';
    } else {
        checkbox.src = '/assets/img/addTask/check_empty.png';
    }

    pushAssignedContactModal(i, li);
}

/**
 * This function is used to push the assigned user in userContacts
 * 
 * 
 */
async function pushAssignedContactModal(i, li) {
    const name = await userContacts[i];
    
    const index = await assignedToTask.indexOf(name);

    if (li.classList.contains('assigned_user_li_toggled')) {
        assignedToTask.push(name);
    } else { assignedToTask.splice(index, 1) }
    showAssignedInitialsModal(i);
}

/**
 * This function shows the initials of the chosen user with his colors
 * 
 * 
 */
function showAssignedInitialsModal(i) {
    const toBeAssigned = userContacts[i]['initials'];
    const index = assignedInitial.indexOf(toBeAssigned);
    let checkbox = document.getElementById(`checkboxModal${i}`);
    let container = document.getElementById('modal_task_assigned_user');

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
 * This function fills the edit task modal with the assigned users
 * 
 * 
 */
function modalTaskAddContacts(id){
    let chosenTaskUser = USERS[ACTIVEUSERKEY].tasks[id].user;
    const container = document.getElementById("modal_task_assigned_user");
    container.innerHTML = "";
    for (let j = 0; j < chosenTaskUser.length; j++) {
        let displayedInitial = chosenTaskUser[j].initials;
        let color = chosenTaskUser[j].color;            
        container.innerHTML += `<span id="assigned_initials${j}" class="assigned_initials" style="background-color:#${color};">${displayedInitial}</span>`;
    }
}

/**
 * This function fills the edit task modal with the priority
 * 
 * 
 */
function modalTaskAddPrio(id) {
    let prio = USERS[ACTIVEUSERKEY].tasks[id].prio;
    const urgentButton = document.getElementById('urgent_button_modal');
    const mediumButton = document.getElementById('medium_button_modal');
    const lowButton = document.getElementById('low_button_modal');

    if(prio == 'urgent') {
        urgentButton.classList.add('urgent_button_active');
        document.getElementById('task_prio_img_urgent_modal').src = '/assets/img/addTask/high_nocolor.png';
    } else if (prio == 'medium') {
        mediumButton.classList.add('medium_button_active');
        document.getElementById('task_prio_img_medium_modal').src = '/assets/img/addTask/medium_nocolor.png';
    } else if (prio =='low') {
        lowButton.classList.add('low_button_active');
        document.getElementById('task_prio_img_low_modal').src = '/assets/img/addTask/low_nocolor.png';
    }
}

/**
 * This function is used to fetch the chosen priority
 * 
 *  
 */
function getPriorityModal() {
    const urgentButton = document.getElementById('urgent_button_modal');
    const mediumButton = document.getElementById('medium_button_modal');
    const lowButton = document.getElementById('low_button_modal');

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
function urgentButtonModal() {
    let img = document.getElementById('task_prio_img_urgent_modal');
    const urgentButton = document.getElementById('urgent_button_modal');

    if (!urgentButton.classList.contains('urgent_button_active')) {
        urgentButton.classList.add('urgent_button_active');
        img.src = '/assets/img/addTask/high_nocolor.png';
    } else {
        urgentButton.classList.remove('urgent_button_active');
        img.src = '/assets/img/addTask/prio_high.png';
    }

    document.getElementById('task_prio_img_medium_modal').src = '/assets/img/addTask/prio_medium.png';
    document.getElementById('task_prio_img_low_modal').src = '/assets/img/addTask/prio_low.png';
    document.getElementById('medium_button_modal').classList.remove('medium_button_active');
    document.getElementById('low_button_modal').classList.remove('low_button_active');
}

/**
 * This function is used to set the priority to medium and set the medium button active
 * 
 * 
 */
function mediumButtonModal() {
    let img = document.getElementById('task_prio_img_medium_modal');
    const mediumButton = document.getElementById('medium_button_modal');

    if (!mediumButton.classList.contains('medium_button_active')) {
        mediumButton.classList.add('medium_button_active');
        img.src = '/assets/img/addTask/medium_nocolor.png';
    } else {
        mediumButton.classList.remove('medium_button_active');
        img.src = '/assets/img/addTask/prio_medium.png';
    }

    document.getElementById('task_prio_img_urgent_modal').src = '/assets/img/addTask/prio_high.png';
    document.getElementById('task_prio_img_low_modal').src = '/assets/img/addTask/prio_low.png';
    document.getElementById('urgent_button_modal').classList.remove('urgent_button_active');
    document.getElementById('low_button_modal').classList.remove('low_button_active');
}

/**
 * This function is used to set the priority to low and set the low button active
 * 
 * 
 */
function lowButtonModal() {
    let img = document.getElementById('task_prio_img_low_modal');
    const lowButton = document.getElementById('low_button_modal');

    if (!lowButton.classList.contains('low_button_active')) {
        lowButton.classList.add('low_button_active');
        img.src = '/assets/img/addTask/low_nocolor.png';
    } else {
        lowButton.classList.remove('low_button_active')
        img.src = '/assets/img/addTask/prio_low.png';
    }

    document.getElementById('task_prio_img_urgent_modal').src = '/assets/img/addTask/prio_high.png';
    document.getElementById('task_prio_img_medium_modal').src = '/assets/img/addTask/prio_medium.png';
    document.getElementById('urgent_button_modal').classList.remove('urgent_button_active');
    document.getElementById('medium_button_modal').classList.remove('medium_button_active');
}


function transformSubtaskButtonModal(id) {
    const subtaskButton = document.getElementById('subtask_button_input_modal');

    subtaskButton.innerHTML = `
    <div class="add_task_inputs">
        <input onkeyup="handleKeyUp(event)" id="subtask_input_modal" class="subtask_input" placeholder="Add new Subtask">
        <div class="delete_and_check">
            <img onclick="revertBackToButtonModal('${id}')" class="exit" id="exit" src="/assets/img/addTask/subtask_delete.png">
            <img src="/assets/img/addTask/subtask_divide.png">
            <img onclick="addNewSubtaskToListModal('${id}')" class="tick" id="tick" src="/assets/img/addTask/subtask_check.png">
        </div>
    </div>
    `;

    document.getElementById('subtask_input_modal').focus();
}

/**
 * This function is used to revert the subtask input into a button
 * 
 * 
 */
function revertBackToButtonModal(id) {
    const subtaskButton = document.getElementById('subtask_button_input_modal');

    subtaskButton.innerHTML = `
    <button class="add_task_inputs" id="task_subtask_button_modal" onclick="transformSubtaskButtonModal('${id}')" type="text">
    <span>Add new Subtask</span><img src="/assets/img/addTask/add_subtask.png" alt="">
    </button>
    `;
}

/**
 * This function is used as means to confirm your new subtask with an 'enter' command on the keyboard
 * 
 * 
 */
function handleKeyUp(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        addNewSubtaskToListModal(ID);
    }
}

/**
 * This function pushes the new subtask to the subtasks arrays
 * 
 * 
 */
function addNewSubtaskToListModal(id) {
    let newSubtask = document.getElementById('subtask_input_modal').value;
    let subtasks = USERS[ACTIVEUSERKEY].tasks[id].subtasks;

    if (newSubtask != '') {
        subtasks.subtaskContent.push(newSubtask);
        subtasks.subtaskStatus.push(0);
        modalTaskAddSubtasks(id);
        revertBackToButton();
    } else {
        document.getElementById('subtask_is_required').classList.remove('d-none');
    }
}

/**
 * This function fills the edit task modal with the subtasks
 * 
 * 
 */
function modalTaskAddSubtasks(id){
    let subtasks = USERS[ACTIVEUSERKEY].tasks[id].subtasks;
    let subtaskContainer = document.getElementById('modal_subtask_list');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < subtasks.subtaskContent.length; i++) {
        const addedTask = subtasks.subtaskContent[i];
        subtaskContainer.innerHTML +=
            `<li id="subtask_list_item${i}" class="add_subtask_list">
        <div style="display: flex; align-items: center; gap: 8px;">
            <input readonly id="readonlyInputModal${i}" value="${addedTask}"
                class="input_edit_subtask"></input>
            <div id="editAndDeleteModal${i}" class="edit_and_delete">
                <img id="editModalSubtask${i}" onclick="editModalSubtask(${i}, '${id}')" src="/assets/img/addTask/edit.png">
                <img src="/assets/img/addTask/subtask_divide.png">
                <img id="deleteModalSubtask${i}" onclick="modalDeleteSubtask(${i}, '${id}')" class="delete" src="/assets/img/addTask/delete.png"
            </div>
        </div>
    </li>`;
    }
}

/**
 * This function is used to delete a subtask
 * 
 * 
 */
function modalDeleteSubtask(i, id) {
    let subtask = USERS[ACTIVEUSERKEY].tasks[id].subtasks;
    subtask.subtaskContent.splice(i, 1);
    subtask.subtaskStatus.splice(i, 1);
    document.getElementById('new_subtask_list').classList.remove('edit_subtask_list');
    modalTaskAddSubtasks(id);
}

/**
 * This function is used to edit an existing subtask
 * 
 * 
 */
function editModalSubtask(i, id) {
    const editIcons = document.getElementById(`editAndDeleteModal${i}`);
    editIcons.innerHTML = "";
    editIcons.innerHTML = `
        <img id="delete${i}" onclick="deleteSubtaskItem(${i})" class="delete" src="/assets/img/addTask/delete.png"
        <img src="/assets/img/addTask/subtask_divide.png">
        <img src="/assets/img/addTask/subtask_divide.png">
        <img onclick="acceptChangesModal(${i}, '${id}')" src="/assets/img/addTask/subtask_check.png">
    `;
    const changeBackground = document.getElementById('new_subtask_list')
    changeBackground.classList.add('edit_subtask_list');

    const listItem = document.getElementById(`subtask_list_item${i}`);
    listItem.classList.add('editable_list_element');
    listItem.classList.remove('addsubtask_list_element');

    const input = document.getElementById(`readonlyInputModal${i}`);
    input.removeAttribute('readonly');
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
}

/**
 * This function is used to confirm the changes to the subtask and close the edit input
 * 
 *  
 */
function acceptChangesModal(i, id) {
    let subtask = USERS[ACTIVEUSERKEY].tasks[id].subtasks;
    let replacingElement = document.getElementById(`readonlyInputModal${i}`).value;
    subtask.subtaskContent.splice(i, 1, replacingElement);
    document.getElementById('new_subtask_list').classList.remove('edit_subtask_list');
    modalTaskAddSubtasks(id);
}

async function boardModalDeleteTask() {
    if (!(ID in USERS[ACTIVEUSERKEY].tasks)) {
        console.log("Error, key can't be found")
        return false;
    };
    delete USERS[ACTIVEUSERKEY].tasks[ID];
    ID = null;
    closeBoardModal();
    await setStorageData("user", USERS);
    showSuccessInfo("3"); 
    // show modal task deleted
    // TODO set local user storage
}

async function formValidationModal(id) {
    let title = document.getElementById('modal_task_title');
    let date = document.getElementById('modal_task_date');
    let category = document.getElementById('modal_task_category');

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
        await getTaskValueModal();
        closeBoardModalTask()
        await updateBoardHTML(); // TODO it does not work. Why? -> visually-hidden ? The elements can not be accessed? Onclick better?
    }
}

/**
 * This function is used to fetch all the data for the new task from inputs and functions
 * 
 * @param {string} inputStatus This variable sets the status
 */
async function getTaskValueModal(inputStatus) {
    let id = ID;
    let title = document.getElementById('modal_task_title').value;
    let description = document.getElementById('modal_task_description').value;
    let user = assignedToTask;
    let date = document.getElementById('modal_task_date').value;
    let prio = getPriorityModal();
    let category = document.getElementById('modal_task_category').value;
    let subtasks = USERS[ACTIVEUSERKEY].tasks[id].subtasks;
    let status = USERS[ACTIVEUSERKEY].tasks[id].status;
    let dateCreated = USERS[ACTIVEUSERKEY].tasks[id].dateCreated;

    pushTaskModal(id, title, description, user, date, prio, category, subtasks, status, dateCreated);
}

/**
 * This function is used to push all the data for the new task in the tasks object
 * 
 * @param {object} tasks this is the object where the task is compiled
 */
function pushTaskModal(id, title, description, user, date, prio, category, subtasks, status, dateCreated) {
    tasks[id] = {
        id: id,
        title: title,
        description: description,
        prio: prio,
        date: date,
        category: category,
        user: user,
        subtasks: subtasks,
        status: status,
        dateCreated: dateCreated
    }
    pushUSERS();
}