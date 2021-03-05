import {Missile} from './Missile.js'

export class Spaceship {
    missiles = [];
    #modifier = 10;
    #leftArrow = false;
    #rightArrow = false;

    constructor(element, container) {
        this.element = element;
        this.container = container;
    }

    init() {
        this.setPosition();
        this.#eventListeners();
        this.#gameLoop();
    }

    setPosition() {
        this.element.style.bottom = 0;
        this.element.style.left = `${window.innerWidth / 2 -this.#getPosition()}px`;
    }

    #getPosition() {
        return this.element.offsetLeft + this.element.offsetWidth / 2;
    }

    #eventListeners() {
        window.addEventListener('keydown', ({code}) => {
            switch(code) { 
                case 'Space':
                    this.#shot();
                    break;
                case 'ArrowLeft':
                    this.#leftArrow = true;
                    break;
                case 'ArrowRight':
                    this.#rightArrow = true;
                    break;
            }
        })
        window.addEventListener('keyup', ({key}) => {
            switch(key) {
                case 'ArrowLeft':
                    this.#leftArrow = false;
                    break;
                case 'ArrowRight':
                    this.#rightArrow = false;
                    break;
            }
        })
    }

    #gameLoop = () => {
        this.#whatKey();
        requestAnimationFrame(this.#gameLoop);
    }

    #whatKey() {
        if(this.#leftArrow && this.#getPosition() > 12) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) - this.#modifier}px`;
        }
        if(this.#rightArrow && this.#getPosition() + 12 < window.innerWidth) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) + this.#modifier}px`;
        }
    }

    #shot() {
        const missile = new Missile(this.#getPosition(), this.element.offsetTop, this.container);
        missile.init();
        this.missiles.push(missile);
    };
}