(function() {
  "use strict";
  window.addEventListener("load", function() {

    Vue.component('mod-exp', {
      template: '#modexp-tmpl',
      props: ['yo'],
      data: function() {
        return {};
      },
      computed: {
        yoyo: function() {
          return "Sandy Duncan";
        }
      },
    });

    var app = new Vue({
      el: '#mod-exp-app',
      data: {
        solvers: ["x"],
      },
      computed: {},
      methods: {
        addSolver: function () {
          this.solvers.unshift("x");
        }
      },
    });

  }, false);
}());
