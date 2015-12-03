(function (root) {

  function DOMNodeCollection (htmlElements) {
    this.htmlElements = htmlElements;
  };

  DOMNodeCollection.prototype.each = function (callback) {
    this.htmlElements.forEach(function (el) {
      callback(el);
    }.bind(this));
  };

  DOMNodeCollection.prototype.html = function (str) {
    if (str || str === "") {
      this.each(function (el) {
        el.innerHTML = str;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    this.html("");
  };
 
  DOMNodeCollection.prototype.append = function (obj) {
    if (obj instanceof (HTMLElement)) {
      this.each(function (el) {
        el.appendChild(obj);
      });
    } else if (obj instanceof (DOMNodeCollection)) {
      this.each(function (parentNode) {
        obj.each(function (childNode) {
          parentNode.appendChild(childNode);
        });
      });
    } else {
      this.each(function (el) {
        el.innerHTML += obj;
      });
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
