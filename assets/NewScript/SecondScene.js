// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        testbutton: {
            default: null,
            type: cc.Button
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        window.currentScene = 1;
        this.gamesceneID = ++window.sceneID;

        console.log("==> button script onLoad: " + this.gamesceneID);

        this.oldPosArray = [];
        this.testNodeArray = [];
        var step = 30;
        var deltaX = 960.0 / step;
        var deltaY = 640.0 / step;
        for (var i = 0; i < step; ++i) {
            var node = cc.instantiate(this.testbutton.target);
            node.parent = this.node;
            node.x = deltaX * i - 480;
            node.y = Math.random() * 640 - 320;
            node._autoid = i;

            this.testNodeArray.push(node);
            this.oldPosArray.push({x: node.x, y: node.y});

            this.startAction(node, i);
        }
    },

    start () {
        console.log("==> button script start...");
    },

    goto1Scene() {
        console.log("==> goto 1 scene");
        cc.director.loadScene("helloworld");
    },

    onTestButtonClick() {
        console.log("==> test crash button click!")
    },

    startAction: function(node, i) {
        // console.log("node: " + node + ", i = " + i);
        node.x = this.oldPosArray[i].x;
        node.y = this.oldPosArray[i].y;
        node.stopAllActions();
        let move = cc.moveBy(Math.random() / 20.0, cc.p(0, -100));
        let callback = cc.callFunc(this.onSwapFinished, this);
        callback.gamesceneID = this.gamesceneID;
        // console.log("==> before runAction ...: " + this.gamesceneID);
        node.runAction(cc.sequence(move, move.reverse(), callback));
        // console.log("==> after runAction ..." + this.gamesceneID);

        // let cb2 = cc.callFunc(function(sender){
        //     // console.log("==> fade callback ...");
        // });
        // cb2.gamesceneID = this.gamesceneID;
        // node.runAction(cc.sequence(cc.fadeIn(Math.random() / 40), cc.fadeOut(Math.random() / 40), cb2));
    },

    onSwapFinished: function(target) {
        console.log("==> onSwapFinished, sceneID: " + this.gamesceneID);
        this.startAction(target, target._autoid);
    },

    update:function(dt) {
        if (Math.random() > 0.8) {
            for (var i = 0; i < this.testNodeArray.length; ++i) {
                this.startAction(this.testNodeArray[i], i);
            }
        }
    },

    onDestroy() {
        console.log("==> scene destroy: " + this.gamesceneID);
    }

});
