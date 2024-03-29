(function (window) {
  "use strict";

  var App = window.App || {};
  var $ = window.jQuery;
  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
    CheckList.prototype.addRow = function (coffeeOrder) {
      //remove any existing rows that match the email addKeyPressHandler
      this.removeRow(coffeeOrder.emailAddress);
      //create new instance of row, using the coffee order info
      var rowElement = new Row(coffeeOrder);
      //add the new row isntance's $element prop to the CheckList
      this.$element.append(rowElement.$element);
    };
  }


  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on("click", "input", function(event) {
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element.find("[value=\"\' + email + \'\"]").closest("[data-coffee-order=\"checkbox\"]").remove();
  };

  function Row(coffeeOrder) {
    //Constructor code here
    var $div = $("<div></div>", {
      "data-coffee-order": "checkbox",
      "class": "checkbox"
    });

    var $label = $("<label></label>");

    var $checkbox = $("<input></input>", {
      type: "checkbox",
      value: coffeeOrder.emailAddress
    });

    var description = coffeeOrder.size + " ";
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + " ";
    }

    description += coffeeOrder.coffee + ", ";
    description += " (" + coffeeOrder.emailAddress + ")";
    description += " [" + coffeeOrder.strength + "x]";

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
