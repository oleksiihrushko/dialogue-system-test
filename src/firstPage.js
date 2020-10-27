const renderFirstPage = scene => {
  const bgImg = scene.add.image(0, 0, 'balcony');

  const scaleCoef = innerHeight / bgImg.height;
  bgImg
    .setScale(scaleCoef, scaleCoef)
    .setPosition(innerWidth / 2, innerHeight / 2);

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
};

export default renderFirstPage;
