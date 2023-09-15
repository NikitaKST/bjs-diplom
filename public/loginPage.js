"use strict";

const userForm = new UserForm();

// Функция для запроса на авторизацию
function loginFormAction(data) {
  ApiConnector.login(data, (response) => {
    if (response.success) {
      // Авторизация успешна, обновляем страницу
      location.reload();
    } else {
      // Выводим ошибку в окно для ошибок
      alert(response.error);
    }
  });
}

// Присваиваем функцию обратного вызова свойствам объекта UserForm для аторизации
userForm.loginFormCallback = loginFormAction;


// Функция для запроса на регистрацию
function registerFormAction(data) {
  ApiConnector.register(data, (response) => {
    if (response.success) {
      // Регистрация успешна, обновляем страницу
      location.reload();
    } else {
      // Выводим ошибку в окно для ошибок
      alert(response.error);
    }
  });
}

// Присваиваем функции обратного вызова свойствам объекта UserForm для регистрации
userForm.registerFormCallback = registerFormAction;