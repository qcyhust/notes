var loginBtn = document.getElementById('loginButton');
var loginForm = document.getElementById('loginForm');

var showLogin = function() {
    loginForm.style.display = 'block';
};

var log = function(tag) {
    console.log('上报数据: ' + this.getAttribute('tag'));
};

showLogin = showLogin.after(log);

loginBtn.onclick = showLogin;


/**       表单验证        **/
var username = document.getElementById('username');
var password = document.getElementById('password');
var submitBtn = document.getElementById('submitBtn');

var formSubmit = function() {
    var param = {
        username: username.value,
        password: password.value
    };
    ajax('http://xxxxxxxxxxx.com', 'post', param);
};

var ajax = function(url, type, param) {
    console.log(param);
};

var validata = function() {
    if (username.value === '') {
        console.log('用户名不能为空');
        return false;
    }
    if (password.value === '') {
        console.log('密码不能为空');
        return false;
    }
    return true;
};

formSubmit = formSubmit.before(validata);

submitBtn.onclick = formSubmit;
