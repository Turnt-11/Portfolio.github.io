window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 400;
  canvas.height = 400;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const lineCount = 41; // 1 center line + 40 additional lines
  const rotationSpeed = 0.002;
  const radiusX = 100;
  const radiusY = 50;
  const lineWidth = 3;

  let angle = 0;
  let scale = 1.5;
  let scalingDirection = 1;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply scaling transformation to the canvas
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);

    // Apply rotation transformation to the canvas
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.translate(-centerX, -centerY);

    for (let i = 0; i < lineCount; i++) {
      const lineAngle = (i / lineCount) * Math.PI * 2;
      const x1 = centerX + Math.sin(lineAngle + angle) * radiusX;
      const y1 = centerY + Math.sin((lineAngle + angle) * 2) * radiusY;
      const x2 = centerX + Math.sin(lineAngle + angle) * radiusX;
      const y2 = centerY - Math.sin((lineAngle + angle) * 2) * radiusY;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = 'green';
      ctx.stroke();
    }

    ctx.restore();

    angle += rotationSpeed;
    scale += scalingDirection * 0.005;

    if (scale >= 1.5 || scale <= 0.5) {
      scalingDirection *= -1;
    }

    requestAnimationFrame(draw);
  }

  draw();
});
$(document).ready(function() {
  var $slider = $('.custom-card-slider');
  var $cardsContainer = $('.custom-cards-container');
  var $cards = $('.custom-cards');
  var cardWidth = $cards.first().outerWidth();
  var totalCards = $cards.length;
  var sliderWidth = $slider.width();
  var currentPosition = 0;

  $('.next-btn').click(function() {
    currentPosition -= cardWidth;
    if (currentPosition < -((totalCards - 1) * cardWidth)) {
      currentPosition = 0;
    }
    $cardsContainer.css('transform', 'translateX(' + currentPosition + 'px)');
  });

  $('.prev-btn').click(function() {
    currentPosition += cardWidth;
    if (currentPosition > 0) {
      currentPosition = -((totalCards - 1) * cardWidth);
    }
    $cardsContainer.css('transform', 'translateX(' + currentPosition + 'px)');
  });
});

