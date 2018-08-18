import { Chart } from 'chart.js';

function getColor(isActive, alpha = 1) {
  return isActive
    ? `rgba(54, 162, 235, ${alpha})`
    : `rgba(255, 99, 132, ${alpha})`;
}

function getLabel(el, i, data) {
  const x = new Date();
  x.setHours(x.getHours() - data.length + i);
  x.setMinutes(0);
  x.setSeconds(0);
  x.setMilliseconds(0);
  return x.toLocaleString("ru-RU"); // привел формат даты и времени к национальному значению (да и так симпотичнее выглядит =) и помещается в строку)
}

// написал функцию получения максимального числа в массиве соединений
function getMaxConnections(data) {
  return Math.max.apply(null, data);
}

export function createChart(container, data, isActive) {
  const ctx = container.getContext('2d');

  const borderColor = getColor(isActive);
  const backgroundColor = getColor(isActive, 0.5);
  // получаем максимальное количество соединений
  const maxConnections = getMaxConnections(data);

  const chart = new Chart(ctx, { // есть мнение что лучше сразу возвратить новый объект без присваивания ее переменной, но я придерживаюсь того чтобы оставить как есть
    type: 'line',
    data: {
      labels: data.map(getLabel),
      datasets: [
        {
          data: data,
          borderWidth: 1,
            borderColor: borderColor,
              backgroundColor: backgroundColor
        }
      ]
    },
    options: {
        legend: { 
            display: false
        },
        scales: {
            xAxes: [{ ticks: { display: false } }],
            yAxes: [{ ticks: { beginAtZero: true, max: maxConnections } }] // верхней точкой оси соединений принимаем максимальное количесвто соединений
        }
    }
  });

  return chart; // есть мнение что лучше сразу возвратить новый объект без присваивания ее переменной, но я придерживаюсь того чтобы оставить как есть
}
