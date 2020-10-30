import scenario from '../ons2.json';
import { personConfig } from './customization.js';
import Person from '../services/person.js';
import { game } from '../index.js';

import balconyImg from '../images/bg/balcony.jpg';
import hallImg from '../images/bg/hall.jpg';
import bedroomImg from '../images/bg/bedroom.jpg';
import body_1Img from '../images/body/body_1.png';
import body_2Img from '../images/body/body_2.png';
import arrowImg from '../images/arrow.png';
import ellipseImg from '../images/ellipse.png';
import ellipseAImg from '../images/ellipseA.png';
import hair_1Img from '../images/hair/hair_1.png';
import hair_2Img from '../images/hair/hair_2.png';
import hair_1_backImg from '../images/hair/hair_1_back.png';
import hair_2_backImg from '../images/hair/hair_2_back.png';
import clothes_1Img from '../images/clothes/clothes_1.png';
import clothes_2Img from '../images/clothes/clothes_2.png';
import face_defaultImg from '../images/emotions/default.png';
import face_shyImg from '../images/emotions/shy.png';
import face_angryImg from '../images/emotions/angry.png';
import face_joyImg from '../images/emotions/joy.png';
import face_surprisedImg from '../images/emotions/surprised.png';
import face_sadImg from '../images/emotions/sad.png';
console.log(scenario);

let bgImg;
var title = null;
let textBox;
let replicId = 0;
let mainPerson;
let cameraPosition = 'middle';

const readReplic = (replicId, scene) => {
  // emotion change
  if (scenario[replicId].emotion) {
    mainPerson.changeFace(`face_${scenario[replicId].emotion}`);
  }

  // background change
  if (scenario[replicId].type === 'background') {
    bgImg = scene.add.image(0, 0, scenario[replicId].backgroundName);
    const bgCoef = 700 / bgImg.height;
    bgImg
      .setScale(bgCoef, bgCoef)
      // .setPosition(350, innerHeight / 2)
      .setDepth(-1)
      .setOrigin(0);
    replicId += 1;
    console.log(bgImg);
    readReplic(replicId, scene);
  } else {
    // camera view change
    if (scenario[replicId].type !== cameraPosition) {
      moveCam(scene, scenario[replicId].type);
      cameraPosition = scenario[replicId].type;
    }

    // replica render
    textBox = createTextBox(
      scene,
      innerWidth / 2,
      500,
      {
        wrapWidth: 260,
        fixedWidth: 260,
        fixedHeight: 65,
      },
      title,
    ).start(scenario[replicId].text, 50);

    // create title to replica
    if (scenario[replicId].character) {
      title = createTitle(
        scene,
        textBox.x,
        textBox.y,
        scenario[replicId].character,
      );
    } else {
      console.log('title', title);
      if (title !== null) {
        title.destroy();
        title = null;
      }
    }
  }
};

var controls;
class Dialog extends Phaser.Scene {
  constructor() {
    super({
      key: 'dialog',
      active: true,
    });
  }

  preload() {
    this.load.image('balcony', balconyImg);
    this.load.image('hall', hallImg);
    this.load.image('bedroom', bedroomImg);
    this.load.image('body_1', body_1Img);
    this.load.image('body_2', body_2Img);
    this.load.image('arrow', arrowImg);
    this.load.image('ellipse', ellipseImg);
    this.load.image('ellipseA', ellipseAImg);
    this.load.image('hair_1', hair_1Img);
    this.load.image('hair_2', hair_2Img);
    this.load.image('hair_1_back', hair_1_backImg);
    this.load.image('hair_2_back', hair_2_backImg);
    this.load.image('clothes_1', clothes_1Img);
    this.load.image('clothes_2', clothes_2Img);
    this.load.image('face_default', face_defaultImg);
    this.load.image('face_shy', face_shyImg);
    this.load.image('face_angry', face_angryImg);
    this.load.image('face_joy', face_joyImg);
    this.load.image('face_surprised', face_surprisedImg);
    this.load.image('face_sad', face_sadImg);
  }

  //////////////////////////////// CREATE /////////////////
  create() {
    console.log(game);
    // game.scale.setGameSize(700, innerHeight);
    // game.scale.setParentSize(700, innerHeight);
    // game.config.width = 700;
    this.cameras.main.width = 375;
    this.cameras.main.setBounds(150, 0, 700, innerHeight);

    //////////////////////////////////////////////////////

    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0,
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    //////////////////////////////////////////////////

    console.log(this.cameras.main);
    mainPerson = new Person(
      personConfig,
      this, //scene,
      0.3, //scaleCoef,
      innerWidth / 2 - 100, //mainHeroX,
      innerHeight / 2, //mainHeroY,
    );

    readReplic(replicId, this);
  }

  update(delta) {
    controls.update(delta);
  }
}

const moveCam = (scene, position) => {
  const moves = {
    left: 0,
    middle: 150,
    rigth: 300,
  };
  const camera = scene.cameras.main;

  console.log('move to ', position);
  console.log(moves[position]);
  console.log(camera);
  var tween = scene.tweens.add({
    targets: camera,
    x: moves[position],
    ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back', Linear
    duration: 1000,
    repeat: 0, // -1: infinity
    yoyo: false,
  });
};

const GetValue = Phaser.Utils.Objects.GetValue;
const createTextBox = function (scene, x, y, config, title) {
  const wrapWidth = GetValue(config, 'wrapWidth', 0);
  const fixedWidth = GetValue(config, 'fixedWidth', 0);
  const fixedHeight = GetValue(config, 'fixedHeight', 0);
  var textBox = scene.rexUI.add
    .textBox({
      x: x,
      y: y,

      background: scene.rexUI.add
        .roundRectangle(0, 0, 2, 2, 20, 0xffffff)
        .setStrokeStyle(12, 0xc62d6e),

      text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

      space: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
        icon: 10,
        text: 10,
      },
    })
    .setOrigin(0)
    .layout()
    .setDepth(6)
    .setInteractive()
    .on(
      'pointerdown',
      function () {
        if (this.isTyping) {
          this.stop(true);
        } else {
          if (this.isLastPage) {
            this.destroy();

            replicId += 1;
            scenario[replicId] && readReplic(replicId, scene);
          } else {
            this.typeNextPage();
          }
        }
      },
      textBox,
    )
    .popUp(1000);

  return textBox;
};

const createTitle = function (scene, x, y, titleText) {
  // const title = scene.add
  //   .text(x + 170, y - 8, titleText, {
  //     background: scene.rexUI.add.roundRectangle(
  //       x + 230,
  //       y,
  //       130,
  //       40,
  //       10,
  //       0xc62d6e,
  //     ),
  //     align: 'center',
  //     fontSize: '20px',
  //   })
  //   .setDepth(7);

  return title;
};

const getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth: fixedWidth,
    fixedHeight: fixedHeight,

    fontSize: '20px',
    color: 'black',

    wrap: {
      mode: 'word',
      width: wrapWidth,
    },
    maxLines: 3,
  });
};

export default Dialog;
