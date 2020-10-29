import scenario from '../ons2.json';
import { personConfig } from '../firstPage.js';
import Person from '../person';
console.log(scenario);

let bgImg;
var title = null;
let textBox;
let replicId = 0;

const readReplic = (replicId, scene) => {
  // console.log(scenario);
  console.log(replicId);
  // console.log(scenario[replicId]);
  if (scenario[replicId].type === 'background') {
    bgImg = scene.add.image(0, 0, scenario[replicId].backgroundName);
    const bgCoef = innerHeight / bgImg.height;
    bgImg
      .setScale(bgCoef, bgCoef)
      .setPosition(innerWidth / 2, innerHeight / 2)
      .setDepth(-1);
    replicId += 1;
    readReplic(replicId, scene);
  } else {
    textBox = createTextBox(
      scene,
      innerWidth / 2 - 150,
      500,
      {
        wrapWidth: 260,
        fixedWidth: 260,
        fixedHeight: 65,
      },
      title,
    ).start(scenario[replicId].text, 50);
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

class Dialog extends Phaser.Scene {
  constructor() {
    super({
      key: 'dialog',
      active: true,
    });
  }

  preload() {
    this.load.image('balcony', './images/bg/balcony.jpg');
    this.load.image('hall', './images/bg/hall.jpg');
    this.load.image('bedroom', './images/bg/bedroom.jpg');
    this.load.image('body_1', './images/body/body_1.png');
    this.load.image('body_2', './images/body/body_2.png');
    this.load.image('arrow', './images/arrow.png');
    this.load.image('ellipse', './images/ellipse.png');
    this.load.image('ellipseA', './images/ellipseA.png');
    this.load.image('hair_1', './images/hair/hair_1.png');
    this.load.image('hair_2', './images/hair/hair_2.png');
    this.load.image('hair_1_back', './images/hair/hair_1_back.png');
    this.load.image('hair_2_back', './images/hair/hair_2_back.png');
    this.load.image('clothes_1', './images/clothes/clothes_1.png');
    this.load.image('clothes_2', './images/clothes/clothes_2.png');
  }

  create() {
    console.log(personConfig);
    const mainPerson = new Person(
      personConfig,
      this, //scene,
      0.3, //scaleCoef,
      innerWidth / 2 - 100, //mainHeroX,
      innerHeight / 2, //mainHeroY,
    );

    readReplic(replicId, this);
  }

  update() {}
}

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
