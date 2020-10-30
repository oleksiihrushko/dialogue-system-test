import scenario from '../ons2.json';
import { personConfig } from './customization.js';
import Person from '../services/person.js';

import arrowImg from '../images/arrow.png';
import ellipseImg from '../images/ellipse.png';
import ellipseAImg from '../images/ellipseA.png';
import balconyImg from '../images/bg/balcony.jpg';
import hallImg from '../images/bg/hall.jpg';
import bedroomImg from '../images/bg/bedroom.jpg';
import body_woman_1Img from '../images/woman/body/body_1.png';
import body_man_1Img from '../images/man/body/body_1.png';
import body_woman_2Img from '../images/woman/body/body_2.png';
import hair_woman_1Img from '../images/woman/hair/hair_1.png';
import hair_man_1Img from '../images/man/hair/hair_1.png';
import hair_woman_2Img from '../images/woman/hair/hair_2.png';
import hair_woman_1_backImg from '../images/woman/hair/hair_1_back.png';
import hair_man_1_backImg from '../images/man/hair/hair_1_back.png';
import hair_woman_2_backImg from '../images/woman/hair/hair_2_back.png';
import clothes_woman_1Img from '../images/woman/clothes/clothes_1.png';
import clothes_man_1Img from '../images/man/clothes/clothes_1.png';
import clothes_woman_2Img from '../images/woman/clothes/clothes_2.png';
import face_woman_defaultImg from '../images/woman/emotions/default.png';
import face_woman_shyImg from '../images/woman/emotions/shy.png';
import face_woman_angryImg from '../images/woman/emotions/angry.png';
import face_woman_joyImg from '../images/woman/emotions/joy.png';
import face_woman_surprisedImg from '../images/woman/emotions/surprised.png';
import face_woman_sadImg from '../images/woman/emotions/sad.png';
import face_man_defaultImg from '../images/man/emotions/default.png';

let bgImg;
var title = null;
let textBox;
let replicId = 0;
let mainPerson = null;
let secondPerson = null;
const secondPersonConfig = [0, 0, 0, 'default'];
let cameraPosition = 150;
const moves = {
  left: 0,
  middle: 200,
  right: 425,
};

const readReplic = (replicId, scene) => {
  if (scenario[replicId].type === 'background') {
    // background change
    bgImg = scene.add.image(0, 0, scenario[replicId].backgroundName);
    const bgCoef = 667 / bgImg.height;
    bgImg.setScale(bgCoef, bgCoef).setOrigin(0).setDepth(-1);
    replicId += 1;

    scene.cameras.main.scrollX = 200;

    readReplic(replicId, scene);
  } else {
    // replica render
    textBox = createTextBox(scene, innerWidth / 2 + 50, 500, {
      wrapWidth: 260,
      fixedWidth: 260,
      fixedHeight: 65,
    }).start(scenario[replicId].text, 50);

    // create title to replica
    if (scenario[replicId].character && title === null) {
      title = createTitle(scene, innerWidth / 2, 490, {
        fixedWidth: 70,
        fixedHeight: 16,
      }).start(scenario[replicId].character, 50);
    }

    // camera view change
    if (
      scenario[replicId].type !== cameraPosition &&
      scenario[replicId].type !== 'background'
    ) {
      moveCam(scene, scenario[replicId].type);
      cameraPosition = moves[scenario[replicId].type];
    }

    if (scenario[replicId].character) {
      if (scenario[replicId].character === 'MAINHERO') {
        // create person
        if (mainPerson === null) {
          mainPerson = new Person(
            'woman',
            personConfig,
            scene,
            0.3, //scaleCoef,
            100, //X,
            innerHeight / 2, //Y,
          );
        }

        // emotion change
        if (scenario[replicId].emotion) {
          mainPerson.changeFace(scenario[replicId].emotion);
        }
      } else {
        // create person
        if (secondPerson === null) {
          secondPerson = new Person(
            'man',
            secondPersonConfig,
            scene,
            0.3, //scaleCoef,
            675, //X,
            innerHeight / 2, //Y,
          );
        }

        // emotion change
        if (scenario[replicId].emotion) {
          secondPerson.changeFace(scenario[replicId].emotion);
        }

        secondPerson.flipPerson();
      }
    }
    if (!scenario[replicId].character) {
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
    this.load.image('balcony', balconyImg);
    this.load.image('hall', hallImg);
    this.load.image('bedroom', bedroomImg);
    this.load.image('arrow', arrowImg);
    this.load.image('ellipse', ellipseImg);
    this.load.image('ellipseA', ellipseAImg);
    this.load.image('body_woman_1', body_woman_1Img);
    this.load.image('body_man_1', body_man_1Img);
    this.load.image('body_woman_2', body_woman_2Img);
    this.load.image('hair_woman_1', hair_woman_1Img);
    this.load.image('hair_man_1', hair_man_1Img);
    this.load.image('hair_woman_2', hair_woman_2Img);
    this.load.image('hair_woman_1_back', hair_woman_1_backImg);
    this.load.image('hair_man_1_back', hair_man_1_backImg);
    this.load.image('hair_woman_2_back', hair_woman_2_backImg);
    this.load.image('clothes_woman_1', clothes_woman_1Img);
    this.load.image('clothes_man_1', clothes_man_1Img);
    this.load.image('clothes_woman_2', clothes_woman_2Img);
    this.load.image('face_woman_default', face_woman_defaultImg);
    this.load.image('face_man_default', face_man_defaultImg);
    this.load.image('face_woman_shy', face_woman_shyImg);
    this.load.image('face_woman_angry', face_woman_angryImg);
    this.load.image('face_woman_joy', face_woman_joyImg);
    this.load.image('face_woman_surprised', face_woman_surprisedImg);
    this.load.image('face_woman_sad', face_woman_sadImg);
  }

  create() {
    this.cameras.main.setBounds(0, 0, 825, innerHeight);
    this.cameras.main.scrollX = cameraPosition;

    readReplic(replicId, this);
  }

  update() {}
}

const moveCam = (scene, position) => {
  const camera = scene.cameras.main;
  scene.tweens.add({
    targets: camera,
    scrollX: moves[position],
    ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back', Linear
    duration: 1000,
    repeat: 0,
    yoyo: false,
  });

  textBox.x = moves[position] + 40;
  scene.tweens.add({
    targets: textBox,
    alpha: { from: 0, to: 1 },
    ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back', Linear
    duration: 1000,
    repeat: 0,
    yoyo: false,
  });

  if (title) {
    title.x = moves[position] + 60;
    scene.tweens.add({
      targets: title,
      alpha: { from: 0, to: 1 },
      ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back', Linear
      duration: 1000,
      repeat: 0,
      yoyo: false,
    });
  }
};

const GetValue = Phaser.Utils.Objects.GetValue;
const createTextBox = function (scene, x, y, config) {
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
            scenario[replicId]
              ? readReplic(replicId, scene)
              : endOfStory(scene);
          } else {
            this.typeNextPage();
          }
        }
      },
      textBox,
    );

  return textBox;
};

const createTitle = function (scene, x, y, config) {
  const fixedWidth = GetValue(config, 'fixedWidth', 0);
  const fixedHeight = GetValue(config, 'fixedHeight', 0);
  const title = scene.rexUI.add
    .textBox({
      x: x,
      y: y,
      background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0xc62d6e),
      text: getTitleText(scene, fixedWidth, fixedHeight),
      space: {
        left: 5,
        right: 5,
        top: 3,
        bottom: 3,
      },
    })
    .setOrigin(0)
    .layout()
    .setDepth(7);

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
const getTitleText = function (scene, fixedWidth, fixedHeight) {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth: fixedWidth,
    fixedHeight: fixedHeight,

    fontSize: '14px',
    color: 'black',
    anchor: 'center',
  });
};

const endOfStory = scene => {
  const camera = scene.cameras.main;

  scene.tweens.add({
    targets: camera,
    scrollX: 200,
    ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back', Linear
    duration: 1000,
    repeat: 0,
    yoyo: false,
  });

  title.destroy();
};

export default Dialog;
