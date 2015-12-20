javascript在设计之初仅仅是为了服务网页上的用户互动，作为一种网页脚本语言，javascript中设计了面向对象中的基础——对象，但是却在一切从简的设计原则下没有类的定义，在继承中定义了原型链，这让它与其他面向对象语言相比，显得很独特。

# 封装
面向对象中的封装将类打包到共有接口并私有实现，javascript中没有类，要将属性和行为封装到一个对象中有几种实现方法。

### 工厂模式
工厂模式就是创建一个函数，利用函数创建对象，并返回这个对象，这个函数叫工厂函数。

    var Person = function(name, age, idNum) {
        var obj = {
            name: name,
            age: age,
            idNum: idNum
        };
        return obj;
    }

    var wang = Person('panda wang', 32, 9527);
    var li = Person('jack li', 21, 4390);
这种模式对象都由工厂函数创建，这些对象之间没有相互的联系，缺少类标识。

### 构造函数模式
javascript的构造函数与类中的构造函数都是对象的入口，生成对象实例是相似的。javascript提供原始类型的构造函数：

    var obj = new Object();
    var arr = new Array();
构造函数从本质上看是内部使用this变量的函数，通过new运算符生成实例。

    var Person = function(name, age) {
        this.name = name;
        this.age = age;
        this.eat = function() {
            console.log('eat something');
        }
    }

    var wang = new Person('panda wang', 32);
    var li = new Person('jack li', 21);
new的作用是执行构造函数，返回对象实例。先创建一个空对象，将函数中的this指向这个空对象，执行构造函数，添加属性，最后返回这个对象。


### 构造函数模式升级
构造函数模式有一个缺点，就是每个实例对象都创建内存副本，有些可以共享的属性和方法会被多次创建副本，在内存中存放重复的内容，不能做到共享，造成资源浪费。  
在javascript中每个构造函数都有一个prototype属性，指向另一个对象叫做原型对象，原型对象会被实例对象继承。原型对象中有一个属性constructor指向构造函数自己。  
将可共享的属性和方法写入原型对象就能实现数据的共享，节约资源。

    var Person = function(name, age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype.isChinese = true;
    Person.prototype.eat = function() {
        console.log('eat something');
    }

    var wang = new Person('panda wang', 32);
    var li = new Person('jack li', 21);

    console.log(wang.isChinese) //true
需要注意的实例对象指向原型对象，在内存中都是同一个地址，修改原型对象会影响所有的实例对象。

    Person.prototype.isChinese = false;
    console.log(wang.isChinese) //false
    console.log(wang.isChinese) //false

# 继承

面向对象中继承是创建类的方法之一，子类继承超类中的属性和方法是代码重用的一个重要部分。javascript中的继承也有几种实现方法。

### 构造函数继承
利用call或apply方法，将父对象上的属性方法绑定到子对象上。

    var Person = function() {
        this.species = 'human';
    }
    Person.prototype.isChinese = true;

    var Employee = function(idNum) {
        Person.apply(this, arguments);
        this.idNum = idNum;
    }

    var employee = new Employee(12341);

    console.log(employee.species) //human
    console.log(employee.isChinese) //undefined
这个方法的问题是子对象不能继承原型对象上的属性和方法，而且子对象和父对象的构造函数的参数传递需要一些约定。

### 利用原型继承
利用原型对象继承有两种方法。      
第一种，将子对象的原型对象指向父对象的实例。修改原型对象后要将constructor修正。

    var Person = function(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.isChinese = true;

    var Employee = function(idNum) {
        this.idNum = idNum;
    }
    Employee.prototype = new Person();
    Employee.prototype.constructor = Employee;
第二种，直接继承父对象的原型对象，同样要修正子对象的constructor。

    var Person = function(name, age) {
    }
    Person.prototype.isChinese = true;

    var Employee = function(idNum) {
        this.idNum = idNum;
    }
    Employee.prototype = Person.prototype;
    Employee.prototype.constructor = Employee;
第一种方法的效率不高。第二种方法存在修改父对象原型都会反映到子对象的问题，并且将父对象原型的contructor也修改了。

### 间接利用原型继承
与直接利用原型继承不用，这种方法利用一个空对象作为中介。

    function extend(Child, Parent) {
        var F = function(){};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.uber = Parent.prototype;
    }

    var Person = function(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.isChinese = true;

    var Employee = function(name, age, idNum) {
        this.uber.constructor.apply(this, arguments);
        this.idNum = idNum;
    }
    Employee.prototype.setIdNum = function(num) {
        this.idNum = num;
    }

    extend(Employee, Person);


### 拷贝继承
拷贝继承将父对象的属性拷贝进子对象。将父对象的不变属性都放到prototype上。

    function extend(child, parent) {
        for (var key in parent.prototype) {
            child.prototype[key] = parent.prototype[key];
        }
        child.prototype.uber = parent.prototype;
        return child;
    }

    var Person = function() {
    }
    Person.prototype.isChinese = true;

    var Employee = function(idNum) {
        this.idNum = idNum;
    }
    Employee.prototype.setIdNum = function(num) {
        this.idNum = num;
    }

    extend(Employee, Person);


### coffeeScript采用的继承

    var Person = function(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.isChinese = true;

    function extend(child, parent) {
        for (var key in parent) {
            alert(key)
            if ({}.hasOwnProperty.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };

    var Employee = function(name, age, idNum) {
        this.__super__.constructor.apply(this, arguments);

        this.idNum = idNum;
    }
    Employee.prototype.setIdNum = function(num) {
        this.idNum = num;
    }

    extend(Employee, superClass);

# 多态
面向对象中多态是向同一个超类继承的各个子类发出相同的消息时，各个子类做出不同的响应。在javascript中，也就是各个子对象做出不同的响应。

    function extend(Child, Parent) {　　　　
        var F = function() {};　　　　
        F.prototype = Parent.prototype;　　　　
        Child.prototype = new F();　　　　
        Child.prototype.constructor = Child;　　　　
        Child.uber = Parent.prototype;　　
    }

    var Shape = function(type) {
        this.type = type;
    }
    Shape.prototype.draw = function() {
        this.getArea();
    }

    var Circle = function(type, radius) {
        Circle.uber.constructor.apply(this, arguments);
        this.getArea = function() {
            console.log('画一个' + this.type + ', 面积: ' + radius * radius *
                3.14);
        }
    }


    var Rectangle = function(type, width, height) {
        Rectangle.uber.constructor.apply(this, arguments);
        this.getArea = function() {
            console.log('画一个' + this.type + ', 面积: ' + width * height);
        }
    }

    extend(Circle, Shape);
    extend(Rectangle, Shape);

    var c = new Circle('circle', 1);
    var r = new Rectangle('rectangle', 2, 3);

    c.draw();
    r.draw();
Circle和Rectangle都继承自Shape对象，在调用draw时，做出不同的绘制响应。符合类对自己的行为负责。如果是过程式的设计则要根据属性type使用if或switch调用不同的方法。
