
function showBoardModal() {
    const dialog = document.getElementById("board_modal");
    dialog.classList.toggle('visually-hidden');
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
    const subtaskContainer = document.getElementById("board_modal_subtasks")
    if (subtasks != "undefined") {
        for (let i = 0; i < subtasks.length; i++) {
            subtaskContainer.innerHTML = "";
            subtaskContainer.innerHTML += `
            <div class="task_card_subtask">
            <img id="board_modal_subtask_status_${id}" src="/assets/img/board/check_empty.png" alt="checkbox empty">
            <span>${subtasks}</span>
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
    for (let i = 0; i < user.length; i++) {
        const initial = user[i]["initials"];
        const name = user[i]["name"];
        const color = user[i]["color"];
        selectElement.innerHTML = "";
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
 * This function opens the editor for the Task
 * 
 * 
 */
function boardModalEditTask() {
    placeholder
}

/**
 * This function closes the modal
 * 
 * 
 */
function closeBoardModal() {
    const dialog = document.getElementById("board_modal");
    dialog.classList.toggle('visually-hidden');
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
 * This is an event when you click
 * 
 * 
 */
document.addEventListener("click", eventCloseBoardModal);
