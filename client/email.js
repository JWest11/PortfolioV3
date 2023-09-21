
function SendEmail() {

    const contactInput = document.getElementById("emailInput");
    const subjectInput = document.getElementById("subjectInput");
    const messageInput = document.getElementById("messageInput");

    if (contactInput.value == "" || subjectInput.value == "" || messageInput.value == "")
    {
        console.log(contactInput.value);
        alert("Please fill out all fields");
        return false;
    }
    else
    {
        alert("Email sent! Thanks for reaching out!");

        fetch("/email", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                'emailmessage': messageInput.value,
                'emailcontact': contactInput.value,
                'emailsubject': subjectInput.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        })

        return true;
    }
    
}

const ContactForm = document.getElementById("ContactForm");

ContactForm.addEventListener("submit", SendEmail);