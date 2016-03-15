# let和const命令

### let命令
ES6新增let命令，用于声明变量，与var相比，let命令的区别有
* 声明的变量只在let命令所在代码块中有效

        {
            let a = 1;
            var b = 2;
        }
        a //undefined
        b //2
* 不发生变量提升现象

        {
            console.log(a); //undefined
            let a = 2;
        }
* 在同一作用域中不允许重复声明

        function foo() {
           let a = 1;
           let a = 1;
        } //报错

### count命令
count命令用来声明常量，一旦声明就不能修改。

        const PI = 3.14;
        PI //3.14

        PI = 3;
        PI //3.14

        const PI = 5;
        PI //3.14
const命令作用域和let命令一样，const命令也禁止重复声明。

### 块级作用域
ES5只有全局作用域和函数作用域，ES6中有了块级作用域。let命令增加了块级作用域。

        function foo() {
            let n = 5;
            if(true) {
                let n = 10;
            }
            console.log(n); //5
        }

        function foo() {
            let n = 5;
            if(true) {
                console.log(n); //5
            }
        }

        function foo() {
            let n = 5;
            if(true) {
                console.log(n); //undefined
                let n = 10;
            }
        }

        var s = [];

        for (let i = 0; i < 10; i++){
          s[i] = function() {
              console.log(i);
          }
        }

        s[7](); // 7
块级作用域的出现使得广泛应用的立即函数在某些情况下不在需要了。




















