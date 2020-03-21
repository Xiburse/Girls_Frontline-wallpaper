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
    var i = 0;
    for (i = 0; i < initLoad.length; i++)
        if (initLoad[i] == name)
            break;
    if (i == initLoad.length) {
        initLoad.push(name);
        PIXI.loader.add(name, 'spine/' + name + '/' + if_r + name + '.json')
            .load(function (loader, resources) {
                var animation = new PIXI.spine.Spine(resources[name].spineData);
                spineResources.set(name, resources[name].spineData);
                sum++;
                loadAdd(animation, stage, name, true);
            });
    } else {
        console.log("new");
        var animation = new PIXI.spine.Spine(spineResources.get(name));
        sum++;
        loadAdd(animation, stage, name, true);
    }
}