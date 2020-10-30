// import Dialog from './scenes/dialog.js';
// import { game } from './index.js';
// import Person from './person.js';
// import { Tabs, createNextBtn, createSbmtBtn } from './services/creators.js';

// const stageNames = [['body'], ['hair', 'hair_back'], ['clothes']];
// const stageTitles = ['body', 'hair', 'clothes'];
// const mainHeroX = innerWidth / 2;
// const mainHeroY = innerHeight / 2;

// export const personConfig = [0, 0, 0];

// let stageIdx = 0;
// let chooseText;
// let tabs;

// export const setStage = i => {
//   stageIdx = i;
//   chooseText.text = `Choose ${stageTitles[stageIdx]}`;
// };

// const renderFirstPage = scene => {
//   const bgImg = scene.add.image(0, 0, 'balcony');
//   const bgCoef = innerHeight / bgImg.height;
//   bgImg.setScale(bgCoef, bgCoef).setPosition(innerWidth / 2, innerHeight / 2);

//   const scaleCoef = innerHeight / 1300;

//   const person = new Person(
//     personConfig,
//     scene,
//     scaleCoef,
//     mainHeroX,
//     mainHeroY,
//   );

//   const arrowLeft = scene.make.image({
//     x: person.body.x - innerWidth / 3,
//     y: person.body.y,
//     key: 'arrow',
//     flipX: true,
//   });

//   arrowLeft
//     .setInteractive()
//     .on('pointerdown', () => person.changeOption(stageNames, stageIdx));

//   const arrowRight = scene.make.image({
//     x: person.body.x + innerWidth / 3,
//     y: person.body.y,
//     key: 'arrow',
//   });

//   arrowRight.setInteractive().on('pointerdown', () => {
//     person.changeOption(stageNames, stageIdx);
//   });

//   tabs = new Tabs(scene);

//   chooseText = scene.add.text(
//     innerWidth / 2,
//     545,
//     `Choose ${stageTitles[stageIdx]}`,
//     {
//       fontSize: '20px',
//       color: '#000000',
//     },
//   );
//   chooseText.setX(chooseText.x - chooseText.width / 2).setDepth(7);

//   createNextBtn(scene, () => {
//     if (stageIdx !== stageNames.length - 1) {
//       personConfig[stageIdx] = person.idx;
//       person.idx = 0;
//       stageIdx += 1;
//       chooseText.text = `Choose ${stageTitles[stageIdx]}`;
//       tabs.clickBtn(stageIdx);
//     }
//   });

//   createSbmtBtn(scene, () => {
//     personConfig[stageIdx] = person.idx;
//     game.scene.remove('customization');
//     game.scene.add('dialog', Dialog, true);
//   });
// };

// // export default renderFirstPage;
