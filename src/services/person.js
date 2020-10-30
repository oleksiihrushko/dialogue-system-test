const { personConstructor } = require('./creators.js');

class Person {
  constructor(gender, personConfig, scene, scaleCoef, mainHeroX, mainHeroY) {
    this.idx = 0;
    this.gender = gender;
    this.personConfig = personConfig;
    this.scene = scene;
    this.scaleCoef = scaleCoef;
    this.mainHeroX = mainHeroX;
    this.mainHeroY = mainHeroY;

    this.body = personConstructor.create_body(
      this.gender,
      this.personConfig[0],
      this.scene,
      this.scaleCoef,
      this.mainHeroX,
      this.mainHeroY,
    );

    this.hair_back = personConstructor.create_hair_back(
      this.gender,
      this.personConfig[1],
      this.scene,
      this.scaleCoef,
      this.mainHeroX,
      this.mainHeroY,
    );

    this.hair = personConstructor.create_hair(
      this.gender,
      this.personConfig[1],
      this.scene,
      this.scaleCoef,
      this.mainHeroX,
      this.mainHeroY,
    );

    this.clothes = personConstructor.create_clothes(
      this.gender,
      this.personConfig[2],
      this.scene,
      this.scaleCoef,
      this.mainHeroX,
      this.mainHeroY,
    );

    this.face = personConstructor.create_face(
      this.gender,
      this.personConfig[3],
      this.personConfig[0],
      this.scene,
      this.scaleCoef,
      this.mainHeroX,
      this.mainHeroY,
    );
  }

  changeOption(stageNames, stageIdx) {
    this.idx === 1 ? (this.idx = 0) : (this.idx = 1);
    stageNames[stageIdx].forEach(name => {
      if (name === 'body') {
        this.face.destroy();
        this.face = personConstructor.create_face(
          this.gender,
          this.personConfig[3],
          this.idx,
          this.scene,
          this.scaleCoef,
          this.mainHeroX,
          this.mainHeroY,
        );
      }
      this[name].destroy();
      this[name] = personConstructor[`create_${name}`](
        this.gender,
        this.idx,
        this.scene,
        this.scaleCoef,
        this.mainHeroX,
        this.mainHeroY,
      );
    });
  }

  changeFace(faceKey, color) {
    this.face.destroy();
    this.face = personConstructor.create_face(
      this.gender,
      faceKey,
      color,
      this.scene,
      this.scaleCoef,
      this.mainHeroX,
      this.mainHeroY,
    );
  }

  destroyPerson() {
    this.body.destroy();
    this.hair_back.destroy();
    this.hair.destroy();
    this.clothes.destroy();
    this.face.destroy();
  }

  flipPerson() {
    this.body.setFlipX(true);
    this.hair_back.setFlipX(true);
    this.hair.setFlipX(true);
    this.clothes.setFlipX(true);
    this.face.setFlipX(true);
  }
}
export default Person;
