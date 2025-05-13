$(document).ready(function () {
  const $form = $("#myForm");
  const $submitBtn = $("#submitBtn");

  // Field-specific error messages
  const errorMessages = {
    name: "Name is required.",
    email: "Email is required.",
    password: "Password is required.",
    confirmPassword: "Confirm Password is required."
  };

  function showError($field, message) {
    $field.text(message);
  }

  function clearError($field) {
    $field.text("");
  }

  function isValidEmail(email) {
    const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return pattern.test(email);
  }

  function validate() {
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    let isValid = true;

    // Validate Name
    if (!name) {
      showError($("#nameError"), errorMessages.name);
      isValid = false;
    } else {
      clearError($("#nameError"));
    }

    // Validate Email
    if (!isValidEmail(email)) {
      showError($("#emailError"), "Enter a valid email.");
      isValid = false;
    } else {
      clearError($("#emailError"));
    }

    // Validate Password
    if (password.length < 6) {
      showError($("#passwordError"), "Password must be at least 6 characters.");
      isValid = false;
    } else {
      clearError($("#passwordError"));
    }

    // Validate Confirm Password
    if (confirmPassword !== password || !confirmPassword) {
      showError($("#confirmPasswordError"), "Passwords do not match.");
      isValid = false;
    } else {
      clearError($("#confirmPasswordError"));
    }

    $submitBtn.prop("disabled", !isValid);
  }

  // Attach hover, blur logic dynamically for each field
  $.each(["name", "email", "password", "confirmPassword"], function (_, fieldId) {
    const $input = $("#" + fieldId);
    const $error = $("#" + fieldId + "Error");

    // Show error on mouseleave if empty
    $input.on("mouseleave", function () {
      if (!$input.val().trim()) {
        showError($error, errorMessages[fieldId]);
      }
    });

    // Hide error text on mouseenter (but keep space)
    $input.on("mouseenter", function () {
      if (!$input.val().trim()) {
        showError($error, ""); // Clear text but keep element visible
      }
    });

    // On blur, keep error visible if still empty
    $input.on("blur", function () {
      if (!$input.val().trim()) {
        showError($error, errorMessages[fieldId]);
      } else {
        clearError($error);
      }
    });
  });

  // Real-time validation on input
  $("#name, #email, #password, #confirmPassword").on("input", validate);

  // Form submission
  $form.on("submit", function (e) {
    e.preventDefault();
    alert("Form submitted successfully!");
    this.reset();

    // Clear all errors
    $(".error").text("");
    $submitBtn.prop("disabled", true);
  });

  // Initially disable submit button
  $submitBtn.prop("disabled", true);
});
