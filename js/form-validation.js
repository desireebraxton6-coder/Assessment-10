document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reg-form");
  const password = document.getElementById("password");
  const verifyPassword = document.getElementById("verify-password");
  const resultMessage = document.getElementById("result-message");
  const submitButton = document.getElementById("submit");

  function clearErrors() {
    document.querySelectorAll(".error").forEach((el) => el.remove());
  }

  function showError(input, message) {
    const error = document.createElement("span");
    error.classList.add("error");
    error.style.color = "red";
    error.textContent = message;
    input.insertAdjacentElement("afterend", error);
  }

  function checkPassword() {
    if (password.value.length < 8) {
      showError(password, "Password must be at least 8 characters.");
      return false;
    }
    if (verifyPassword.value.length < 8) {
      showError(
        verifyPassword,
        "Password verification must be at least 8 characters."
      );
      return false;
    }
    if (password.value !== verifyPassword.value) {
      showError(verifyPassword, "Passwords do not match.");
      return false;
    }
    return true;
  }

  function validateForm() {
    let valid = true;
    clearErrors();

    const inputs = form.querySelectorAll("input[required]");
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        showError(input, `${input.name || input.id} is required.`);
        valid = false;
      } else if (!input.checkValidity()) {
        showError(input, `Invalid ${input.name || input.id} format.`);
        valid = false;
      }
    });

    if (!checkPassword()) {
      valid = false;
    }
    return valid;
  }

  function writeCookieData() {
    const inputs = form.querySelectorAll("input");
    // clear old cookies
    inputs.forEach((input) => {
      if (input.type !== "submit" && input.type !== "button") {
        document.cookie =
          input.id + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    });

    // write new cookies
    inputs.forEach((input) => {
      if (input.type !== "submit" && input.type !== "button") {
        document.cookie =
          input.id + "=" + encodeURIComponent(input.value) + "; path=/;";
      }
    });

    // ✅ show success before submitting
    resultMessage.style.color = "green";
    resultMessage.textContent =
      "Registration completed successfully! Redirecting…";

    // small delay so user sees success message before moving to confirm.html
    setTimeout(() => form.submit(), 1000);
  }

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    resultMessage.textContent = ""; // clear old messages
    resultMessage.style.color = "red";

    if (validateForm()) {
      writeCookieData();
    } else {
      resultMessage.textContent = "Please fix the errors above.";
    }
  });
});
