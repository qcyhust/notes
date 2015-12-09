# IndexedDB：浏览器端数据库

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

IndexedDB具备以下几项特点：
（1） 键值对储存（Key-Value）
IndexedDB内部采用对象仓库（object store）存放数据.
（2） 异步API（asynchronous API ）
IndexedDB数据库在执行增、删、改和查的操作时不会锁死浏览器，用户依然可以进行其它操作。
（3） 支持事务（transaction）
IndexedDB支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回到事务发生之前的状态，不存在只改写一部分数据的情况。
（4） 同域限制
IndexedDB也受到同域限制，每一个数据库对应创建该数据库的域名。
（5） 存储空间大
IndexedDB的存储空间比localStorage大得多，一般来说不少于250MB。

## 创建DB
