import "./common/common.js";
import "./components/showTextBlock.js";
import "./components/formCounts.js";
import "./components/customSelect.js";
import "./components/navigationMenu.js";
import "./components/rangeSlider.js";
import "./components/contentNavigation";
import "./components/sectionCategoryInfo";
import "./components/video-first-block";
import "./components/header";

import "./vendor/fslightbox.min";
import "./vendor/af-lightbox";
import { storiesSlider } from "./components/stories-slider.js";
import { aboutCompany } from "./components/aboutCompany.js";
import { faq } from "./components/faq.js";
import { teamslider } from "./components/team-slider.js";
import { offersSlider } from "./components/offers-slider.js";
import { aboutUsSlider } from "./components/aboutUs-slider";
import {initProductGallery} from "./components/productGallery.js";


document.addEventListener('DOMContentLoaded', function (event) {


    /* ==================================
    Team slider
    ==================================*/
    teamslider()

    /* ==================================
    stories slider
    ==================================*/
    storiesSlider()

    /*============aboutCompany======================*/
    aboutCompany()

    /* ==================================
    stories slider
    ==================================*/
    offersSlider()
    /* ==================================
    thumbSlider
    ==================================*/
    initProductGallery()
    /* ==================================
    stories slider
    ==================================*/
    aboutUsSlider()
    /* ==================================
   FAQ()
    ==================================*/
    faq()


});
