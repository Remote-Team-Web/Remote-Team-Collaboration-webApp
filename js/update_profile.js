document.addEventListener('DOMContentLoaded', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './services/api.php?type=get_users', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const user = JSON.parse(xhr.responseText);
            if (user.error) {
                alert('Error: ' + user.error);
            } else {

                document.getElementById('username').value = user.username;
                document.getElementById('uname').value = user.username;
                document.getElementById('email').value = user.email;
                document.getElementById('user_image').setAttribute("src", user.profile_image.slice(6));
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
                alert('Profile updated successfully!');
                window.location.href = "index.html";
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

