
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
            <li class="assigned_user_li">
                <div class="task_contacts_name_initials">
                    <div id="initials_img${i}" class="assigned_initials" style="background-color:#${color};">${initial}</div>
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
    modalTaskAddContacts(id);
    modalTaskAddSubtasks(id)
}

function modalTaskFillValues(id) {
    let chosenTask = USERS[ACTIVEUSERKEY].tasks[id];
    document.getElementById('modal_task_title').value = chosenTask["title"];
    document.getElementById('modal_task_description').value = chosenTask["description"];
    document.getElementById('modal_task_date').value = chosenTask["date"];
    document.getElementById('modal_task_category').value = chosenTask["category"];
}

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

function modalTaskAddPrio(){
    placeholder
}

function modalTaskAddSubtasks(id){
    let subtasks = USERS[ACTIVEUSERKEY].tasks[id].subtasks;
    let subtaskContainer = document.getElementById('modal_subtask_list');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < subtasks.subtaskContent.length; i++) {
        const addedTask = subtasks.subtaskContent[i];
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
