import {
  personConstructor,
  createTabs,
  createSbmtBtn,
} from './services/creators.js';

const renderFirstPage = scene => {
  // const options = {
  //   hairBackArr: ['hair_1_back', 'hair_2_back'],
  //   bodyArr: ['body_1', 'body_2'],
  //   hairArr: ['hair_1', 'hair_2'],
  //   clothes: ['clothes_1', 'clothes_2'],
  // };

  const stageNames = [['body'], ['hair', 'hair_back'], ['clothes']];
  let stageIdx = 0;
  let idx = 0;

  const bgImg = scene.add.image(0, 0, 'balcony');

  const bgCoef = innerHeight / bgImg.height;
  const mainHeroX = innerWidth / 2;
  const mainHeroY = innerHeight / 2 + 100;

  bgImg.setScale(bgCoef, bgCoef).setPosition(innerWidth / 2, innerHeight / 2);

  const chooseText = scene.add.text(innerWidth / 2, 15, 'chooseDress', {
    background: scene.rexUI.add.roundRectangle(
      innerWidth / 2,
      25,
      150,
      40,
      10,
      0xc62d6e,
    ),
    fontSize: '20px',
  });
  chooseText.setX(chooseText.x - chooseText.width / 2);

  const scaleCoef = innerHeight / 1661;
  const person = {
    hair_back_img: personConstructor.create_hair_back(
      idx,
      scene,
      scaleCoef,
      mainHeroX,
      mainHeroY,
    ),

    body_img: personConstructor.create_body(
      idx,
      scene,
      scaleCoef,
      mainHeroX,
      mainHeroY,
    ),

    hair_img: personConstructor.create_hair(
      idx,
      scene,
      scaleCoef,
      mainHeroX,
      mainHeroY,
    ),

    clothes_img: personConstructor.create_clothes(
      idx,
      scene,
      scaleCoef,
      mainHeroX,
      mainHeroY,
    ),
  };

  const arrowLeft = scene.make.image({
    x: person.body_img.x - innerWidth / 3,
    y: person.body_img.y,
    key: 'arrow',
    flipX: true,
  });

  arrowLeft.setInteractive().on('pointerdown', function () {
    changeOption();
  });

  const arrowRight = scene.make.image({
    x: person.body_img.x + innerWidth / 3,
    y: person.body_img.y,
    key: 'arrow',
  });

  arrowRight.setInteractive().on('pointerdown', () => changeOption());

  const changeOption = () => {
    idx === 1 ? (idx = 0) : (idx = 1);
    stageNames[stageIdx].forEach(name => {
      const variable = `${name}_img`;
      person[variable].destroy();
      person[variable] = personConstructor[`create_${name}`](
        idx,
        scene,
        scaleCoef,
        mainHeroX,
        mainHeroY,
      );
    });
  };

  createTabs(scene);
  createSbmtBtn(scene, () => {
    stageIdx === stageNames.length - 1
      ? console.log('finish')
      : (stageIdx += 1);
    idx = 0;
  });
};

export default renderFirstPage;
