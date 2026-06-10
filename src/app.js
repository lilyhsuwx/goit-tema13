// Завдання 1

// Напиши функцію delay(ms), яка повертає проміс, що переходить в стан "resolved" через ms мілісекунд. Значенням промісу, яке виповнилося має бути та кількість мілісекунд, яку передали під час виклику функції delay.

const delay = ms => {

  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms)
    },ms)
  });


};

const loggerOne = time => console.log(`Resolved after ${time}ms`);

// Виклич функції для перевірки
delay(2000).then(loggerOne); // Resolved after 2000ms
delay(1000).then(loggerOne); // Resolved after 1000ms
delay(1500).then(loggerOne); // Resolved after 1500ms


// =======================================================================================

// Завдання 2

// Перепиши функцію toggleUserState() так, щоб вона не використовувала callback-функцію callback, а приймала всього два параметри allUsers і userName і повертала проміс.

const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {

   const updatedUsers = allUsers.map(user =>
    user.name === userName ? { ...user, active: !user.active } : user,
  );

  return new Promise((resolve, reject) => {
    resolve(updatedUsers)
  });
};

const logger = updatedUsers => console.table(updatedUsers);


/*
 * Повинно працювати так
 */
toggleUserState(users, 'Mango').then(logger);
toggleUserState(users, 'Lux').then(logger);


// =======================================================================================

// Завдання 3

// Перепиши функцію makeTransaction() так, щоб вона не використовувала callback-функції onSuccess і onError, а приймала всього один параметр transaction і повертала проміс.


const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
  const delay = randomIntegerFromInterval(200, 500);


return new Promise ((resolve, reject) => {

    setTimeout(() => {
    const canProcess = Math.random() > 0.3;

    if (canProcess) {
      resolve({ id: transaction.id, time: delay })
    } else {
      reject(transaction.id)
    }

  }, delay);
});

  
};

const logSuccess = (id, time) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};


/*
 * Повинно працювати так
 */
makeTransaction({ id: 70, amount: 150 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 71, amount: 230 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 72, amount: 75 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 73, amount: 100 })
  .then(logSuccess)
  .catch(logError);