game.PlayScreen = me.ScreenObject.extend({
    init: function() {
        me.audio.play("theme", true);
        // lower audio volume on firefox browser
        var vol = me.device.ua.indexOf("Firefox") !== -1 ? 0.3 : 0.5;
        me.audio.setVolume(vol);
        this._super(me.ScreenObject, 'init');
    },

    onResetEvent: function() {
        me.game.reset();
        me.audio.stop("theme");
        if (!game.data.muted) {
            me.audio.play("theme", true);
        }
    
        // Устанавливаем начальные значения
        game.data.score = 0;
        game.data.steps = 0;
        game.data.start = false;
        game.data.newHiscore = false;
    
        // Добавляем фон с динамическими размерами
        me.game.world.addChild(new BackgroundLayer('bg', 1));
    
        const groundHeight = 96; // Высота земли
        this.ground1 = me.pool.pull('ground', 0, window.innerHeight - groundHeight);
        this.ground2 = me.pool.pull('ground', window.innerWidth, window.innerHeight - groundHeight);
        me.game.world.addChild(this.ground1, 11);
        me.game.world.addChild(this.ground2, 11);
    
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD, 11);
    
        this.bird = me.pool.pull("clumsy", 60, window.innerHeight / 2 - 100);
        me.game.world.addChild(this.bird, 10);
    
        // Inputs
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.SPACE);
    
        this.getReady = new me.Sprite(
            window.innerWidth / 2,
            window.innerHeight / 2,
            {image: 'getready'}
        );
        me.game.world.addChild(this.getReady, 11);
    
        var that = this;
        var fadeOut = new me.Tween(this.getReady).to({alpha: 0}, 2000)
            .easing(me.Tween.Easing.Linear.None)
            .onComplete(function() {
                game.data.start = true;
                me.game.world.addChild(new game.PipeGenerator(), 0);
                me.game.world.removeChild(that.getReady);
            }).start();
    },
    
});
