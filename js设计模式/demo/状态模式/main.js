var plugin = (function() {
    var plugin = document.createElement('embed');
    plugin.style.display = 'none';

    plugin.type = 'application/txftn-webkit';

    plugin.sign = function() {
        console.log('开始文件扫描');
    };

    plugin.sign = function() {
        console.log('开始文件扫描');
    };

    plugin.pause = function() {
        console.log('暂停文件上传');
    };

    plugin.uploading = function() {
        console.log('开始文件上传');
    };

    plugin.del = function() {
        console.log('删除文件上传');
    };

    plugin.done = function() {
        console.log('文件上传成功');
    };

    document.body.appendChild(plugin);

    return plugin;
})();

var SignState = function(uploader) {
    this.uploader = uploader;
    this.initControlBtn();
};

SignState.prototype.initControlBtn = function() {
    this.uploader.btn1.style.display = 'none';
    this.uploader.btn2.style.display = 'none';
};

var UploadingState = function(uploader) {
    this.uploader = uploader;
    this.initControlBtn();
};

UploadingState.prototype.initControlBtn = function() {
    this.uploader.btn1.style.display = 'inline';
    this.uploader.btn2.style.display = 'inline';
};

UploadingState.prototype.onclickPauseBtn = function() {
    this.uploader.pause();
};

UploadingState.prototype.onclickDelBtn = function() {
    this.uploader.del();
};

var PauseState = function(uploader) {
    this.uploader = uploader;
    this.initControlBtn();
};

PauseState.prototype.initControlBtn = function() {
    this.uploader.btn1.style.display = 'inline';
    this.uploader.btn2.style.display = 'inline';
};

PauseState.prototype.onclickPauseBtn = function() {
    this.uploader.pause();
};

PauseState.prototype.onclickDelBtn = function() {
    this.uploader.del();
};

var DoneState = function(uploader) {
    this.uploader = uploader;
    this.initControlBtn();
};

DoneState.prototype.initControlBtn = function() {
    this.uploader.btn1.style.display = 'none';
    this.uploader.btn2.style.display = 'inline';
};

DoneState.prototype.onclickDelBtn = function() {
    this.uploader.del();
};

var Uploader = function(filename) {
    this.plugin = plugin;
    this.filename = filename;

    this.init();
};

Uploader.prototype.init = function() {
    this.dom = document.createElement('div');
    this.dom.innerHTML = '<span>文件名: ' + this.filename + '</span>' +
        '<input data-action="btn1" type="button" value="暂停" />' +
        '<input data-action="btn2" type="button" value="删除" />' +
        '<span data-action="stateInfo"><span>';

    document.body.appendChild(this.dom);

    this.btn1 = this.dom.querySelector('[data-action="btn1"]');
    this.btn2 = this.dom.querySelector('[data-action="btn2"]');
    this.stateInfo = this.dom.querySelector('[data-action="stateInfo"]');

    this.btn1.style.display = 'none';
    this.btn2.style.display = 'none';

    this.bindEvent();
};

Uploader.prototype.bindEvent = function() {
    this.btn1.onclick = function() {
        this.currState.onclickPauseBtn();
    }.bind(this);

    this.btn2.onclick = function() {
        this.currState.onclickDelBtn();
    }.bind(this);
};

Uploader.prototype.sign = function() {
    this.currState = new SignState(this);
    this.stateInfo.innerHTML = "文件开始扫描";
    this.plugin.sign();
};

Uploader.prototype.uploading = function() {
    this.currState = new UploadingState(this);
    this.stateInfo.innerHTML = "文件正在上传";
    this.plugin.uploading();
};

Uploader.prototype.pause = function() {
    this.currState = new PauseState(this);
    this.stateInfo.innerHTML = "文件上传暂停";
    this.plugin.pause();
};

Uploader.prototype.del = function() {
    this.dom.parentNode.removeChild(this.dom);
    this.plugin.del();
};

Uploader.prototype.done = function() {
    this.currState = new DoneState(this);
    this.stateInfo.innerHTML = "文件上传成功";
    this.plugin.done();
};

var uploadObj = new Uploader('设计模式.txt');

window.external.upload = function(state) {
    uploadObj[state]();
};

window.external.upload('sign');

setTimeout(function() {
    window.external.upload('uploading');
}, 1000);

setTimeout(function() {
    window.external.upload('done');
}, 5000);
