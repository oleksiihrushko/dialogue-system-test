import renderFirstPage from '../firstPage';
import balconyImg from '../images/bg/balcony.jpg';
import hallImg from '../images/bg/hall.jpg';
import bedroomImg from '../images/bg/bedroom.jpg';
import body_1Img from '../images/body/body_1.png';
import body_2Img from '../images/body/body_2.png';
import arrowImg from '../images/arrow.png';
import ellipseImg from '../images/ellipse.png';
import ellipseAImg from '../images/ellipseA.png';
import hair_1Img from '../images/hair/hair_1.png';
import hair_2Img from '../images/hair/hair_2.png';
import hair_1_backImg from '../images/hair/hair_1_back.png';
import hair_2_backImg from '../images/hair/hair_2_back.png';
import clothes_1Img from '../images/clothes/clothes_1.png';
import clothes_2Img from '../images/clothes/clothes_2.png';

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
    this.load.image('body_1', body_1Img);
    this.load.image('body_2', body_2Img);
    this.load.image('arrow', arrowImg);
    this.load.image('ellipse', ellipseImg);
    this.load.image('ellipseA', ellipseAImg);
    this.load.image('hair_1', hair_1Img);
    this.load.image('hair_2', hair_2Img);
    this.load.image('hair_1_back', hair_1_backImg);
    this.load.image('hair_2_back', hair_2_backImg);
    this.load.image('clothes_1', clothes_1Img);
    this.load.image('clothes_2', clothes_2Img);
  }

  create() {
    renderFirstPage(this);
  }

  update() {}
}

export default Customization;
