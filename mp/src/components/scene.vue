<template>
  <view class="content">
    <view> </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from "vue-property-decorator";
import * as THREE from "three";
import { PointLight } from "three";

const windowW = window.innerWidth;
const windowH = window.innerHeight;
const DisCamera2Start = 200;
const DisLight2Start = 70;
const rate = 2;
const MoveCameraSpeed = 0.2 / rate;
const MoveBubbleSpeedMax = 0.3 / rate;
const BubbleRotateSpeed = 0.007 / rate;
const CreateBubbleFrame = 50 * rate;

@Component
export default class Scene extends Vue {
  // 初始化数据
  private bubbles: any[] = [];

  private StartPos = 0;
  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    alpha: true,
  });

  // 鼠标点击
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  // 计算属性

  // 生命周期钩子
  // mounted() {}

  // 方法
  init() {
    this.scene = new THREE.Scene();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // 设置点光源
    let PointLight = new THREE.PointLight(0xffffff, 1000000, 0);
    PointLight.visible = true;
    PointLight.position.z = this.StartPos + DisLight2Start;
    this.scene.add(PointLight);
  }
  // onMouseClick(event: any) {
  //   //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

  //   this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //   // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
  //   this.raycaster.setFromCamera(this.mouse, this.camera);

  //   // 获取raycaster直线和所有模型相交的数组集合
  //   var intersects = this.raycaster.intersectObjects(this.scene.children);

  //   //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
  //   if (!intersects.length) {
  //     return;
  //   }
  //   let obj = intersects[0].object;
  //   // for (var i = 0; i < intersects.length; i++) {
  //   // 	var obj = intersects[i].object;
  //   if (1 == obj.bubbleParam.isClicked) {
  //     // continue;
  //     return;
  //   }
  //   obj.bubbleParam.isClicked = 1;
  //   var tmpPosX = obj.position.x;
  //   var tmpPosY = obj.position.y;
  //   var tmpPosZ = obj.position.z;
  //   var tmpRotX = obj.rotation.x;
  //   var tmpRotY = obj.rotation.y;
  //   var tmpRotZ = obj.rotation.z;
  //   var tmpBubbleParam = obj.bubbleParam;
  //   tmpBubbleParam.speedX = tmpBubbleParam.speedX / 10;
  //   tmpBubbleParam.speedY = tmpBubbleParam.speedY / 10;
  //   this.scene.remove(obj);

  //   //console.log(obj.position);
  //   var res = new THREE.TextureLoader().load("./tex/tex1.jpg", (res) => {
  //     var NewMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //     //NewMaterial.map = res;
  //     NewMaterial.transparent = true;
  //     NewMaterial.opacity = 0.5;
  //     var NewObj = new THREE.Mesh(obj.geometry, NewMaterial);
  //     //console.log(tmpPos);
  //     NewObj.position.x = tmpPosX;
  //     NewObj.position.y = tmpPosY;
  //     NewObj.position.z = tmpPosZ;
  //     NewObj.rotation.x = tmpRotX;
  //     NewObj.rotation.y = tmpRotY;
  //     NewObj.rotation.y = tmpRotZ;
  //     // NewObj.bubbleParam = tmpBubbleParam;
  //     //console.log(NewObj.position);
  //     this.bubbles.push(NewObj);
  //     this.scene.add(NewObj);
  //   });
  //   // }
  // }

  CreateBubbles() {
    let bubbleParam = {
      //x: (Math.random() - 0.5)*windowW/2,
      //y: (Math.random() - 0.5)*windowH/2,
      //applitude: Math.random(),
      //frequency: Math.random() * 0.01 + 0.01,
      speedX: (Math.random() - 0.5) * MoveBubbleSpeedMax,
      speedY: (Math.random() - 0.5) * MoveBubbleSpeedMax,
      speedZ: (Math.random() - 0.5) * MoveCameraSpeed * 1.5,
      //speedZ: (Math.random() - 0.5)*0.5,
      //radiusChange: 0,
      MaxRadius: Math.random() * 4 + 3,
      InitRadius: Math.random() * 3 + 2,
      isClicked: 0,
      //color: bubbleColor[Math.floor(Math.random()*bubbleColor.length)],
      //color: Math.random() * 25 + 175,
      //isSpeedChanged:0,
      //lightness: Math.random() * 10 + 65,
      //apcChange: 0.01,
      //apcChangeCnt: 1000,
      //isClicked: 0,
      //apc: 0
    };
    const geometry = new THREE.SphereGeometry(bubbleParam.InitRadius, 30, 30);
    //const material = new THREE.MeshPhongMaterial();

    let texture = new THREE.TextureLoader().load("./tex/tex1.jpg", (res) => {
      const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
      material.map = res;
      //material.transparent = true;
      //material.opacity = 0.5;
      material.bumpMap = res;
      material.bumpScale = 0.9;
      let bubble = new THREE.Mesh(geometry, material);

      bubble.position.x = 0;
      bubble.position.y = 0;

      bubble.position.z = this.StartPos;
      // bubble.bubbleParam = bubbleParam;
      //PointLight.position.z -= 0.2;
      this.scene.add(bubble);
      this.bubbles.push(bubble);
    });
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (this.bubbles.length > 500) {
      this.bubbles.shift();
    }

    


    for (let i = 0; i < this.bubbles.length; i++) {
      const bubble = this.bubbles[i];
      if (bubble.bubbleParam.isClicked === 1) {
        bubble.position.z -= MoveCameraSpeed;
        continue;
      }

      bubble.position.x += bubble.bubbleParam.speedX;
      bubble.position.y += bubble.bubbleParam.speedY;
      bubble.position.z += bubble.bubbleParam.speedZ;

      bubble.rotation.x += BubbleRotateSpeed;
      bubble.rotation.y += BubbleRotateSpeed;
      bubble.rotation.z += BubbleRotateSpeed;

      //console.log(bubble.position.z);
      //console.log(camera.position.z);

      if (bubble.position.z > this.camera.position.z) {
        this.scene.remove(bubble);
      }
    }
    this.MoveCamera();
    this.renderer.render(this.scene, this.camera);
  }

  MoveCamera() {
    this.StartPos -= MoveCameraSpeed;
    this.camera.position.z = this.StartPos + DisCamera2Start;
    // PointLight.position.z = this.StartPos+DisLight2Start;
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: black;
  background-image: radial-gradient(white 1%, black 80%, black);
  margin: 0px;
  height: calc(100vh - 44px - env(safe-area-inset-top));
  width: 100vw;
}
</style>
