Vue.component('variable', {
  props: ['item'] ,
  template: '#variable-template',
  watch: {
    item: {
      handler: function() {
        app.answer();
      },
      deep: true,
    },
  },
});

let timeFormat = (function() {
  function num(val) {
    return Math.floor(val);
  }

  return function(time) {
    let hours = time / 60,
        minutes = time % 60,
        label = '';

    function declOfNum(number, titles) {
      let cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20)
          ? 2
          : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    if (0 < num(hours)) {
      label += num(hours) + ' ' +
          declOfNum(num(hours), ['час', 'часа', 'часов']);
    }

    if (0 < num(minutes)) {
      label += ' ' + num(minutes) + ' ' +
          declOfNum(num(minutes), ['минута', 'минуты', 'минут']);
    }

    return label;
  };
})();

let app = new Vue({
  el: '#app',
  data: {
    title: 'Калькулятор времени на задачу',
    dev_time_minute: 60,
    dev_time_label: '',
    show_calc: true, // показывать ли расчёты
    estimated_time: '1 час',
    items: [
      {
        value: 20,
        time: '',
        show: true,
        title: 'Проектирование логики',
      },
      {
        value: 20,
        time: '',
        show: true,
        title: 'Изучение текущего кода бизнес-логики',
      },
      {
        value: 5,
        time: '',
        show: true,
        title: 'Изучение новых технологий и библиотек',
      },
      {
        value: 30,
        time: '',
        show: true,
        title: 'Рефакторинг',
      },
      {
        value: 50,
        time: '',
        show: true,
        title: 'Тестирование',
      },
      {
        value: 10,
        time: '',
        show: true,
        title: 'Документирование',
      },
      {
        value: 5,
        time: '',
        show: true,
        title: 'Консультирование',
      },
      {
        value: 10,
        time: '',
        show: true,
        title: 'Code review',
      },
      {
        value: 0,
        time: '',
        show: true,
        title: 'Конференции',
      },
      {
        value: 15,
        time: '',
        show: true,
        title: 'Исправление багов',
      },
      {
        value: 20,
        time: '',
        show: true,
        title: 'Участие в совещаниях',
      },
      {
        value: 10,
        time: '',
        show: true,
        title: 'Решение инфраструктурных проблем',
      },
      {
        value: 10,
        time: '',
        show: true,
        title: 'Развёртывание',
      },
      {
        value: 20,
        time: '',
        show: true,
        title: 'Чтение и ответы в личку',
      },
    ],
  },
  watch: {
    // следим за статусом show_calc
    show_calc: function(status) {
      this.items.forEach(function(item) {
        item.show = status;
      });
    },
    dev_time_minute: function(val) {
      this.dev_time_label = timeFormat(val);
      this.answer();
    },
  },
  methods: {
    answer: function() {

      let dev_time = this.dev_time_minute;
      let total_time = 0;

      this.items.forEach(function(item) {
        total_time += Math.round(dev_time * item.value / 100);

        item.time = timeFormat(item.value);
      });

      total_time += parseInt(dev_time);

      this.estimated_time = timeFormat(total_time);
    },
  },
  created: function() {
    this.dev_time_label = timeFormat(this.dev_time_minute);
    this.answer();
  },
});
