import Dialog from './scenes/dialog.js';
import { game } from './index.js';
import Person from './person.js';
import { createTabs, createSbmtBtn } from './services/creators.js';
export const personConfig = [0, 0, 0];

const renderFirstPage = scene => {
  const stageNames = [['body'], ['hair', 'hair_back'], ['clothes']];
  let stageIdx = 0;
  const mainHeroX = innerWidth / 2;
  const mainHeroY = innerHeight / 2;

  const bgImg = scene.add.image(0, 0, 'balcony');
  const bgCoef = innerHeight / bgImg.height;
  bgImg.setScale(bgCoef, bgCoef).setPosition(innerWidth / 2, innerHeight / 2);

  const scaleCoef = innerHeight / 1300;

  const person = new Person(
    personConfig,
    scene,
    scaleCoef,
    mainHeroX,
    mainHeroY,
  );

  const arrowLeft = scene.make.image({
    x: person.body.x - innerWidth / 3,
    y: person.body.y,
    key: 'arrow',
    flipX: true,
  });

  arrowLeft.setInteractive().on('pointerdown', () => changeOption());

  const arrowRight = scene.make.image({
    x: person.body.x + innerWidth / 3,
    y: person.body.y,
    key: 'arrow',
  });

  arrowRight.setInteractive().on('pointerdown', () => {
    person.changeOption(stageNames, stageIdx);
  });

  createTabs(scene);

  const chooseText = scene.add.text(innerWidth / 2, 600, 'choose body', {
    fontSize: '16px',
  });
  chooseText.setX(chooseText.x - chooseText.width / 2);

  createSbmtBtn(scene, () => {
    if (stageIdx !== stageNames.length - 1) {
      personConfig[stageIdx] = person.idx;
      person.idx = 0;
      stageIdx += 1;
    } else {
      personConfig[stageIdx] = person.idx;
      // person.destroyPerson();
      // const pers1 = new Person(
      //   personConfig,
      //   scene,
      //   scaleCoef - 0.2,
      //   mainHeroX,
      //   mainHeroY,
      // );
      game.scene.remove('customization');
      game.scene.add('dialog', Dialog, true);
    }
  });
};

export default renderFirstPage;
