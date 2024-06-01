const readline = require('readline');

// Функція для введення даних
function inputData() {
    const tasks = [];
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        const ask = () => {
            rl.question('Введіть назву завдання (або "done" для завершення): ', (name) => {
                if (name.toLowerCase() === 'done') {
                    rl.close();
                    resolve(tasks);
                } else {
                    rl.question('Введіть тривалість завдання у годинах: ', (duration) => {
                        rl.question('Введіть резерв часу для завдання у годинах: ', (reserve) => {
                            tasks.push({ name, duration: parseInt(duration), reserve: parseInt(reserve) });
                            ask();
                        });
                    });
                }
            });
        };
        ask();
    });
}

// Функція для зчитування заздалегідь готових даних
function readData() {
    // Ось тут можна реалізувати зчитування даних з файлу або API
    // Наприклад:
    // const data = fetch('url_to_data').then(response => response.json());
    // return data;
}

// Функція для розрахунку загальної тривалості комплексу робіт з урахуванням резервів часу
function calculateTotalDuration(tasks) {
    let totalDuration = 0;
    tasks.forEach(task => {
        totalDuration += task.duration + task.reserve;
    });
    return totalDuration;
}

// Функція для виведення даних у зручному вигляді
function printResults(tasks, totalDuration) {
    console.log('Комплекс робіт та їх резерви часу:');
    tasks.forEach(task => {
        console.log(`${task.name}: Тривалість - ${task.duration} год., Резерв - ${task.reserve} год.`);
    });
    console.log(`Загальна тривалість комплексу робіт з урахуванням резервів часу: ${totalDuration} год.`);
}

// Функція для реалізації діаграми Ганта (використовуємо Chart.js)
function drawGanttChart(tasks) {
    // Реалізація діаграми Ганта за допомогою Chart.js
    // Код для створення діаграми буде залежати від бібліотеки чи фреймворка, який ви використовуєте
}

// Основна функція, яка виконує усі кроки
async function main() {
    let tasks;

    const userInput = await inputData();
    tasks = userInput;

    const totalDuration = calculateTotalDuration(tasks);
    printResults(tasks, totalDuration);
    drawGanttChart(tasks);
}

// Викликаємо основну функцію
main();
