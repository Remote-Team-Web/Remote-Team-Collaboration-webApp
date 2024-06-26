




document.getElementById('createProjectForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const projectUsers = document.getElementById('projectUsers').value.split(',').map(id => id.trim());

    const data ={ 
        name: projectName, 
        description: projectDescription, 
        users: projectUsers,
        type: "create_project" 
    };
    
    sendAjaxRequest('POST','./services/api.php', data, handleResponse);
}); 


document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = { 
        email: email,
        password: password, 
        type: "login" 
    };
    sendAjaxRequest('POST','../../services/api.php', data, handleResponse);
});

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = { 
        username: username, 
        email: email, password: 
        password, type: "register" 
    };
    sendAjaxRequest('POST','../../services/api.php', data, handleResponse);
});



document.getElementById('createTaskForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('task_title').value;
    const description = document.getElementById('task_description').value;
    const dueDate = document.getElementById('task_due_date').value;
    const userId = document.getElementById('select_user').value;
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project_id');
   

    const data = {
        title: title,
        description: description,
        due_date: dueDate,
        user_id: userId,
        project_id: projectId,
        type: "create_task"
    };

    sendAjaxRequest('POST','./services/api.php', data, handleResponse);
});
document.getElementById('createLinkForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('zoomLink').value;
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project_id');
   

    const data = {
        title: title,
        project_id: projectId,
        type: "zoom_link"
    };

    sendAjaxRequest('POST','./services/api.php', data, handleResponse);
});

document.getElementById('respondInvitationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    // const project_id = urlParams.get('project_id');
    const project_id =  document.getElementById('popup-response').getAttribute.name;
    const status = document.getElementById('status').value;
    const data = {
        project_id: project_id, 
        status: status, 
        type: "respond_invitation"
    };

    sendAjaxRequest('POST','./services/api.php', data, handleResponse);
});


document.getElementById('inviteUserForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const project_id = urlParams.get('project_id');
    const user_id = document.getElementById('user_id').value;

    const data = { 
        project_id: project_id, 
        user_id: user_id, 
        type: "invite_user" 
    };

    sendAjaxRequest('POST','./services/api.php', data, handleResponse);
});


document.getElementById('updateProjectForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project_id');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const updatedName = nameInput.value;
    const updatedDescription = descriptionInput.value;

    const data ={
        project_id: projectId,
        name: updatedName,
        description: updatedDescription,
        type: "update_project"
    };
    sendAjaxRequest('POST','./services/api.php', data, handleResponse);

});

function sendAjaxRequest(method,url, data, callback) {
    var PostMethodRequest = new XMLHttpRequest();
    PostMethodRequest.open(method, url,true);
    PostMethodRequest.onload = function() {
        if (PostMethodRequest.status == 200 && PostMethodRequest.readyState == 4) {
           var response = JSON.parse(PostMethodRequest.responseText);
            callback(response); 
        } else {
            alert( PostMethodRequest.status);
            // window.location.href = 'err.php';
        }
    };
    PostMethodRequest.onerror = function () {
        alert("ERROR 501 Request failed. Network error.");
        // window.location.href = 'err.php';
    };
    PostMethodRequest.send(JSON.stringify(data));
    
}

function handleResponse(response) {
    if (response.success) {  

        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project_id');

        if (response.type == 'login') {
            alert(response.message);
            var user = JSON.parse(response.user);
            sessionStorage.setItem("user", user.email);
            window.location.href = '../../index.html';
        } 

        if (response.type == "register") {
            alert(response.message);
            window.location.href = 'login.html';
        }

        if(response.type == "create_project"){
            document.getElementById("project-message").style.display = "block"
            document.getElementById("project-message").innerHTML = response.message;
        }

        if (response.type == "create_task") {
            document.getElementById("task-message").style.display = "block"
            document.getElementById("task-message").innerHTML = response.message;
        }
        if (response.type == "zoom_link") {
            document.getElementById("link-message").style.display = "block"
            document.getElementById("link-message").innerHTML = response.message;
        }
        
        if (response.type == "respond_invitation") {
            document.getElementById("respond-message").style.display = "block"
            document.getElementById("respond-message").innerHTML = response.message;
        }
        if(response.type == "invite_user"){
            document.getElementById("invite-message").style.display = "block"
            document.getElementById("invite-message").innerHTML = response.message;
        }
        if(response.type == "update_project"){
            document.getElementById("pupdate-system-message").style.display = "block"
            document.getElementById("pupdate-message").innerHTML = response.message;
        }

    }
    
    else {
        alert('Error: ' + response.error);
    }
}
