<template>
<transition name="fade">
<CAlert
:show.sync="dismissCountDown"
>
    <div class="loader">
        <div id="overlay">
            <div>
                <img width="30%" src="/img/upload/loading.gif">
            </div>
        </div>
    </div>
</CAlert>
</transition>
</template>

<script>
import jQuery from 'jquery';

const CENTER_X = 50;
const CENTER_Y = 50;
const RADIUS = 20;

function positionOnCircle(radius, angle, center) {
  return {
    x: center.x + (radius * Math.cos(toRadians(angle))),
    y: center.y + (radius * Math.sin(toRadians(angle)))
  };
}

function toRadians(angle) {
  return angle * Math.PI / 180;
}

function calculatePositions(component) {
  let angleIncrement = 360 / component.circles.length;
  let positions = {};
  component.circles.forEach((circle, index) => {
    positions[index] = positionOnCircle(
      RADIUS,
      angleIncrement * index,
      {x: CENTER_X, y: CENTER_Y}
    )
  });
  return positions;
}

export default {
  data() {
    return {
      circles: [
        {color: '#E0F2F1', radius: 0},
        {color: '#B2DFDB', radius: 0},
        {color: '#e36249', radius: 0},
        {color: '#e36249', radius: 0},
        {color: '#E94823', radius: 0},
        {color: '#E94823', radius: 0},
        {color: '#E94823', radius: 0},
        {color: '#E94823', radius: 0},
        {color: '#ce2b08', radius: 0},
      ],
      counter: 0,
      interval: null,
      dismissCountDown: 3,
    }
  },
  props: ["loading"],
  computed: {
    circlePositions: calculatePositions
  },
  created() {
    this.interval = setInterval(() => {
      this.counter++;
      this.circles = this.circles.map((item, index) => ({
        ...item,
        radius: (this.counter + index) % 8
      }));
    }, 70);
    
  },
  destroyed() {
    clearInterval(this.interval);
  }
}
</script>

<style scoped>
.loading-spinner {
  width: 100px;
  height: 100px;
}
#overlay {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,1); /* Black background with opacity */
  z-index: 9999999; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 3s ease-in-out;
  -moz-transition: opacity 3s ease-in-out;
  -ms-transition: opacity 3s ease-in-out;
  -o-transition: opacity 3s ease-in-out;
}
@-webkit-keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@-webkit-keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.fadeIn {
    -webkit-animation: fadeIn;
    animation: fadeIn;
    opacity: 1;
}

.fadeOut {
    -webkit-animation: fadeOut;
    animation: fadeOut;
    opacity: 0;
}

.fast {
    -webkit-animation-duration: 1s;
    animation-duration: 1s
}
#overlay div {
  text-align:center;
}
</style>
