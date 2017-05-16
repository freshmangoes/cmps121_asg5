
var app = function() {

    var self = {};
    self.is_configured = false;

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    // Enumerates an array.
    var enumerate = function(v) {
        var k=0;
        v.map(function(e) {e._idx = k++;});
    };

    // Initializes an attribute of an array of objects.
    var set_array_attribute = function (v, attr, x) {
        v.map(function (e) {e[attr] = x;});
    };

    self.initialize = function () {
        document.addEventListener('deviceready', self.ondeviceready, false);
    };

    self.ondeviceready = function () {
        // This callback is called once Cordova has finished
        // its own initialization.
        console.log("The device is ready");
        $("#vue-div").show(); // This is jQuery.
        self.is_configured = true;
    };

    self.reset = function () {
        self.vue.board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    };

    self.shuffle = function(i, j) {
        // You need to implement this.
        var north = -4;
        var east = 1;
        var south = 4;
        var west = -1;

        self.vue.arrayIndex = (4*i)+j;
        self.vue.arrayIndexVal = self.vue.board[self.vue.arrayIndex];

        console.log("Array Index: " + self.vue.arrayIndex);
        console.log("Array Index Val: " + self.vue.arrayIndexVal);

        var index = self.vue.arrayIndex;
        var val = self.vue.arrayIndexVal;
        var board = self.vue.board;

        // Handling swaps of the tiles
        // If 0 is north of the tile
        if(board[index + north] == 0) {
          var temp = board[index];
          console.log("INDEX: " + index);
          console.log("TEMP: " + temp);
          Vue.set(board, index, board[index+north]);
          Vue.set(board, index + north, temp);
        // If 0 is south of the tile
        }else if(board[index + south] == 0){
          var temp = board[index];
          console.log("INDEX: " + index);
          console.log("TEMP: " + temp);
          Vue.set(board, index, board[index + south]);
          Vue.set(board, index + south, temp);
        // If 0 is east of the tile
        }else if(board[index + east] == 0){
          var temp = board[index];
          console.log("INDEX: " + index);
          console.log("TEMP: " + temp);
          Vue.set(board, index, board[index + east]);
          Vue.set(board, index + east, temp);
        // If 0 is west of the tile
        }else if(board[index + west] == 0){
          temp = board[index];
          console.log("INDEX: " + index);
          console.log("TEMP: " + temp);
          Vue.set(board, index, board[index + west]);
          Vue.set(board, index + west, temp);
        }

    };

    self.scramble = function() {
        // Read the Wikipedia article.  If you just randomize,
        // the resulting puzzle may not be solvable.
    };

    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            board: [],
            arrayIndex: 0,
            arrayIndexVal: 0,
        },
        methods: {
            reset: self.reset,
            shuffle: self.shuffle,
            scramble: self.scramble
        }

    });

    self.reset();

    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){
    APP = app();
    APP.initialize();
});
