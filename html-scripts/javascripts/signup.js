$(document).ready(function(){

  $("#firstname-input").on("input", function(){
    $("#previewName").text($(this).val() || "Your Name");
  });

  $("#bio").on("input", function(){
    $("#previewBio").text($(this).val() || "Your bio will appear here...");
  });

  $("#interests").on("input", function(){
    let interests = $(this).val().split(",");
    $("#previewInterests").html("");

    $.each(interests, function(i, interest){
      let trimmed = interest.trim();
      if(trimmed !== ""){
        $("#previewInterests").append(
          `<span class="tag">${trimmed}</span>`
        );
      }
    });
  });

});

const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const studentNumber_input = document.getElementById('studentNumber');
const campus_input = document.getElementById('campus');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat_password');
const interests_input = document.getElementById('interests');
const bio_input = document.getElementById('bio');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    
    [firstname_input, studentNumber_input, campus_input, email_input, 
     password_input, repeat_password_input, interests_input, bio_input].forEach(input => {
        if(input && input.parentElement) {
            input.parentElement.classList.remove('incorrect');
        }
    });

    let errors = [];

    const fname = firstname_input.value.trim();
    const studNo = studentNumber_input.value.trim();
    const campus = campus_input.value.trim();
    const email = email_input.value.trim();
    const pwd = password_input.value;
    const pwd2 = repeat_password_input.value;
    const interests = interests_input.value.trim();
    const bio = bio_input.value.trim();

    errors = getSignupFormErrors(fname, studNo, campus, email, pwd, pwd2, interests, bio);

    if(errors.length > 0) {
        error_message.innerText = errors.join(". ");
        return;
    }

    
    const user = {
        name: fname,
        studentNumber: studNo,
        campus: campus,
        email: email,
        password: pwd,
        interests: interests,
        bio: bio
    };

    localStorage.setItem("userProfile", JSON.stringify(user));
    window.location.href = "profile.html";
});

function getSignupFormErrors(firstname, studentNumber, campus, email, password, repeat_password, interests, bio) {
    let errors = [];

    if(!firstname) {
        errors.push("Full Name is required");
        firstname_input.parentElement.classList.add('incorrect');
    }
    if(!studentNumber || isNaN(studentNumber)) {
        errors.push("Student Number must be numeric");
        studentNumber_input.parentElement.classList.add('incorrect');
    }
    if(!campus) {
        errors.push("Campus is required");
        campus_input.parentElement.classList.add('incorrect');
    }
    if(!email || !email.includes("@")) {
        errors.push("Valid email required");
        email_input.parentElement.classList.add('incorrect');
    }
    if(!password || password.length < 8) {
        errors.push("Password must be at least 8 characters");
        password_input.parentElement.classList.add('incorrect');
    }
    if(password !== repeat_password) {
        errors.push("Passwords do not match");
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
    }
    if(!interests) {
        errors.push("Interests required");
        interests_input.parentElement.classList.add('incorrect');
    }
    if(!bio) {
        errors.push("Bio required");
        bio_input.parentElement.classList.add('incorrect');
    }

    return errors;
}