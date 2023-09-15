const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload(); // Если запрос выполнился успешно, обновляем страницу
    }
  });
};

//Получение текущего пользователя и отображение данных профиля:
ApiConnector.current((response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); // Отображение данных профиля
    }
  });


//Получение текущих курсов валюты:
const ratesBoard = new RatesBoard();

function getCurrencyRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable(); // Очистка таблицы с данными
      ratesBoard.fillTable(response.data); // Заполнение таблицы полученными данными
    }
  });
}

// Вызов функции с получением текущих валют
getCurrencyRates();

// Запуск интервала для многократного выполнения с получением валют каждую минуту
setInterval(getCurrencyRates, 60000);


//Пополнение баланса, конвертирование валюты и перевод валюты
const moneyManager = new MoneyManager();

// Пополнение баланса
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); // Отображение данных профиля после успешного пополнения
      moneyManager.setMessage(true, "Баланс успешно пополнен!"); // Вывод сообщения об успехе
    } else {
      moneyManager.setMessage(false, response.error); // Вывод сообщения об ошибке
    }
  });
};

// Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); // Отображение данных профиля после успешной конвертации
      moneyManager.setMessage(true, "Конвертация прошла успешно!"); // Вывод сообщения об успехе
    } else {
      moneyManager.setMessage(false, response.error); // Вывод сообщения об ошибке
    }
  });
};

// Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); // Отображение данных профиля после успешного перевода
      moneyManager.setMessage(true, "Перевод выполнен успешно!"); // Вывод сообщения об успехе
    } else {
      moneyManager.setMessage(false, response.error); // Вывод сообщения об ошибке
    }
  });
};


//Работа с избранным
const favoritesWidget = new FavoritesWidget();

// Получение начального списка избранного
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable(); // Очистка текущего списка избранного
    favoritesWidget.fillTable(response.data); // Заполнение списка избранного полученными данными
    moneyManager.updateUsersList(response.data); // Заполнение выпадающего списка для перевода денег
  }
});

// Добавление пользователя в избранное
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable(); // Очистка текущего списка избранного
      favoritesWidget.fillTable(response.data); // Заполнение списка избранного после успешного добавления
      moneyManager.updateUsersList(response.data); // Обновление выпадающего списка для перевода денег
      favoritesWidget.setMessage(true, "Пользователь успешно добавлен в избранное!"); // Вывод сообщения об успехе
    } else {
      favoritesWidget.setMessage(false, response.error); // Вывод сообщения об ошибке
    }
  });
};

// Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable(); // Очистка текущего списка избранного
      favoritesWidget.fillTable(response.data); // Заполнение списка избранного после успешного удаления
      moneyManager.updateUsersList(response.data); // Обновление выпадающего списка для перевода денег
      favoritesWidget.setMessage(true, "Пользователь успешно удален из избранного!"); // Вывод сообщения об успехе
    } else {
      favoritesWidget.setMessage(false, response.error); // Вывод сообщения об ошибке
    }
  });
};
