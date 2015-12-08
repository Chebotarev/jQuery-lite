(function (root) {

  function DOMNodeCollection (htmlElements) {
    this.htmlElements = htmlElements;
  };

  DOMNodeCollection.prototype = {
    each: function (callback) {
      this.htmlElements.forEach(function (el) {
        callback(el);
      }.bind(this));
    },

    html: function (str) {
      if (typeof(str) === "string") {
        this.each(function (el) {
          el.innerHTML = str;
        });
      } else {
        if (this.htmlElements.length > 0) {
          return this.htmlElements[0].innerHTML;
        }
      }
    },

    empty: function () {
      this.html("");
    },
  
    append: function (obj) {
      switch(typeof (obj)) {
        case("string"):
          this.each(function (el) {
            el.innerHTML += obj;
          });
          break;
        case("object"):
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
          }
          break;
      }

      return this.htmlElements;
    },

    children: function () {
      var childrenCollection = new DOMNodeCollection([]);
      var children;

      this.each(function (el) {
        children = el.children;
        for (var i = 0; i < children.length; i++) {
          childrenCollection.htmlElements.push(children[i]);
        }
      });
      return childrenCollection;
    },

    parent: function () {
      var parentCollection = new DOMNodeCollection([]);
      var parentEl;

      this.each(function (el) {
        parentEl = el.parentElement;
        if (parentEl) {
          parentCollection.htmlElements.push(parentEl);
        }
      });

      return parentCollection;
    }
  }

  root.$l = function (arg) {
    var nodeArray;
    
    switch (typeof arg) {
      case("string"):
        var nodeList = document.querySelectorAll(arg);
        nodeArray = Array.prototype.slice.call(nodeList);
        break;
      case("object"):
        if (arg instanceof (HTMLElement)) {
          nodeArray = [arg];
        }
    }
    
    return new DOMNodeCollection(nodeArray);
  };

})(this);
