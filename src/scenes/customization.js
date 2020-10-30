import balconyImg from '../images/bg/balcony.jpg';
import hallImg from '../images/bg/hall.jpg';
import bedroomImg from '../images/bg/bedroom.jpg';
import body_woman_1Img from '../images/woman/body/body_1.png';
import body_woman_2Img from '../images/woman/body/body_2.png';
import hair_woman_1Img from '../images/woman/hair/hair_1.png';
import hair_woman_2Img from '../images/woman/hair/hair_2.png';
import hair_woman_1_backImg from '../images/woman/hair/hair_1_back.png';
import hair_woman_2_backImg from '../images/woman/hair/hair_2_back.png';
import clothes_woman_1Img from '../images/woman/clothes/clothes_1.png';
import clothes_woman_2Img from '../images/woman/clothes/clothes_2.png';
import face_woman_w_defaultImg from '../images/woman/emotions_white/default.png';
import face_woman_b_defaultImg from '../images/woman/emotions_black/default.png';
import arrowImg from '../images/arrow.png';
import ellipseImg from '../images/ellipse.png';
import ellipseAImg from '../images/ellipseA.png';

import Dialog from '../scenes/dialog.js';
import { game } from '../index.js';
import Person from '../services/person.js';
import { Tabs, createNextBtn, createSbmtBtn } from '../services/creators.js';

const stageNames = [['body'], ['hair', 'hair_back'], ['clothes']];
const stageTitles = ['body', 'hair', 'clothes'];
const mainHeroX = innerWidth / 2;
const mainHeroY = innerHeight / 2;

export const personConfig = [0, 0, 0, 'default'];

let stageIdx = 0;
let chooseText;
let tabs;
let person;

export const setStage = i => {
  stageIdx = i;
  person.idx = personConfig[stageIdx];
  chooseText.text = `Choose ${stageTitles[stageIdx]}`;
};

class Customization extends Phaser.Scene {
  constructor() {
    super({
      key: 'customization',
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
    this.load.image('body_woman_2', body_woman_2Img);
    this.load.image('hair_woman_1', hair_woman_1Img);
    this.load.image('hair_woman_2', hair_woman_2Img);
    this.load.image('hair_woman_1_back', hair_woman_1_backImg);
    this.load.image('hair_woman_2_back', hair_woman_2_backImg);
    this.load.image('clothes_woman_1', clothes_woman_1Img);
    this.load.image('clothes_woman_2', clothes_woman_2Img);
    this.load.image('face_woman_w_default', face_woman_w_defaultImg);
    this.load.image('face_woman_b_default', face_woman_b_defaultImg);
  }

  create() {
    const bgImg = this.add.image(0, 0, 'balcony');
    const bgCoef = innerHeight / bgImg.height;
    bgImg.setScale(bgCoef, bgCoef).setPosition(innerWidth / 2, innerHeight / 2);

    const scaleCoef = innerHeight / 1300;

    const genderW = 'woman';
    person = new Person(
      genderW,
      personConfig,
      this,
      scaleCoef,
      mainHeroX,
      mainHeroY,
    );

    const arrowLeft = this.make.image({
      x: person.body.x - innerWidth / 3,
      y: person.body.y,
      key: 'arrow',
      flipX: true,
    });

    arrowLeft
      .setInteractive()
      .on('pointerdown', () => person.changeOption(stageNames, stageIdx));

    const arrowRight = this.make.image({
      x: person.body.x + innerWidth / 3,
      y: person.body.y,
      key: 'arrow',
    });

    arrowRight.setInteractive().on('pointerdown', () => {
      person.changeOption(stageNames, stageIdx);
    });

    tabs = new Tabs(this);

    chooseText = this.add.text(
      innerWidth / 2,
      545,
      `Choose ${stageTitles[stageIdx]}`,
      {
        fontSize: '20px',
        color: '#000000',
      },
    );
    chooseText.setX(chooseText.x - chooseText.width / 2).setDepth(7);

    createNextBtn(this, () => {
      if (stageIdx !== stageNames.length - 1) {
        personConfig[stageIdx] = person.idx;
        person.idx = 0;
        stageIdx += 1;
        chooseText.text = `Choose ${stageTitles[stageIdx]}`;
        tabs.clickBtn(stageIdx);
      }
    });

    createSbmtBtn(this, () => {
      personConfig[stageIdx] = person.idx;
      game.scene.remove('customization');
      game.scene.add('dialog', Dialog, true);
    });
  }

  update() {}
}

export default Customization;
