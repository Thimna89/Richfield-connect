document.addEventListener("DOMContentLoaded", function() {
    const storedData = localStorage.getItem("userProfile");
    let user = null;

    try {
        user = storedData ? JSON.parse(storedData) : null;
    } catch (e) {
        console.error("Invalid JSON in localStorage:", e);
        return;
    }

    if (!user) {
        console.warn("No user data found in local storage.");
        document.getElementById("profile_card").innerHTML = 
            "<p>No profile found. Please <a href='signup.html'>sign up</a> first.</p>";
        return;
    }

    function setText(id, prefix, value, defaultValue) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = prefix + (value || defaultValue);
        } else {
            console.warn("Element with ID '" + id + "' not found.");
        }
    }

    setText("name", "", user.name, "Name not provided");
    setText("studentNumber", "Student No: ", user.studentNumber, "N/A");
    setText("email", "Email: ", user.email, "not set");
    setText("campus", "Campus: ", user.campus, "Not specified");
    setText("interests", "Interests: ", user.interests, "None");
    setText("bio", "Bio: ", user.bio, "No bio available.");
});