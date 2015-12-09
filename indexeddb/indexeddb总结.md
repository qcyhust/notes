# IndexedDB总结

在做实验室wifi信息采集后台管理系统时为了减少服务器端
大量数据连表查询的资源消耗，当时使用了indexedbd作为浏览器字典在本地
将id翻译为name。项目结束后觉得有必要将indexedbd的内容做一次总结。

## 概述
  浏览器端的缓存技术能减少向服务器发起请求的时间，现代浏览器的处理能力
越来越强，存放大量数据的需求也越来越明显。
目前的浏览器存储方案主要有cookie、localStorage、Web SQL以及indexeddb
首先是cookie，除了大小被限制在4kb，它还会被带在每一次请求中     
localstorage就是专门为小数量数据设计，存储的数据都是字符串，取出后可能需要借助js方法变成我们需要的数据格式，适合简单的数据  
WebSQL更像是关系型数据库，使用SQL查询数据，而IndexedDB更像是一个NoSQL数据库，W3C已经不再支持WebSQL


## 创建DB
        var openRequest = indexedDB.open(dbname, dbversion);
第一个参数是db的名字，第二个是db的版本号。可能触发4种事件

* success：打开成功。
* error：打开失败。
* upgradeneeded：db不存在或db版本发生变化。
* blocked：还有未关闭的db。



## 参考链接
[IndexedDB:浏览器里内置的数据库 – WEB骇客][1]   
[IndexedDB: 浏览器里内置的数据库简介][2]    
[前端的数据库：IndexedDB入门][3]  
[IndexedDB：浏览器端数据库][4]
[1]: http://www.webhek.com/indexeddb/  
[2]: http://blog.csdn.net/inter_peng/article/details/49133081
[3]: http://web.jobbole.com/81793/
[4]: http://javascript.ruanyifeng.com/bom/indexeddb.html
