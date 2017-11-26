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
          'd': undefined,
          'm': undefined,
          'A': undefined,
          'secret': {'b': false, 'e': false, 'd': false},
        };
      },
      computed: {
        isShowSolver: function() {
          return "solver" == this.kind;
        },
        isShowSolver2: function() {
          return "solver2" == this.kind;
        },
        isShowComment: function() {
          return "comment" == this.kind;
        },
        ed: function() {
          if ( this.isShowSolver2 ) {
            if ( 'undefined' != typeof this.d && 'undefined' != typeof this.e ) {
              return this.d * this.e;
            }
          }
          return '';
        }
      },
      methods: {
        close: function() {
          this.$emit('close-solver', this.id);
        },
        toggleSecret: function(which) {
          console.log(which);
          Vue.set(this.secret, which, !this.secret[which]);
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
          else if ( this.isShowSolver2 && 'undefined' == typeof this.d ) {
            this.A = "?";
          }
          else {
            var exp = this.e;
            if ( this.isShowSolver2 ) {
              exp *= this.d;
            }
            this.A = bigInt(this.B).modPow(exp, this.m).toJSNumber();
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
        addSolver2: function () {
          this.id++;
          this.solvers.push({id: this.id, kind: "solver2"});
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
