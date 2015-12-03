(function (root) {

  function DOMNodeCollection (htmlElements) {
    this.htmlElements = htmlElements;
  };

  DOMNodeCollection.prototype.html = function (str) {
    if (str) {
      this.htmlElements.forEach(function (el) {
        el.innerHTML = str;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  };

  root.$l = function (arg) {
    var nodeArray;
    
    if (arg instanceof (HTMLElement)) {
      nodeArray = [arg];
    } else {
      var nodeList = document.querySelectorAll(arg);
      nodeArray = Array.prototype.slice.call(nodeList);
    }
    
    return new DOMNodeCollection(nodeArray);
  };

})(this);
