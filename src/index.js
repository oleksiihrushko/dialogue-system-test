import Phaser from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

import './styles.css';
import balconyImg from './images/balcony.jpg';
import hallImg from './images/hall.jpg';
import bedroomImg from './images/bedroom.jpg';

import scenario from './ons2.json';
import renderFirstPage from './firstPage';
console.log(scenario);

const content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

class Demo extends Phaser.Scene {
  constructor() {
    super({
      key: 'examples',
    });
  }

  preload() {
    this.load.image('balcony', balconyImg);
    this.load.image('hall', hallImg);
    this.load.image('bedroom', bedroomImg);
  }

  create() {
    renderFirstPage(this);
    // const textBox = createTextBox(
    //   this,
    //   innerWidth / 2 - 150,
    //   innerHeight / 2 - 32,
    //   {
    //     wrapWidth: 300,
    //     fixedWidth: 300,
    //     fixedHeight: 65,
    //   },
    // ).start(content, 50);
    // createTitle(this, textBox.x, textBox.y, 'title');
  }

  update() {}
}

const GetValue = Phaser.Utils.Objects.GetValue;
const createTextBox = function (scene, x, y, config) {
  const wrapWidth = GetValue(config, 'wrapWidth', 0);
  const fixedWidth = GetValue(config, 'fixedWidth', 0);
  const fixedHeight = GetValue(config, 'fixedHeight', 0);
  const textBox = scene.rexUI.add
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
    .setInteractive()
    .on(
      'pointerdown',
      function () {
        if (this.isTyping) {
          this.stop(true);
        } else {
          if (this.isLastPage) {
            createTextBox(scene, 100, 100, {
              wrapWidth: 500,
              fixedWidth: 500,
              fixedHeight: 65,
            }).start(content, 50);
            this.destroy();
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
  const title = scene.add.text(x + 170, y - 8, titleText, {
    background: scene.rexUI.add.roundRectangle(
      x + 200,
      y,
      130,
      40,
      10,
      0xc62d6e,
    ),
    fontSize: '20px',
  });

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

const config = {
  type: Phaser.AUTO,
  parent: 'root',
  width: '100%',
  height: '100%',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  defaultImage: 'balcony',
  scene: Demo,
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
};

const game = new Phaser.Game(config);
