var utils = function() {
    
    var _getRegExp = function(klass) {
        return new RegExp("(?:^|)(" + klass + ")(?:|$)", 'g');
    };

    var hasClass = function(el, className) {
        var re = _getRegExp(className);
        return re.test(el.className);
    };

    var addClass = function(el, className) {
        if (className && !hasClass(el, className)) {
            el.className += " " + className;
        }
    };

    var removeClass = function(el, className) {
        var newClass = '';
        if (className && hasClass(el, className)){
            newClass = el.className.replace(_getRegExp(className), " ");
            el.className = newClass.trim();
        }
    };

    return {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass
    };

}();
