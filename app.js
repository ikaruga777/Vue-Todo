  Vue.directive('auto-focus', {
    bind: function() {
      var el = this.el;
      Vue.nextTick(function() {
        el.focus();
      });
    }
  })
  saveToStrage = function(key, value) {
    window.localStorage.setItem(localStrageKey, JSON.stringify(value))
  }
  localStrageKey = "dev_Todo"
  var vm = new Vue({
    el: ".app",
    data: {
      todos: [],
      input: "",
    },
    created: function() {
      if (window.localStorage) {
        if (window.localStorage.getItem(localStrageKey)) {
          this.todos = JSON.parse(window.localStorage.getItem(localStrageKey))


        }
      }
    },
    methods: {
      addTodo: function(e) {
        if (this.input === '') return;
        var indexces = this.todos.concat().map(function(x) {
          return x.index
        })
        var seqIndex = (Math.max.apply(null, indexces) + 1) | 0
        this.todos.push({
          index: seqIndex,
          isDone: false,
          summary: this.input,
          edit: false
        })
        this.input = ""
        saveToStrage(localStrageKey, this.todos)
      },
      cancelTodo: function(t) {
        t.edit = false
      },

      deleteTodo: function(index) {
        var indexces = this.todos.concat().map(function(x) {
          return x.index
        })
        this.todos.splice(indexces.indexOf(index), 1)
        saveToStrage(localStrageKey, this.todos)
      },
      deleteDoneTodo: function() {
        this.todos = this.todos.filter(function(todo, index, arr) {
          return !todo.isDone
        })
        saveToStrage(localStrageKey, this.todos)
      },

      changeDone: function() {
        saveToStrage(localStrageKey, this.todos)
      },

      dragstart: function(item, e) {
        this.draggingItem = item
        e.target.style.opacity = 0.5
      },

      dragend: function(e) {
        e.target.style.opacity = 1.0
      },
      dragenter: function(item) {
        if (item.index == this.draggingItem.index) return
        const tempIndex = item.index
        item.index = this.draggingItem.index
        this.draggingItem.index = tempIndex
        saveToStrage(localStrageKey, this.todos)
      }
    },
    computed: {
      lefts: function() {
        return this.todos.filter(function(t) {
          return !t.isDone
        }).length
      }
    }

  });
