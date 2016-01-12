(function() {
    Function.prototype.before = function(beforefn) {
        var self = this;
        return function() {
            if (beforefn.apply(this, arguments)) {
                return self.apply(this, arguments);
            }
        };
    };

    Function.prototype.after = function(afterfn) {
        var self = this;
        return function() {
            var ret = self.apply(this, arguments);
            afterfn.apply(this, arguments);
            return ret;
        };
    }
})();
