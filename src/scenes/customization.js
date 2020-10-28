import renderFirstPage from '../firstPage';

class Customization extends Phaser.Scene {
  constructor() {
    super({
      key: 'customization',
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
    renderFirstPage(this);
  }

  update() {}
}

export default Customization;
