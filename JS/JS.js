var sum = 0;
var renderer;
var stage;
var Y = window.innerHeight;
var initLoad = new Array();
var weekArray = new Array("一", "二", "三", "四", "五", "六", "日");
var spineResources = new Map();
var if_r;

function init() {

    Configuration();

    if (start == false)
        return;
    renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: true });
    document.body.appendChild(renderer.view);
    stage = new PIXI.Container();

    var R = new Array();
    for (var j = 0; j < quantity; j++) {
        R[j] = json[Math.floor(Math.random() * 323)].name;
        var x = 0;
        var y = 0;
        while (true) {
            for (x = 0; x < pc.length; x++)
                if (R[j] == pc[x])
                    break;
            for (y = 0; y < j; y++)
                if (R[j] == R[y])
                    break;
            if (x == pc.length && y == j)
                break;
            else
                R[j] = json[Math.floor(Math.random() * (323 - 1 + 1)) + 1].name;
        }
    }
    for (var j = 0; j < quantity; j++)
        var animation = new Animate(R[j], if_r, false);

    animate();
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(stage);
    }
}

function Add() {
    var name = json[Math.floor(Math.random() * (323 - 1 + 1)) + 1].name;
    var x = 0;
    while (true) {
        for (x = 0; x < pc.length; x++)
            if (name == pc[x])
                break;
        if (x == pc.length)
            break;
        else
            name = json[Math.floor(Math.random() * 323)].name;
    }
    console.log(name);
    new Animate(name, if_r, true);
}

function Configuration() {
    if (battle == true) if_r = "";
    else if_r = "r";
    if (start_Transparent == true) {
        var scene = document.getElementById('scene');
        var pa = new Parallax(scene);
    } else document.getElementById('scene').remove();
    if (start_time == true) {
        var scene_time = document.getElementById("scene_time");
        var time_ = document.getElementById("time");
        var time_day = document.getElementById("time_day");
        var time_week = document.getElementById("time_week");
        time_.style.margin = time_margin;
        time_day.style.margin = time_day_margin;
        time_week.style.margin = time_week_margin;
        var pa_time = new Parallax(scene_time, { pointerEvents: true });
        pa_time.invert(false, false);
        time();
        setInterval(time, 1000);
    } else document.getElementById('scene_time').remove();
    if (start_background == true) {
        document.body.style.background = "url(" + background_url + ")";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundRepeat = "no-repeat";
    }
    Y -= spacing;
    $("#image").attr("data-depth", parallax);
}

function time() {
    var time_div = document.getElementById("time");
    var time_day_div = document.getElementById("time_day");
    var time_week_div = document.getElementById("time_week");
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var week = time.getDay();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    time_div.innerHTML = year + "." + month + "." + day;
    time_week_div.innerHTML = "周 " + weekArray[(week + 6) % 7];
    time_day_div.innerHTML = hours + ": " + minutes + ": " + seconds;
}