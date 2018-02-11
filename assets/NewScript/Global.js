
window.AutoRunScheduleTarget = {

    scheduleCallback(dt) {
        console.log("scheduleCallback ...");
    }
};

window.isAutoRunInited = false;
window.currentScene = 0;
window.autoRunTimeout = 1000;
window.sceneID = -1;


window.startAutoRun = function() {
    if (isAutoRunInited)
        return;

    // cc.director.getScheduler().unschedule(window.AutoRunScheduleTarget, window);
    console.log("==> startAutoRun");

    // cc.director.getScheduler().schedule(window.AutoRunScheduleTarget, window, Math.random());

    var timeoutCallback = function() {
        if (CC_JSB) {
            // console.log("==> timeout... jsb obj count:" + __jsc__.getJSBindingObjectCount());
        } else {
            // console.log("==> timeout ...");
        }

        if (window.currentScene === 0) {
            cc.director.loadScene("SecondScene");
            window.currentScene = -1;
        }
        else if (window.currentScene === 1) {
            cc.director.loadScene("helloworld");
            window.currentScene = -1;
        }

        setTimeout(timeoutCallback, Math.random() * window.autoRunTimeout);
    }

    setTimeout(timeoutCallback, Math.random() * window.autoRunTimeout);

    isAutoRunInited = true;
};
