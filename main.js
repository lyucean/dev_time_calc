Vue.component('variable', {
  props: ['item'],
  template: '#variable-template',
  watch: {
    item: {
      handler: function () {
        app.answer()
      },
      deep: true
    }
  },
})

var timeFormat = (function () {
  function num (val, zero = false) {
    val = Math.floor(val)

    if (zero) {
      val = val < 10 ? val : val
    }

    return val
  }

  return function (time) {
    let hours = time / 60
      , minutes = time % 60
      , label = ''

    function declOfNum (number, titles) {
      cases = [2, 0, 1, 1, 1, 2]
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
    }

    if (0 < num(hours)) {
      label += num(hours) + ' ' + declOfNum(num(hours), ['час', 'часа', 'часов'])
    }

    if (0 < num(minutes)) {
      label += ' ' + num(minutes, true) + ' ' + declOfNum(num(minutes, true), ['минута', 'минуты', 'минут'])
    }

    return label
  }
})()

var app = new Vue({
  el: '#app',
  data: {
    title: 'Калькулятор времени на задачу',
    dev_time_minute: 60,
    dev_time_label: '',
    estimated_time: '1 час',
    items: [
      {
        value: 40,
        title: 'Проектирование новой бизнес-логики',
      },
      {
        value: 45,
        title: 'Изучение текущего кода бизнес-логики',
      },
      {
        value: 0,
        title: 'Изучение новых технологий и библиотек',
      },
      {
        value: 50,
        title: 'Рефакторинг',
      },
      {
        value: 25,
        title: 'Тестирование',
      },
      {
        value: 30,
        title: 'Документирование',
      },
      {
        value: 15,
        title: 'Консультирование разработчиков',
      },
      {
        value: 20,
        title: 'Ревью',
      },
      {
        value: 0,
        title: 'Стендап',
      },
      {
        value: 20,
        title: 'Срочные багфиксы',
      },
      {
        value: 20,
        title: 'Участие в совещаниях',
      },
      {
        value: 10,
        title: 'Решение инфраструктурных проблем',
      },
      {
        value: 10,
        title: 'Деплой',
      },
      {
        value: 20,
        title: 'Чтение Slack и ответы в личку',
      }
    ]
  },
  watch: {
    dev_time_minute: function (val) {
      this.dev_time_label = timeFormat(val)
      this.answer()
    },
  },
  methods: {
    answer: function () {

      let dev_time = this.dev_time_minute
      let total_time = 0

      this.items.forEach(function (item) {
        total_time += Math.round(dev_time * item.value / 100)
        console.log(total_time)
      })

      total_time += parseInt(dev_time)
      console.log('b": ' + total_time)

      this.estimated_time = timeFormat(total_time)
    }
  },
  created: function () {
    this.dev_time_label = timeFormat(this.dev_time_minute)
    this.answer()
  }
})