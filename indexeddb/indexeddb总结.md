# IndexedDB总结

在做实验室wifi信息采集后台管理系统时为了减少服务器端
大量数据连表查询的资源消耗，当时使用了indexedbd作为浏览器字典在本地
将id翻译为name。项目结束后觉得有必要将indexedbd的内容做一次总结。

## 概述
  浏览器端的缓存技术能减少向服务器发起请求的时间，现代浏览器的处理能力
越来越强，存放大量数据的需求也越来越明显。
目前的浏览器存储方案主要有cookie、localStorage、Web SQL以及indexeddb。  
首先是cookie，除了大小被限制在4kb，它还会被带在每一次请求中。     
localstorage就是专门为小数量数据设计，存储的数据都是字符串，取出后可能需要借助js方法变成我们需要的数据格式，适合简单的数据。  
WebSQL更像是关系型数据库，使用SQL查询数据，而IndexedDB更像是一个NoSQL数据库，W3C已经不再支持WebSQL。


## 创建DB
首先检测浏览器是否支持indexeddb。  

        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        if(window.indexedDB) {
            var openRequest = indexedDB.open(dbname, dbversion);
        }

第一个参数是db的名字，第二个是db的版本号。可能触发4种事件

* success：打开成功。
* error：打开失败。
* upgradeneeded：db不存在或db版本发生变化（版本号只有增加才起作用）。
* blocked：还有未关闭的db。

## 创建仓库
一般在upgradeneeded事件中创建仓库。

        openRequest.onupgradeneeded = function(event){
        db = event.target.result;
        var objectStore = db.createObjectStore("students", { keyPath : "rollNo" });
        };
使用createObjectStore方法创建仓库，第一个参数是仓库名，第二个仓库可选，设置仓库键名，使用keyPath设置存入对象的rollNo属性作为键名。也可以设置一个自增的整数作为键名{ autoIncrement: true }  
db.objectStoreNames属性返回一个DOMStringList对象，里面有当前数据库仓库的名字。可以用来判断当前数据库是否包含某个仓库。

## 事务
使用transaction方法创建事务，在数据库中添加、读取、删除、更新数据都需要先创建事务。

        var transaction = db.transaction(["students"], "readwrite");
第一个参数是仓库名，第二个操作类型可选，添加用readwrite，读取用readonly。  
transaction方法有三个事件，可以用来定义回调函数。
* abort：事务中断。
* complete：事务完成。
* error：事务出错。

## 数据的增删改查
首先用仓库名获取对象仓库，数据的操作都在仓库对象中。

        var store = transaction.objectStore("students");
添加数据

        var student = {
            id: 1,
            name: jack,
            age: 23
        }
        var request = store.add(student, key);
add方法第一参数是要添加的数据对象，第二个是指定数据对象的键名，如果在创建仓库时用keypath指定了，则不用设置。

删除数据

       var request = store.delete(id);
delete方法需要传入数据对象的键名就可以删除数据。

更新数据

        var request = store.put(newStudent, id);
put方法传入新的数据对象以及需要更新的数据对象的键名。

读取数据

        var request = store.get(id);
        request.onsuccess = function(event){
            console.log("name : "+ event.result.name);  
        }；  
get方法传入键名即可在成功回调函数中获得要查询的数据对象。  

遍历操作

        var cursor = store.openCursor();
        cursor.onsuccess = function(e) {
            var res = e.target.result;
            if(res) {
                console.log("name: " + res.name);
                res.continue();
            }
        }
openCursor创建一个读取光标，在回调函数中遍历仓库中的数据对象。   

增删改查以及遍历操作都有自己的回调函数：
* success：操作成功。
* error：操作出错。

## 索引

仓库可以用createIndex方法创建索引方便查询。

        store.createIndex("name","name", {unique:false});
createIndex方法第一个参数是索引名称，第二个参数是索引使用的数据对象的属性名，第三个参数设置索引指向的属性名是否有唯一值。  
添加索引后，可以利用索引读取对象。

        var index = store.index("name");
        var request = index.get(name);
同样也是在成功回调函数中处理数据对象。   
可以利用IDBKeyRange对象指定索引的读取范围

        var range = IDBKeyRange.bound('jack', 'tom');
        index.openCursor(range).onsuccess = function(e) {
            var cursor = e.target.result;
            if(cursor) {
                console.log(cursor.id + ": " + cursor.name);
                cursor.continue();
            }
        }

## 参考链接
[IndexedDB:浏览器里内置的数据库 – WEB骇客][1]   
[IndexedDB: 浏览器里内置的数据库简介][2]    
[前端的数据库：IndexedDB入门][3]  
[IndexedDB：浏览器端数据库][4]
[1]: http://www.webhek.com/indexeddb/  
[2]: http://blog.csdn.net/inter_peng/article/details/49133081
[3]: http://web.jobbole.com/81793/
[4]: http://javascript.ruanyifeng.com/bom/indexeddb.html
