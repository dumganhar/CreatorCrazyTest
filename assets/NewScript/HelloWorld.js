// const Timer = require("Timer");

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = 20123456121.89112;//this.text;
        window.currentScene = 0;
        this.gamesceneID = ++window.sceneID;
        console.log("==> Helloworld scene onload: " + this.gamesceneID);
        window.startAutoRun();

        let node = this.label.node;
        let move = cc.moveBy(Math.random() / 20.0, cc.p(0, -100));
        let callback = cc.callFunc(function(sender) {
            console.log("Helloworld callback...");
        }, this);
        callback.gamesceneID = this.gamesceneID;
        // console.log("==> before runAction ...: " + this.gamesceneID);
        node.runAction(cc.sequence(move, callback));
    },

    // called every frame
    update: function (dt) {

    },

    goTo2Scene () {
        cc.director.loadScene("SecondScene");
    }
});
