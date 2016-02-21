DefineModule('utils/timer', function (require) {
    var lastTime;

    function log(tag) {
        var now = new Date().valueOf();
    
        if (!lastTime) {
            console.log('timing: ' + tag);
        } else {
            console.log('timing: ' + tag, now - lastTime);
        }
    
        lastTime = now;
    }

    return {
        log: log
    };
});
