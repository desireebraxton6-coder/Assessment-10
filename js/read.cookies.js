function displayCookieValue() {
    const outputDiv = document.getElementById("output");
    let cookies = document.cookie.split(';');
    let html = "<ul>";
    cookies.forEach(cookie => {
        let [name, value] = cookie.split('=');
        if (name && value) {
            html += "<li><strong>" + name.trim() + ":</strong> " + decodeURIComponent(value) + "</li>";
        }
    });
    html += "</ul>";
    outputDiv.innerHTML = html;
}

window.onload = displayCookieValue;
