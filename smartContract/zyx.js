"use strict";
var ZyxItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.key = obj.key;
        this.value = obj.value;
        this.date = obj.date;
        this.money = obj.money;
        this.addr = obj.addr;
        this.remark = obj.remark;
    } else {
        this.key = "";
        this.value = "";
        this.date = "";
        this.money = "";
        this.addr = "";
        this.remark = "";
    }
};

ZyxItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var Zyx = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new ZyxItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

Zyx.prototype = {
    init: function () {
        console.log('init');
    },
    save: function (value, money, date,addr,remark) {
        var from = Blockchain.transaction.from;
        var zyxItem = this.repo.get(from);
        if (zyxItem) {
            zyxItem.value = JSON.parse(zyxItem).value + '|-' + value;
            zyxItem.money = JSON.parse(zyxItem).money + '|-' + money;
            zyxItem.date = JSON.parse(zyxItem).date + '|-' + date;
            zyxItem.addr = JSON.parse(zyxItem).addr + '|-' + addr;
            zyxItem.remark = JSON.parse(zyxItem).remark + '|-' + remark;
            this.repo.put(from, zyxItem);
        } else {
            zyxItem = new ZyxItem();
            zyxItem.key = from;
            zyxItem.value = value;
            zyxItem.money = money;
            zyxItem.date = date;
            zyxItem.addr = addr;
            zyxItem.remark = remark;
            this.repo.put(from, zyxItem);
        }
    },
    get: function (key) {
        var from = Blockchain.transaction.from;
        return this.repo.get(from);
    }
};
module.exports = Zyx;