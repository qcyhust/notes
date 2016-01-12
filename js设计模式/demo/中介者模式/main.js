var goods = {
    '红色|16G': 3,
    '红色|32G': 0,
    '红色|64G': 7,
    '蓝色|16G': 2,
    '蓝色|32G': 6,
    '蓝色|64G': 12
};

var colorSelect = document.getElementById('colorSelect');
var memorySelect = document.getElementById('memorySelect');
var numberInput = document.getElementById('numberInput');
var colorInfo = document.getElementById('colorInfo');
var numberInfo = document.getElementById('numberInfo');
var nextBtn = document.getElementById('nextBtn');

colorSelect.onchange = function() {
    mediator.receiveMessage('changeColor', this);
};

numberInput.oninput = function() {
    mediator.receiveMessage('changeNumber', this);
};

memorySelect.onchange = function() {
    mediator.receiveMessage('changeMemory', this);
};


var mediator = (function() {

    var Attributies = {
        color: '',
        memory: '',
        number: ''
    };

    var ErrorInfo = {
        'color': '颜色',
        'memory': '内存',
        'number': '数量'
    };

    var messageManager = {
        changeColor: function(selector) {
            Attributies.color = colorInfo.innerHTML = selector.value;
            changeBtnState();
        },
        changeMemory: function(selector) {
            Attributies.memory = memoryInfo.innerHTML =
                selector.value;
            changeBtnState();
        },
        changeNumber: function(number) {
            Attributies.number = numberInfo.innerHTML = number.value;
            changeBtnState();
        },
    };

    var changeBtnState = function() {
        var goodsNumber = getStockNumber();

        if (goodsNumber === undefined) {
            var errorInfo = checkAttribute();
            nextBtn.value = '请选择' + ErrorInfo[errorInfo];
            nextBtn.disabled = true;
            return;
        }

        if (!Attributies.number) {
            nextBtn.value = '请填写正确的数量';
            nextBtn.disabled = true;
            return;
        };

        if (goodsNumber >= Attributies.number) {
            nextBtn.value = '放入购物车';
            nextBtn.disabled = false;
        } else {
            nextBtn.value = '库存不足';
            nextBtn.disabled = true;
        }
    };

    var getStockNumber = function() {
        return goods[Attributies.color + '|' + Attributies.memory];
    };

    var checkAttribute = function() {
        for (var key in Attributies) {
            if (Attributies[key] === '') {
                return key;
            }
        }
    };

    var receiveMessage = function() {
        var message = Array.prototype.shift.apply(arguments);
        messageManager[message].apply(this, arguments);
    };

    return {
        receiveMessage: receiveMessage
    };
})();
