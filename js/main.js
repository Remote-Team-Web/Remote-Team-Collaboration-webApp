document.addEventListener('DOMContentLoaded', function() {
    const invitationList = document.getElementById('invitation');
    const total = document.getElementById('total');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'services/api.php?type=invited_projects', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.projects) {
                if(response.unseen > 100){
                    total.innerHTML = "+99";
                } else{
                    total.innerHTML = response.unseen;
                }               
                response.projects.forEach(project => {
                    const li = document.createElement('li');
                    li.innerHTML = `Invited to project : ${project.name}` + `<span> ${project.created_at} </span>`;
                    
                    li.addEventListener('click', function() {
                        document.getElementById("popup-response").style.display = "flex";
                        document.getElementById("popup-response").setAttribute('data-project-id', `${project.id}`);
                    });
                    invitationList.appendChild(li);
                });
            } else {
                invitationList.innerHTML = `<li><span> No message yet </span></li>`;
            }
        } else {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.send();
});

document.getElementById('respondInvitationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const project_id = document.getElementById('popup-response').getAttribute('data-project-id');
    const status = document.getElementById('status').value;
    const data = {
        project_id: project_id, 
        status: status, 
        type: "respond_invitation"
    };

    sendAjaxRequest('POST', './services/api.php', data, handleResponse);
});
function sendAjaxRequest(method, url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        } else {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.send(JSON.stringify(data));
}

function handleResponse(response) {
    if (response.success) {  
        document.getElementById("respond-message").style.display = "block"
        document.getElementById("respond-message").innerHTML = response.message;
    }
    
    else {
        alert('Error: ' + response.error);
    }
}




document.addEventListener('DOMContentLoaded', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './services/api.php?type=get_users', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const user = JSON.parse(xhr.responseText);
            if (user.error) {
                alert('Error: ' + user.error);
            } 

            else {
                document.getElementById('uname').innerHTML = user.username;
                document.getElementById('urole').innerHTML = user.role;
                document.getElementById('upnumber').innerHTML = user.phone_number;
                document.getElementById('uemail').innerHTML = user.email;
                document.getElementById('username').value = user.username;
                document.getElementById('email').value = user.email;
                document.getElementById('role').value = user.role;
                document.getElementById('pnumber').value = user.phone_number;
                document.getElementById('user_image').setAttribute("src", user.profile_image.slice(6));
                document.getElementById('side-user-image').setAttribute("src", user.profile_image.slice(6));
                document.getElementById('header-user-image').setAttribute("src", user.profile_image.slice(6));
                // Profile image is not set to input file due to security reasons. 
                // It can be displayed separately if needed.
            }
        } else {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.send();
});
document.getElementById('updateProfileForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('email', document.getElementById('email').value);
    
    const profileImageInput = document.getElementById('image-update');
    if (profileImageInput.files.length > 0) {
        formData.append('profile_image', profileImageInput.files[0]);
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', './services/includes/update_profile.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            if (response.success) {
                document.getElementById("user-message").style.display = "block"
                document.getElementById("user-message").innerHTML = 'Profile updated successfully!';
            } else {
                alert('Error: ' + response.error);
            }
        } else {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.onerror = function() {
        alert('Request failed. Unable to connect to the server.');
    };

    xhr.send(formData);
});



