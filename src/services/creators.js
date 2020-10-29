const hairBackArr = ['hair_1_back', 'hair_2_back'];
const bodyArr = ['body_1', 'body_2'];
const hairArr = ['hair_1', 'hair_2'];
const clothes = ['clothes_1', 'clothes_2'];
import { setStage } from '../firstPage.js';

const personConstructor = {
  create_hair_back: (idx, scene, scaleCoef, mainHeroX, mainHeroY) => {
    const hair_back_Img = scene.add.image(0, 0, hairBackArr[idx]);
    hair_back_Img
      .setScale(scaleCoef, scaleCoef)
      .setPosition(mainHeroX, mainHeroY);

    return hair_back_Img;
  },

  create_body: (idx, scene, scaleCoef, mainHeroX, mainHeroY) => {
    const bodyImg = scene.add.image(0, 0, bodyArr[idx]);
    bodyImg
      .setScale(scaleCoef, scaleCoef)
      .setPosition(mainHeroX, mainHeroY)
      .setDepth(1);

    return bodyImg;
  },

  create_hair: (idx, scene, scaleCoef, mainHeroX, mainHeroY) => {
    const hair_Img = scene.add.image(0, 0, hairArr[idx]);
    hair_Img
      .setScale(scaleCoef, scaleCoef)
      .setPosition(mainHeroX, mainHeroY)
      .setDepth(3);

    return hair_Img;
  },

  create_clothes: (idx, scene, scaleCoef, mainHeroX, mainHeroY) => {
    const clothes_Img = scene.add.image(0, 0, clothes[idx]);
    clothes_Img
      .setScale(scaleCoef, scaleCoef)
      .setPosition(mainHeroX, mainHeroY)
      .setDepth(2);

    return clothes_Img;
  },
};

class Tabs {
  constructor(scene) {
    this.tabs = scene.rexUI.add
      .roundRectangle(innerWidth / 2, 557, 300, 60, 10, 0xffffff)
      .setAlpha(0.5)
      .setDepth(5);

    this.buttons = {
      button0: scene.add
        .image(innerWidth / 2 - 20, 520, 'ellipseA')
        .setScale(0.8)
        .setDepth(5)
        .setInteractive()
        .on('pointerdown', () => this.clickBtn(0)),

      button1: scene.add
        .image(innerWidth / 2, 520, 'ellipse')
        .setScale(0.8)
        .setDepth(5)
        .setInteractive()
        .on('pointerdown', () => this.clickBtn(1)),

      button2: scene.add
        .image(innerWidth / 2 + 20, 520, 'ellipse')
        .setScale(0.8)
        .setDepth(5)
        .setInteractive()
        .on('pointerdown', () => this.clickBtn(2)),

      lastClickedIdx: 0,
    };
  }

  clickBtn(idx) {
    this.buttons[`button${this.buttons.lastClickedIdx}`].setTexture('ellipse');
    this.buttons[`button${idx}`].setTexture('ellipseA');

    this.buttons.lastClickedIdx = idx;
    setStage(idx);
  }
}

const createNextBtn = (scene, callback) => {
  const sbmtBtn = scene.rexUI.add
    .textBox({
      x: innerWidth / 2 + 100,
      y: 560,

      background: scene.rexUI.add
        .roundRectangle(0, 0, 0, 0, 10, 0xdb5186)
        .setDepth(6),

      text: scene.add.text(0, 0, 'Next', { color: '#fff' }).setDepth(6),

      space: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5,
      },
    })
    .setOrigin(0)
    .layout();

  sbmtBtn.setInteractive().on('pointerdown', callback);

  return sbmtBtn;
};

const createSbmtBtn = (scene, callback) => {
  const sbmtBtn = scene.rexUI.add
    .textBox({
      x: innerWidth / 2 - 73,
      y: 610,

      background: scene.rexUI.add
        .roundRectangle(0, 0, 0, 0, 10, 0xdb5186)
        .setDepth(6),

      text: scene.add.text(0, 0, 'Confirm', { color: '#fff' }).setDepth(6),

      space: {
        left: 40,
        right: 40,
        top: 10,
        bottom: 10,
      },
    })
    .setOrigin(0)
    .layout();

  sbmtBtn.setInteractive().on('pointerdown', callback);

  return sbmtBtn;
};

export { personConstructor, Tabs, createNextBtn, createSbmtBtn };
