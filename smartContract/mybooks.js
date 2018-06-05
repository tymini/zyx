"use strict";
var MyBooksItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.key = obj.key;
        this.value = obj.value;
        this.date = obj.date;
        this.money = obj.money;
    } else {
        this.key = "";
        this.value = "";
        this.date = "";
        this.money = "";
    }
};

MyBooksItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var MyBooks = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new MyBooksItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

MyBooks.prototype = {
    init: function () {
        console.log('init');
    },
    save: function (value, money, date) {
        var from = Blockchain.transaction.from;
        var myBooksItem = this.repo.get(from);
        if (myBooksItem) {
            myBooksItem.value = JSON.parse(myBooksItem).value + '|-' + value;
            myBooksItem.money = JSON.parse(myBooksItem).money + '|-' + money;
            myBooksItem.date = JSON.parse(myBooksItem).date + '|-' + date;
            this.repo.put(from, myBooksItem);
        } else {
            myBooksItem = new MyBooksItem();
            myBooksItem.key = from;
            myBooksItem.value = value;
            myBooksItem.money = money;
            myBooksItem.date = date;
            this.repo.put(from, myBooksItem);
        }
    },
    get: function (key) {
        var from = Blockchain.transaction.from;
        return this.repo.get(from);
    }
};
module.exports = MyBooks;