import { createChart } from './chart';
// неверно указано свойство details
export function getDetailsContentLayout(ymaps) {
  const BalloonContentLayout = ymaps.templateLayoutFactory.createClass( // есть мнение что лучше сразу возвратить новый объект без присваивания ее переменной, но я придерживаюсь того чтобы оставить как есть
    `<div class="details-info">
        {% if (properties.balloonContent) %}
            <div class="details-info">
                <div class="details-label">base station</div>
                <div class="details-title">{{properties.balloonContent.serialNumber}}</div>
                {% if (properties.balloonContent.isActive) %}
                <div class="details-state details-state_active">active</div>
                {% else %}
                <div class="details-state details-state_defective">defective</div>
                {% endif %}
                <div class="details-state details-state_connections">
                    connections: {{properties.balloonContent.connections}}
                </div>
            </div>
            <div class="details-info">
                <div class="details-label">connections</div>
                <canvas class="details-chart" width="270" height="100" />
            </div>
        {% else %}
            <div class="details-info">
                Идет загрузка данных...
            </div>
        {% endif %}
    `,
    {
      build: function () { // убрал стрелочные функции (честно не знаю почему не работает со стрелочными - но не работает, привел к виду документации)
        this.constructor.superclass.build.call(this); // привел вызов к виду из документации

        const { balloonContent } = this.getData().object.properties; // неверное свойство details

        if (balloonContent) {
          const container = this.getElement().querySelector('.details-chart');

          this.connectionChart = createChart(
            container,
            balloonContent.chart,
            balloonContent.isActive
          );
        }
      },

      clear: function () { // убрал стрелочные функции (честно не знаю почему не работает со стрелочными - но не работает, привел к виду документации)

        this.constructor.superclass.clear.call(this); // привел вызов к виду из документации

        if (this.connectionChart) {
          this.connectionChart.destroy();
        }
      }
    }
  );

  return BalloonContentLayout; // есть мнение что лучше сразу возвратить новый объект без присваивания ее переменной, но я придерживаюсь того чтобы оставить как есть
}
