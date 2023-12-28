async function getTaskBoardModalValue(i) {
    chosenTask = USERS[ACTIVEUSERKEY].tasks[i]

    let id = chosenTask["id"];
    let title = chosenTask["title"];
    let description = chosenTask["description"];
    let user = chosenTask["user"];
    let date = chosenTask["date"];
    let prio = chosenTask["prio"];
    let category = chosenTask["category"];
    let subtasks = chosenTask["subtasks"];
    let status = chosenTask["status"];
    loadBoardModal(id, title, description, date, category)
    loadBoardModal(prio)
    loadBoardModalAssignedUsers(user)
    loadBoardModalSubtasks(subtasks, status)
}

async function loadBoardModal(id, title, description, date, category) {
    document.getElementById("board_modal_category").innerHTML = category;
    document.getElementById("board_modal_title").innerHTML = title;
    document.getElementById("board_modal_description").innerHTML = description;
    document.getElementById("board_modal_date").innerHTML = date;
    document.getElementById("board_modal_subtasks").innerHTML = subtasks;
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

async function loadBoardModalSubtasks(subtasks, status) {
    const subtaskContainer = document.getElementById("board_modal_subtasks")
    if (subtasks != "undefined") {
        for (let i = 0; i < subtasks.length; i++) {
            subtaskContainer.innerHTML += `
            <div class="task_card_subtask">
            <img id="board_modal_subtask_status" src="/assets/img/board/check_empty.png" alt="checkbox empty">
            <span>${subtasks[subtaskContent]}</span>
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
function loadBoardModalAssignedUsers() {
    const selectElement = document.getElementById("board_modal_assigned_user");
    for (let i = 0; i < userContacts.length; i++) {
        const initial = userContacts[i]["initials"];
        const name = userContacts[i]["name"];
        const color = userContacts[i]["color"];
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
    openSection("sectionBoard");
}
