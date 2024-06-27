





document.addEventListener('DOMContentLoaded', function() {

    var path = window.location.pathname;
    if(path === '/pm/project_details.html'){
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project_id');        
        sendAjaxGetRequest('GET',`/pm/services/includes/get_project_details.php?project_id=${projectId}`, taskSelectUsers);
    }

    if(path === "/pm/discussion_board.html"){
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project_id');
        sendAjaxGetRequest('GET', `/pm/services/includes/get_project_details.php?project_id=${projectId}`, projectDetails);
    }
    if(path === "/pm/project_details.html"){
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project_id');
    
        sendAjaxGetRequest('GET', `/pm/services/includes/get_project_details.php?project_id=${projectId}`, projectDetails);
        
        sendAjaxGetRequest('GET',`/pm/services/includes/get_project_details.php?project_id=${projectId}`, projectForUpdate);
        sendAjaxGetRequest('GET',`/pm/services/includes/get_zoom_link.php?project_id=${projectId}`, zoomLinkUpdate);
       
    }
    
    if(path === "/pm/work_on_details.html"){
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project_id');
    
        sendAjaxGetRequest('GET', `/pm/services/includes/get_workon_details.php?project_id=${projectId}`, workOnProjectDetails);

       
    }

    if(path === "/pm/project_list.html"){
        sendAjaxGetRequest('GET','/pm/services/api.php?type=project_list', projectList);

    }
    if(path === "/pm/workon_project_list.html"){

        sendAjaxGetRequest('GET','/pm/services/api.php?type=get_workon_projects', workOnProjectList);

    }
});




function sendAjaxGetRequest(method,url, callback) {
    var GetMethodRequest = new XMLHttpRequest();
    GetMethodRequest.open(method, url,true);
    GetMethodRequest.onload = function() {
        if (GetMethodRequest.status === 200 && GetMethodRequest.readyState == 4) {
           var response = JSON.parse(GetMethodRequest.responseText);
            callback(response); 
        } else {
            alert("ERROR 404 Request failed. Status:", GetMethodRequest.status);
            // window.location.href = 'err.php';
        }
    };
    GetMethodRequest.onerror = function () {
        alert("ERROR 501 Request failed. Network error.");
        // window.location.href = 'err.php';
    };
    GetMethodRequest.send();
    
}


function taskSelectUsers(response) {
    if (response.users) {        
        const userSelect = document.getElementById('select_user');
        
        response.users.forEach(user => {

            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.username;
            userSelect.appendChild(option);
        });
        
    }
   
    else {
        alert('Request failed. Returned status of ', Users.status);
    }
}



function projectDetails(response) {
   

    if (response.project) {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project_id');
        const discussionBoardLink = document.getElementById('discussionLink');
        discussionBoardLink.href = `./discussion_board.html?project_id=${projectId}`;
        const projectName = document.getElementById('projectName');
        const projectDescription = document.getElementById('projectDescription');    
        const userList = document.getElementById('userList');
        const taskList = document.getElementById('taskList');
        const createTaskButton = document.getElementById('createTaskButton');
        projectName.textContent = response.project.name;
        if (response.project.description.length > 150){
            projectDescription.textContent = response.project.description.slice(0,147) + "...";
        }
        else{
            projectDescription.textContent = response.project.description;
        }
        if(window.location.pathname === "/pm/project_details.html"){
            response.tasks.forEach(task => {
                var assignedUser = "";
                response.users.forEach(user => {
                    if (task.user_id == user.id){
                        assignedUser = user.profile_image.slice(6);
                    }
                });
                taskList.innerHTML += `
                        <div class="card task">
                        <div class="task-type">
                        <div class="task-name">
                        <h4>${task.title}</h4>
                        <div class="task-status">
                            <i class="fa fa-clock"></i>
                            <h5>${task.status}</h5>
                        </div>
                        </div>
                        <div class="task-description">
                        <h5>${task.description}</h5>
                            <div class="users-list">
                            <div class="team">
                                <img src="${assignedUser}" alt="avatar1">
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                `;
            });
            if(response.tasks.length == 0){
                document.getElementById("no-task").style.display = "block"
                document.getElementById("no-task").innerHTML = "No Task Created";
            }

        }

        response.users.forEach(user => {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add('member-list');
            memberDiv.innerHTML = `
                <div class="msg-profile group">
                    <img src="${user.profile_image.slice(6)}" alt="">
                </div>
                <p>${user.username}</p>
                <h6>${user.role}</h6>
            `;
            
            userList.appendChild(memberDiv);
        });
        if(response.users.length == 0){
            document.getElementById("no-member").style.display = "block"
            document.getElementById("no-member").innerHTML = "No Member";
        }
        let count = 0;
        for(i = 0; i < response.users.length; i++){
            let user = response.users[i];
            if(i > 2){
                count++;
                document.getElementById("total-user").style.display ="flex"
                document.getElementById("total-user").innerHTML = "+" + count;
            }
            else{
                document.getElementById("member-profile").innerHTML += `<div class="chat-area-profile"><img src="${user.profile_image.slice(6)}"/></div>`
            }
        }
         ///Create Task 
         createTaskButton.addEventListener('click', function() {
            window.location.href = `../task/create_task.html?project_id=${projectId}`;
        });
    
    
    /// Link to Discussboard
    
    
        
        document.querySelectorAll('.list').forEach(addDragAndDropHandlers);
    
        
    }
    
    else {
        alert('Project not found');
    }
}

function projectList(response) {
    if (response.projects) {
        const projectLis = document.getElementById('projectList');
        for (let i = response.projects.length - 1; i >= 0; i--) {
            const project = response.projects[i];
            
            const card = document.createElement('div');
            card.classList.add('card', 'card-list');
            if (project.name.length > 25){
                project.name =  project.name.slice(0,23) + "...";
            }
            if (project.description.length > 250){
                project.description =  project.description.slice(0,247) + "...";
            }
            card.innerHTML = `
                <div class="title">
                    <div class="name">
                        <h3>${project.name}</h3>
                        <i class="fa-light fa-paperclip"></i>
                    </div>
                    <h4>offtrack</h4>
                </div>
                <hr>
                <p>${project.description}</p>
                <h4>${project.created_at.slice(0,11)}</h4>
                <div class="foot">
                    <div class="chat-area-group">
                        <img class="chat-area-profile" src="ui/image/pic0.jpg"/>
                        <img class="chat-area-profile" src="ui/image/pic3.jpg">
                        <img class="chat-area-profile" src="ui/image/pic1.jpg"/>
                        <span>+7</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', function() {
                window.location.href = `project_details.html?project_id=${project.id}`;
            });
            
            projectLis.appendChild(card);
        }
    } else {
        document.getElementById("no-project").style.display = "flex";
        document.getElementById("no-project").innerHTML = "No Project yet";
    }
}

function projectForUpdate(response){    
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    if (response.project) {
        nameInput.value = response.project.name;
        descriptionInput.value = response.project.description;
    } else {
        alert('Project not found');
    }

}
function zoomLinkUpdate(response){    
    const zoomLink = document.getElementById('zoomLink');
    if (response.link) {
        zoomLink.value = response.link.title;
    }

}

function workOnProjectList(response) {
    if (response.projects) {
        const projectLis = document.getElementById('projectList');
    
        for (let i = response.projects.length - 1; i >= 0; i--) {
            const project = response.projects[i];
            
            const card = document.createElement('div');
            card.classList.add('card', 'card-list');
            if (project.name.length > 19){
                project.name =  project.name.slice(0,17) + "...";
            }
            if (project.description.length > 250){
                project.description =  project.description.slice(0,247) + "...";
            }
            card.innerHTML = `
                <div class="title">
                    <div class="name">
                        <h3>${project.name}</h3>
                        <i class="fa-light fa-paperclip"></i>
                    </div>
                    <h4>offtrack</h4>
                </div>
                <hr>
                <p>${project.description}</p>
                <h4>${project.created_at.slice(0,11)}</h4>
                <div class="foot">
                    <div class="chat-area-group">
                        <img class="chat-area-profile" src="ui/image/pic0.jpg"/>
                        <img class="chat-area-profile" src="ui/image/pic3.jpg">
                        <img class="chat-area-profile" src="ui/image/pic1.jpg"/>
                        <span>+7</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', function() {
                window.location.href = `work_on_details.html?project_id=${project.id}`;
            });
            
            projectLis.appendChild(card);
        }
    } else {
        document.getElementById("no-project").style.display = "flex";
        document.getElementById("no-project").innerHTML = "No Work on Project";
    }
}

function workOnProjectDetails(response){

    if (response.project) {

        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project_id');
        const discussionBoardLink = document.getElementById('discussionBoardLink');
        discussionBoardLink.href = `./discussion_board.html?project_id=${projectId}`;
        const projectName = document.getElementById('projectName');
        const projectDescription = document.getElementById('projectDescription');
        const userList = document.getElementById('workon-userList');
        const taskBacklog = document.getElementById('section-backlog');
        const taskInProgress = document.getElementById('section-in-progress');
        const taskCompleted = document.getElementById('section-completed');
        projectName.textContent = response.project.name;
        projectDescription.textContent = response.project.description;

        response.tasks.forEach(task => {
            
            let taskDiv = `
                <div class="task-type" draggable="true" id="${task.id}">
                    <div class="task-name">
                    <p>${task.title}</p>
                    <i class="fa fa-clock"> 12 Days</i>
                    </div>
                    <div class="task-description">
                    <p>${task.description}</p>
                    </div>
                    <div class="comment">
                    <div>
                        <i class="fa fa-cog"><span id="number-of-comments">  3</span></i>
                    </div>
                    <div>
                        <i class="fa fa-comment"><span id="number-of-comments">  3</span></i>
                    </div>
                    <div class="div-avatars">
                        <div class="team">
                        <img src="ui/image/man (1).png" alt="avatar1">
                        </div>
                    </div>
                    </div>
            </div>
            `;

            if (task.status === "backlog") {
                taskBacklog.innerHTML += taskDiv;
                addDragAndDropHandlers(taskBacklog, projectId);
            } else if (task.status === "in_progress") {
                taskInProgress.innerHTML += taskDiv;
                addDragAndDropHandlers(taskInProgress, projectId);
            } else if (task.status === "completed") {
                taskCompleted.innerHTML += taskDiv;
                addDragAndDropHandlers(taskCompleted, projectId);
            }
        });
        
        response.users.forEach(user => {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add('member-list');
            memberDiv.innerHTML = `
                <div class="msg-profile group">
                    <img src="${user.profile_image.slice(6)}" alt="">
                </div>
                <p>${user.username}</p>
                <h6>${user.role}</h6>
            `;
            userList.appendChild(memberDiv);
            
        });
        


    } else {
        alert('Project not found');
    }
}