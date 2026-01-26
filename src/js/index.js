import "./common/common.js";
import { storiesSlider } from "./components/stories-slider.js";
import { faq } from "./components/faq.js";
import { teamslider } from "./components/team-slider.js";
import { offersSlider } from "./components/offers-slider.js";
import { aboutUsSlider } from "./components/aboutUs-slider";


document.addEventListener('DOMContentLoaded', function (event) {


    /* ==================================
    Team slider
    ==================================*/
    teamslider()

    /* ==================================
    stories slider
    ==================================*/
    storiesSlider()

    /* ==================================
    stories slider
    ==================================*/
    offersSlider()
    /* ==================================
    stories slider
    ==================================*/
    aboutUsSlider()
    /* ==================================
   FAQ()
    ==================================*/
    faq()


});
