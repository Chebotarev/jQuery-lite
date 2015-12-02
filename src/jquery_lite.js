(function (root) {
  root.$l = function (selector) {
    var nodeList = document.querySelectorAll(selector);
    var nodeArray = Array.prototype.slice.call(nodeList);
    debugger
  };
})(this);
