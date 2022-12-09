// ==UserScript==
// @name        Direct to Uptostream
// @namespace   https://github.com/WeLiveInASausage/violentmonkey_Scripts
// @downloadURL https://raw.githubusercontent.com/WeLiveInASausage/violentmonkey_Scripts/main/dl-protect%20uptostream%20link%20%26%20hide%20tirexo%20useless%20links.user.js
// @icon        https://i.ibb.co/MNg7Q8v/Sans-titre-1-1.png
// @match       https://dl-protect.*/*
// @match       https://www.tirexo.*/*
// @match       https://uptostream.com/*
// @version     3.8.0
// @author      Jansen
// @grant       GM_addStyle
// @inject-into auto
// @description Last update : 09/12/2022 - 23:01:55. Purges the list of tirexo links to display only uptobox links and automates the DL-protect process + NEW UPTOSTREAM STYLE !!!
// ==/UserScript==



//--------------------------------------dl-protect----------------------------------------

if (window.location.toString().includes('protect')) {


    //Add cover from tirexo movie's/serie's page
    function addCover() {
        const coverUrl = window.location.href.split('?')[2]
        const cover = document.createElement('div')
        cover.setAttribute('class', 'cover')
        document.querySelectorAll('.row')[1].after(cover)
        cover.innerHTML = '<img src="" allowFullScreen></img>'
        document.querySelector('.cover img').src = coverUrl
    }

    function checkCoverAndClick() {
        // If url contains a "films" or "series", display file's cover
        if (window.location.href.indexOf("films") > -1 || window.location.href.indexOf("series") > -1) addCover()

        // Auto click on validate button then check if captcha is asked.
        setTimeout(() => {

            document.querySelector('#myForm').submit()

        }, 800)

    }

    document.getElementsByTagName("h1")[0].innerText = "Your Uptostream link is generating"
    document.getElementsByTagName("p")[0].innerText = "thanks for waiting, have a nice day !"

    // cleaning HTML of some unwanted el via CSS.
    let style =
        `
          body {
              /*background: #1c1c1c !important;*/
              background: #1c1c1c url('https://www.drmazarakis.com/wp-content/uploads/minimalistic-christmas-flat-lay-1980x1320.jpg') ! important;
              background-size: cover !important;
          }

          #logo {
              margin: 5px 0 0 16px !important;
          }

          #logo > img:nth-child(1) {
             /*filter: grayscale(100%);*/
             width: 80px;
             content:url(https://www.pngplay.com/wp-content/uploads/5/Golden-Bell-Christmas-PNG.png);
          }

          .container > .row > .col-sm-12 {
              margin-top: 15px;
          }

          .navbar-default {
              background-color: #1c1c1c;
              border-color: #333;
              margin-bottom: 0;
          }

          .row {
              background: #1c1c1c;
          }

          .amigo, footer, .grecaptcha-badge, body > div.container > div:nth-child(1) > div > center > a > img, .row::after {
              display: none !important;
          }

          #protected-container > div:nth-child(1) > div:nth-child(1) > center:nth-child(1) {
              height: 50px;
          }

          h3 {
              color: #b7b7b7 !important;
          }

          .col-md-12.urls.text-center {
              background: #262626 !important;
              border: 1px solid #484848 !important;
          }

          #subButton {
              color: white;
              padding: 10px 20px;
              background: #363a3c;
              border-radius: 7px;
              border: transparent;
              box-shadow: 4px 4px 2px rgba(0,0,0,0.2);
              font-weight: bold;
              width: 78%;
              min-width: 135px;
              max-width: 430px;
          }

          .g-recaptcha:hover {
              background: #3d4244;
          }

          .cover {
              width: 75%;
              height: auto;
              margin: auto;
              padding-top: 15px;
          }

          .cover img {
              display: block;
              width: 100%;
              height: auto;
              max-width: 430px;
              min-width: 135px;
              margin: auto;
              box-shadow: 7px 7px 3px rgba(0,0,0,0.2), -7px 7px 3px rgba(0,0,0,0.1);
              border-radius: 7px;
              margin-bottom: 15px;
          }

          .form-control-static {
              min-height: 0px;
          }

          .form-group {
              margin-bottom: 0;
          }

          div.col-sm-4:nth-child(2) {
              width: 100%;
          }

          footer + div {
              position: unset !important;
          }

          footer + div > div:last-child {
              top: 175px !important;
          }

          @media (max-width: 800px) {
              #logo > img:nth-child(1) {
              display: none;
              }
          }

          .cf-turnstile {
              position: relative !important;
              width: 100% !important;
              height: 100% !important;
              display: flex !important;
              justify-content: center !important;
          }

          iframe[title~="Cloudflare"] {
              display: block !important;
              position: relative !important;
              bottom: 15px !important;
              border-radius: 32px !important;
          }

          #my-custom-span {
            width: 25px;
            height: 25px;
            position: absolute;
            background: red;
            top: 7px;
            left: 325px;
            border-radius: 12px;
            pointer-events: none;
            z-index: 1;
          }
          `

    GM_addStyle(style);

    if (typeof document.querySelectorAll('.col-sm-12.text-center')[1] != 'undefined' && document.querySelectorAll('.col-sm-12.text-center')[1] != null) {

        const divToObserve = document.querySelectorAll('.col-sm-12.text-center')[1]
        const mutationObserver = new MutationObserver(mutations => {

            //console.log(mutations)

            if (mutations[0].addedNodes[0].nodeValue == "Continuer") {
                checkCoverAndClick()

            }
        })
        mutationObserver.observe(divToObserve, { childList: true, characterData: true, subtree: true })

    } else {

        const body = document.querySelector('body')
        const mutationObserver = new MutationObserver(mutations => {

            if (document.querySelector('#protected-container')) {

                mutationObserver.disconnect();
                let link = document.querySelector('.col-md-12 > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)');

                if (link.href.includes("uptobox")) {
                    // replace uptobox link by uptostream link
                    link.href = link.href.replace('uptobox', 'uptostream');
                    window.location.href = link.href
                }
            }
        })
        mutationObserver.observe(body, { childList: true })
    }
}

//-----------------------------------------------------------------------------------------------TIREXO----------------------------------------------------------------------------------


if (window.location.toString().includes('tirexo') && !window.location.toString().includes('dl-protect')) {


    // Regroup COMMON movies-series VARIABLES & CleanUp movies and series COMMON elements
    if (window.location.toString().includes('film') || window.location.toString().includes('serie')) {

        const links = document.querySelectorAll('.col-mov-right > div > b')
        const bArray = [];

        for (i = 0; i < links.length; i++) {

            bArray.push(links[i])
            links[i].style.display = 'none'
        }

        //------------------------Improve some elements------------------------
        document.querySelector('.ul_detail > h1:nth-child(1)').style.margin = '40px 0' // add margin top & bottom to the first badge
        document.querySelector('img.jaquette').style.borderRadius = '5px' // add rounded borders to jaquette

        //------------------------Remove <br> ----------------------------
        const brDescription = document.querySelectorAll('.ul_detail > br')
        const br = document.querySelectorAll('br')
        let brArray = [];

        for (i = 0; i < br.length; i++) {
            brArray.push(br[i])
        }

        for (i = 0; i < brArray.length; i++) {
            brArray[i].style.display = 'none'
        }

        for (i = 0; i < brDescription.length; i++) {
            brDescription[i].style.display = 'inline'
        }

        //-------------Remove useless elements -----------------
        const menuCategory = document.querySelectorAll('div.card')

        for (i = 0; i < menuCategory.length; i++) {
            menuCategory[5].style.display = 'none';
            menuCategory[7].style.display = 'none';
            menuCategory[8].style.display = 'none';
        }

        document.querySelector('center').remove() // remove download button
        const uselessH2 = document.querySelectorAll('h2')

        for (i = 0; i < uselessH2.length; i++) {
            if (uselessH2[i].innerText === 'Liens Streaming') {
                uselessH2[i].style.display = 'none'
            }
        }

        //--------------------------------------------------------------------------------MOVIES PART------------------------------------------------------------------------------------

        if (window.location.toString().includes('film')) {

            //-------------Get only uptobox and 1fichier-----------

            const cover = document.querySelector('.xfieldimage').src

            let finalArray = [];

            for (i = 0; i < bArray.length; i++) {

                if (/*bArray[i].innerText === '1fichier' || */bArray[i].innerText === 'Uptobox') {
                    finalArray.push(bArray[i])
                    finalArray.push(bArray[i + 1])

                    // replace anchor.href by onclick method so that the dl-protect tab can open uptostream on itself after the script execution is done.
                    let anchor = bArray[i + 1].innerHTML
                    let link = `${anchor.substring(anchor.indexOf('https'), anchor.indexOf('>') - 1)}?${cover}`
                    bArray[i + 1].firstElementChild.href = link

                }

            }

            for (i = 0; i < finalArray.length; i++) {
                finalArray[i].style.display = 'block'
            }

            for (i = 0; i < finalArray.length; i += 2) {
                finalArray[i].style.marginTop = '20px'
            }
        }

        //--------------------------------------------------------------------------SERIES PART--------------------------------------------------------------

        if (window.location.toString().includes('serie')) {

            document.querySelector('.col-mov-right > div:nth-child(1) > div:nth-child(6)').remove()// remove fake premium link

            const episodes = bArray.filter(el => el.innerText.includes('Episode'))
            const maxEp = Math.max(...episodes.map(el => el.innerText.replaceAll(/[a-zA-Z!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "").trim()))
            const cover = document.querySelector('.xfieldimage').src

            let finalArray = [];

            bArray.forEach((el, i) => {

                let count = 1

                if (/*el.innerText === '1fichier' || */el.innerText === 'Uptobox') {
                    finalArray.push(el)
                    for (j = i + 1; j <= i + maxEp; j++) {
                        finalArray.push(bArray[j])

                        let anchor = bArray[j].innerHTML
                        let link = `${anchor.substring(anchor.indexOf('https'), anchor.indexOf('>') - 1)}?${cover}`
                        bArray[j].innerHTML = `<a rel="external nofollow" target="_blank" href="${link}">Episode ${count}</a>`
                        count += 1
                    }
                }
            })

            for (i = 0; i < finalArray.length; i++) {
                finalArray[i].style.display = 'block'
            }

            for (i = 0; i < finalArray.length; i += maxEp + 1) {
                finalArray[i].style.marginTop = '20px'
            }
        }
    }
}

//------------------------------------------------------------------------Uptobox restyle-------------------------------------------------------------------------

if (window.location.toString().includes('uptostream')) {

    let wallpaper = "https://w.wallhaven.cc/full/9m/wallhaven-9mw39w.jpg"

    let uptoStreamStyle =
        `
    body {
        background: #131313 url("${wallpaper}")!important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
        background-position: center !important;
        min-width: 570px;
    }

    #navbar {
        background-color: #1e1e1e !important;
    }

    #content-wrapper {
        background-image: unset !important;
    }

    #content {
    width: 100% !important;
    }

    #topBar, #extraInfos .title, #shortcuts, #qrcode, #extraInfos .code_embed, #footer, .recap-links label:last-child {
        display: none !important;
    }


    .file-title, .recap-links, .mt-4 {
        text-align: center !important;
    }

    .file-title {
        font-size: 28px;
        margin-top: 75px;
        color: white !important;
    }

    #videoContainer {
        position: unset !important;
        z-index: unset !important;
        min-height: 320px !important;
        height: unset !important;
        /*display: unset !important;*/
        background: unset !important;
        width: unset !important;
        margin: 0 auto;
        transition: unset !important;
        min-width: 555px !important;
        max-width: 1000px !important;
        border: 6px solid #1a1a1a;
        border-radius: 5px;
    }

    #hls-player {
      width: 100%; unset !important;
      height: 100%; unset !important;
    }

    #player {
      width: 100%; unset !important;
      height: 100%; unset !important;
    }

    video {
      position: unset !important;
      top: unset !important;
      left: unset !important;
      width: 100%;
      height: 100%;
      /*padding: 4% 0 8% 0 !important;*/
}
    }

    #content > div {
        padding-top: unset !important;
    }

    #hls-video {
        padding-top: unset !important;
        padding-bottom: unset !important;
    }

    .fake-player-uts {
        padding-bottom: 56.25%;
    }

    .button-wrapper, .download {
        margin-bottom: unset !important;
    }

    #user-status-premium {
        margin-top: 25px !important;
        background-color: #1d1d1d75 !important;
    }

    .successBox {
        background-color: #1d1d1d75 !important;
    }

    .little-gray-txt {
        color: #c8c8c8 !important;
    }
  `
    GM_addStyle(uptoStreamStyle);
}
