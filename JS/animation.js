class Animate {
    constructor(name, if_r, ifNew) {
        this.name = name;
        this.if_r = if_r;
        this.ifNew = ifNew;
        this.init();
    }
    getName() {
        return this.name;
    }
    init() {
        console.log(this.name);
        var i = 0;
        for (i = 0; i < initLoad.length; i++)
            if (initLoad[i] == this.name)
                break;
        sum++;
        if (i == initLoad.length) {
            initLoad.push(this.name);
            var ifNew = this.ifNew;
            var name = this.name;
            var loadAdd = this.loadAdd;
            var mouse = this.mouse;
            PIXI.loader.add(this.name, 'spine/' + this.name + '/' + if_r + this.name + '.json')
                .load(function (loader, resources) {
                    var animation = new PIXI.spine.Spine(resources[name].spineData);
                    spineResources.set(name, resources[name].spineData);
                    loadAdd(animation, stage, name, ifNew);
                    mouse(animation, stage, name, ifNew);
                });
        } else {
            console.log("资源已经存在");
            var animation = new PIXI.spine.Spine(spineResources.get(this.name));
            this.loadAdd(animation, stage, this.name, this.ifNew);
            this.mouse(animation, stage, this.name, this.ifNew);
        }
    }
    loadAdd(animation, stage, name, ifNew) {
        stage.addChild(animation);
        animation.state.addAnimationByName(0, 'wait', true, 0);

        if (ifNew == true)
            animation.x = -100;
        else
            animation.x = animation.x + Math.floor(Math.random() * window.innerWidth);
        animation.y = Y;
        animation.scale.x = double;
        animation.scale.y = double;
    }
    mouse(animation, stage, name, ifNew) {
        var num = 1;
        var y = 0;
        var isS = 0;
        animation.interactive = true;
        animation.buttonMode = true;
        var b = false;
        var a_width;
        var a_height;
        var ex = false;
        if (if_r == "r") {
            animation
                .on('mousemove', onDragMove)
                .on('mouseup', onDragEnd)
                .on('mouseover', onDragOver)
                .on('mouseout', onDragOut)
                .on('mousedown', onDragStart);
        } else {
            animation
                .on('mouseover', onDragOver)
                .on('mouseout', onDragOut);
        }
        if (Math.floor(Math.random() * 10) > 8)
            randomGo(1, ifNew);
        else
            randomGo(0, ifNew);
        function R_ex(event) {
            ex = true;
            sum--;
            stage.removeChild(animation);
            animation = null;
            Add();
        }
        function onDragStart(event) {
            num = 0;
            animation.state.setAnimationByName(0, 'pick', true, 0);
            b = true;
            var newPosition = event.data.getLocalPosition(stage);
            animation.y = newPosition.y - (15 * double);
            a_height = animation.y - newPosition.y;
            a_width = animation.x - newPosition.x;
            stage.setChildIndex(animation, sum - 1);
            if (document.getElementById("div1") != null)
                document.getElementById("div1").remove();
        }
        function onDragEnd(event) {
            b = false;
            var i = 8;
            requestAnimationFrame(down);
            function down() {
                if (animation.y + i < Y - 100 * double) {
                    animation.interactive = false;
                    animation.buttonMode = false;
                    animation.y += i;
                    i += 1;
                }
                else {
                    animation.state.setAnimationByName(0, 'wait', true, 0);
                    animation.y = Y;
                    animation.interactive = true;
                    animation.buttonMode = true;
                    isS = 0;
                    return;
                }
                requestAnimationFrame(down);
            }
        }
        function onDragMove(event) {
            if (b) {
                isS = 1;
                var newPosition = event.data.getLocalPosition(stage);
                animation.x = newPosition.x + a_width;
                if (newPosition.y + a_height > Y)
                    animation.y = Y;
                else
                    animation.y = newPosition.y + a_height;
            }
        }
        function onDragOver(event) {
            num = 0;
            if (isS == 0 && if_r == "r")
                animation.state.setAnimationByName(0, 'wait', true, 0);
            else if (isS == 0 && if_r == "")
                animation.state.setAnimationByName(0, 'attack', true, 0);
            stage.setChildIndex(animation, sum - 1);
            document.getElementsByTagName("canvas")[0].style.position = "absolute";
            if (animation.y == Y) {
                var div1 = document.createElement("div");
                div1.id = "div1";
                div1.innerHTML = name;
                div1.style.color = "aliceblue";
                div1.style.position = "absolute";
                div1.style.fontFamily = "黑体";
                div1.style.top = (window.innerHeight - 200 * double) + "px";
                document.body.appendChild(div1);
                div1.style.left = (animation.x - div1.offsetWidth / 2) + "px";
            }
        }
        function onDragOut(event) {
            num = 1;
            if (if_r == "")
                animation.state.setAnimationByName(0, 'wait', true, 0);
            if (Math.floor(Math.random() * 10) > 8)
                randomGo(1, false);
            else
                randomGo(0, false);
            if (document.getElementById("div1") != null)
                document.getElementById("div1").remove();
        }
        function randomGo(e, ifNew) {
            var r1 = Math.floor(Math.random() * 5) + 15;
            if (ifNew)
                r1 = 0.1;
            var t1 = window.setTimeout(function () {
                if (animation == null)
                    return;
                if (num == 1 && y == 0 && animation.y == Y) {
                    y = 1;
                    animation.state.setAnimationByName(0, 'move', true, 0);
                    var j = Math.floor(Math.random() * 10);
                    if (ifNew == true)
                        j = 1;
                    if (j > 6)
                        jump();
                    else {
                        var m = Math.floor(Math.random() * window.innerWidth);
                        if (e == 1) {
                            m = window.innerWidth + 200 * double;
                        }
                        var move;
                        if (if_r == "r")
                            move = 2;
                        else
                            move = 3;
                        if (m > animation.x)
                            requestAnimationFrame(move1);
                        else
                            requestAnimationFrame(move2);
                        function move1() {
                            if (num == 1 && m > animation.x) {
                                animation.x += move;
                                animation.scale.x = double;
                            }
                            else {
                                if (if_r == "" && m > animation.x)
                                    animation.state.setAnimationByName(0, 'attack', true, 0);
                                else
                                    animation.state.setAnimationByName(0, 'wait', true, 0);
                                y = 0;
                                if (e == 1 && animation.x > window.innerWidth)
                                    R_ex();
                                else
                                    if (Math.floor(Math.random() * 10) > 8)
                                        randomGo(1, false);
                                    else
                                        randomGo(0, false);
                                return;
                            };
                            requestAnimationFrame(move1);
                        }
                        function move2() {
                            if (num == 1 && m < animation.x) {
                                animation.x -= move;
                                animation.scale.x = -double;
                            }
                            else {
                                if (if_r == "" && m < animation.x)
                                    animation.state.setAnimationByName(0, 'attack', true, 0);
                                else
                                    animation.state.setAnimationByName(0, 'wait', true, 0);
                                y = 0;
                                if (e == 1 && animation.x > window.innerWidth)
                                    R_ex();
                                else
                                    if (Math.floor(Math.random() * 10) > 8)
                                        randomGo(1, false);
                                    else
                                        randomGo(0, false);
                                return;
                            };
                            requestAnimationFrame(move2);
                        }
                    }
                    if (Math.floor(Math.random() * 10) > 4)
                        stage.setChildIndex(animation, sum - 1);
                }
            }, r1 * 1000);
        }
        function jump() {
            animation.interactive = false;
            animation.buttonMode = false;
            animation.state.setAnimationByName(0, 'wait', true, 0);
            var i = jump_speed;
            requestAnimationFrame(j);
            function j() {
                if (i > 0) {
                    animation.y -= i;
                    i -= jump_acceleration;
                } else if (animation.y < Y) {
                    animation.y -= i;
                    i -= jump_acceleration;
                } else {
                    animation.interactive = true;
                    animation.buttonMode = true;
                    animation.state.setAnimationByName(0, 'wait', true, 0);
                    y = 0;
                    if (Math.floor(Math.random() * 10) > 8)
                        randomGo(1, false);
                    else
                        randomGo(0, false);
                    return;
                }
                requestAnimationFrame(j);
            }
        }
    }
}