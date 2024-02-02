"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var faqItems = document.querySelectorAll('.js-faqItem');
  faqItems.forEach(function (item) {
    item.addEventListener('click', function () {
      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('open');
      });
      item.classList.add('open');
    });
  });
  var forms = document.querySelectorAll('.js-form');
  var textareas = document.querySelectorAll('textarea');

  for (var i = 0; i < textareas.length; i++) {
    textareas[i].addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 1 + 'px';
    });
  }

  forms.forEach(function (form) {
    var inputs = form.querySelectorAll('.js-input');
    var emailInput = form.querySelector('input[name="email"]');
    var requiredInputs = form.querySelectorAll('.js-requiredInput');
    inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        if (this.value !== '') {
          this.parentElement.classList.add('active');
        } else {
          this.parentElement.classList.remove('active');
        }
      });
    });
    form.addEventListener('submit', function (e) {
      var valid = true;

      if (emailInput && !validateEmail(emailInput.value)) {
        emailInput.parentElement.classList.add('error');
        valid = false;
      }

      requiredInputs.forEach(function (input) {
        if (input.value === '') {
          input.parentElement.classList.add('error');
          input.parentElement.querySelector('label').innerHTML = "Обязательное поле";
          valid = false;
        }
      });

      if (!valid) {
        e.preventDefault();
      }
    });
  }); // Функция для проверки правильности введенного email

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
});