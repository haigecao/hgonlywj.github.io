//Laya.init(600, 400);
Laya3D.init(1500,1000);
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;

//创建场景
var scene = new Laya.Scene();
Laya.stage.addChild(scene);
//创建摄像机
var camera = new Laya.Camera();
scene.addChild(camera);
camera.transform.localPosition  =  new Laya.Vector3(-1,2,10);

//载入并显示3D场景模型
// var map = Laya.Sprite3D.load("cj/cj.lh");
// scene.addChild(map);

//载入并显示人物模型
var number = params.getKey('number', location.href);
var step = number || 10;
var girlArr = [];
for (var i = 0; i < step; i++) {
    var girl = new Laya.MeshSprite3D(Laya.Mesh.load("girl/girl-polySurface1030.lm"));
    scene.addChild(girl);
    girl.transform.localScale = new Laya.Vector3(0.04,0.04,0.04);
    var x = -6 + Math.round((Math.random() * 10));
    var y = 0 + Math.round((Math.random() * 1));
    var z = -15 + Math.round((Math.random() * 15));
    girl.transform.localPosition = new Laya.Vector3(x,y,z);
    girl.transform.rotate(new Laya.Vector3(0,-Math.PI/2,0));
    girlArr.push(girl);
}
//girl.transform.localScale = new Laya.Vector3(0.04,0.04,0.04);
//girl.transform.localPosition = new Laya.Vector3(0,1,-10);
//girl.transform.rotate(new Laya.Vector3(0,-Math.PI/2,0));

Laya.timer.frameLoop(1, null, function () {
    girlArr.forEach(function (girl, inde) {
        girl.transform.rotate(new Laya.Vector3(0, 0.035, 0), true);
    });
});


//控制摄像机移动
camera.addComponent(CameraMoveScript);