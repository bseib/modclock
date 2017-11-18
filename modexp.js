(function() {
  "use strict";
  window.addEventListener("load", function() {

    Vue.component('mod-exp', {
      template: '#modexp-tmpl',
      props: ['id', 'kind'],
      data: function() {
        return {
          'B': undefined,
          'e': undefined,
          'm': undefined,
          'A': undefined,
        };
      },
      computed: {
        isShowSolver: function() {
          return "solver" == this.kind;
        },
        isShowComment: function() {
          return "comment" == this.kind;
        },
      },
      methods: {
        close: function() {
          this.$emit('close-solver', this.id);
        },
        computeA: function() {
          if ( this.m == 0 ) {
            this.A = "?";
          }
          else if ( 'undefined' == typeof this.B ) {
            this.A = "?";
          }
          else if ( 'undefined' == typeof this.e ) {
            this.A = "?";
          }
          else if ( 'undefined' == typeof this.m ) {
            this.A = "?";
          }
          else {
            this.A = bigInt(this.B).modPow(this.e, this.m).toJSNumber();
          }
        }
      },
    });

    var app = new Vue({
      el: '#mod-exp-app',
      data: {
        id: 0,
        solvers: [{id: 0, kind: "solver"}],
      },
      computed: {},
      methods: {
        closeSolver: function(closeId) {
//          debugger;
          var foundIndex = -1;
          for (var i=0;i<this.solvers.length;i++) {
            if ( closeId == this.solvers[i].id ) {
              foundIndex = i;
              break;
            }
          }
          if ( foundIndex > -1 ) {
            Vue.delete(this.solvers, foundIndex);
          }
        },
        addSolver: function () {
          this.id++;
          this.solvers.push({id: this.id, kind: "solver"});
        },
        addComment: function () {
          this.id++;
          this.solvers.push({id: this.id, kind: "comment"});
        }
      },
    });

    // app.$on('close', function(id) {
    //   console.log("close " + id);
    // });

  }, false);
}());
