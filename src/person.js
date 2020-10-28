const { personConstructor } = require('./services/creators');

class Person {
  constructor(personConfig, scene, scaleCoef, mainHeroX, mainHeroY) {
    this.idx = 0;
    this.personConfig = personConfig;
    this.scene = scene;
    this.scaleCoef = scaleCoef;
    this.mainHeroX = mainHeroX;
    this.mainHeroY = mainHeroY;

    this.body = personConstructor.create_body(
      this.personConfig[0],
      this.scene,
      this.scaleCoef,
      this.mainHeroX,
      this.mainHeroY,
    );

    this.hair_back = personConstructor.create_hair_back(
      this.personConfig[1],
      this.scene,
      this.scaleCoef,
      this.mainHeroX,
      this.mainHeroY,
    );

    this.hair = personConstructor.create_hair(
      this.personConfig[1],
      this.scene,
      this.scaleCoef,
      this.mainHeroX,
      this.mainHeroY,
    );

    this.clothes = personConstructor.create_clothes(
      this.personConfig[2],
      this.scene,
      this.scaleCoef,
      this.mainHeroX,
      this.mainHeroY,
    );
  }

  changeOption(stageNames, stageIdx) {
    this.idx === 1 ? (this.idx = 0) : (this.idx = 1);
    stageNames[stageIdx].forEach(name => {
      this[name].destroy();
      this[name] = personConstructor[`create_${name}`](
        this.idx,
        this.scene,
        this.scaleCoef,
        this.mainHeroX,
        this.mainHeroY,
      );
    });
  }

  destroyPerson() {
    this.body.destroy();
    this.hair_back.destroy();
    this.hair.destroy();
    this.clothes.destroy();
  }
}
export default Person;
