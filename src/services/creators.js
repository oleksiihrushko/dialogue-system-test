const hairBackArr = ['hair_1_back', 'hair_2_back'];
const bodyArr = ['body_1', 'body_2'];
const hairArr = ['hair_1', 'hair_2'];
const clothes = ['clothes_1', 'clothes_2'];

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
      .setPosition(mainHeroX, mainHeroY).depth = 1;

    return bodyImg;
  },

  create_hair: (idx, scene, scaleCoef, mainHeroX, mainHeroY) => {
    const hair_Img = scene.add.image(0, 0, hairArr[idx]);
    hair_Img
      .setScale(scaleCoef, scaleCoef)
      .setPosition(mainHeroX, mainHeroY).depth = 3;

    return hair_Img;
  },

  create_clothes: (idx, scene, scaleCoef, mainHeroX, mainHeroY) => {
    const clothes_Img = scene.add.image(0, 0, clothes[idx]);
    clothes_Img
      .setScale(scaleCoef, scaleCoef)
      .setPosition(mainHeroX, mainHeroY).depth = 2;

    return clothes_Img;
  },
};

const createTabs = scene => {
  var tabs = scene.rexUI.add
    .tabs({
      x: innerWidth / 2,
      y: 600,

      panel: scene.rexUI.add
        .roundRectangle(0, 0, 300, 60, 10, 0xffffff)
        .setAlpha(0.5),

      panel1: scene.rexUI.add
        .roundRectangle(
          innerWidth / 2,
          587,
          100,
          10,
          {
            bl: 20,
            br: 20,
          },
          0xf48bb8,
        )
        .setDepth(5)
        .setStrokeStyle(1, 0xffffff, 1),

      topButtons: [
        scene.add.image(0, -10, 'ellipseA').setScale(0.8),
        scene.add.image(0, -10, 'ellipse'),
        scene.add.image(0, -10, 'ellipse'),
        scene.add.image(0, -10, 'ellipse'),
        scene.add.image(0, -10, 'ellipse'),
      ],

      space: {
        topButtonsOffset: 103,
        topButton: 10,
      },
    })
    .layout();

  tabs.setDepth(5);

  scene.print = scene.add.text(0, 0, '');
  tabs.on(
    'button.click',
    function (button, groupName, index) {
      // console.log(button);
      scene.print.text += index + '\n';
      button.texture.remove('ellipse');
      // console.log(button);

      button.texture.key = 'ellipseA';
      button.update();
      tabs.getElement('panel').setAlpha(+`0.${index}` + 0.1);
    },
    scene,
  );
};

const createSbmtBtn = (scene, callback) => {
  const sbmtBtn = scene.rexUI.add
    .roundRectangle(innerWidth / 2, 650, 30, 10, 5, 0xffffff)
    .setDepth(6);

  sbmtBtn.setInteractive().on('pointerdown', callback);

  return sbmtBtn;
};

export { personConstructor, createTabs, createSbmtBtn };
