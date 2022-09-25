// ==UserScript==
// @name        Direct to Uptostream
// @namespace   https://github.com/WeLiveInASausage/violentmonkey_Scripts
// @downloadURL https://raw.githubusercontent.com/WeLiveInASausage/violentmonkey_Scripts/main/dl-protect%20uptostream%20link%20%26%20hide%20tirexo%20useless%20links.user.js
// @icon        https://i.ibb.co/MNg7Q8v/Sans-titre-1-1.png
// @match       https://dl-protect.info/*
// @match       https://www.tirexo.*/*
// @version     2.9
// @author      Jansen
// @grant       GM_addStyle
// @inject-into content
// @description Purges the list of tirexo links to display only uptobox links and automates the DL-protect process
// ==/UserScript==

function getRidOfShit() {
    setTimeout(() => {
        const shits = document.querySelectorAll('script')
        shits.forEach(shit => {
            if (shit.src.includes('jywigigu') || shit.src.includes('ads') || shit.src.includes('fauxtitters') || shit.src.includes('stats') || shit.src.includes('betzapdoson') || shit.hasAttribute('data-cfasync')) {
                shit.remove()
            }
        })

        if (document.querySelectorAll('.amigo')) {
            const amigo = document.querySelectorAll('.amigo')
            amigo.forEach(el => {
                el.remove()
            })
        }

        if (document.querySelectorAll('center')) {
            const center = document.querySelectorAll('center')
            center.forEach(el => {
                if (document.querySelector('div.container:nth-child(2) > div:nth-child(1) > div:nth-child(1) > center:nth-child(1) > a:nth-child(2)')) {
                    document.querySelector('div.container:nth-child(2) > div:nth-child(1) > div:nth-child(1) > center:nth-child(1) > a:nth-child(2)').remove()
                }
            })
        }
    }, 500)
}

//--------------------------------------dl-protect----------------------------------------

if (window.location.toString().includes('protect')) {

    function addGif() {
        const cover = window.location.toString().split('#').at(-1)
        const gif = document.createElement('div')
        gif.setAttribute('class', 'gif')
        document.querySelectorAll('.row')[1].after(gif)
        gif.innerHTML = '<img src=""  class="giphy-embed" allowFullScreen></img>'
        document.querySelector('.gif img').src = cover
        //gif.innerHTML = '<img src="https://i.giphy.com/media/yziuK6WtDFMly/giphy.webp"  class="giphy-embed" allowFullScreen></img>'
    }

    //window.onload = () => {

    document.getElementsByTagName("h1")[0].innerText = "Your Uptostream link is generating"
    document.getElementsByTagName("p")[0].innerText = "thanks for waiting, have a nice day !"

    // cleaning HTML of some unwanted shit.
    let style =
        `
          body {
              background: #1c1c1c ! important;
          }

          .navbar-default {
              background-color: #1c1c1c;
              border-color: #333;
          }

          div.container:nth-child(2) > div:nth-child(1) > div:nth-child(1) > center:nth-child(1) > h3:nth-child(1) {
              margin-top: 5px;
          }

          .row {
              background: #1c1c1c;
          }

          .amigo, footer, .grecaptcha-badge {
              display: none !important;
          }

          h3 {
              color: #b7b7b7 !important;
          }

          .col-md-12.urls.text-center {
              background: #262626 !important;
              border: 1px solid #484848 !important;
          }

          .g-recaptcha {
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

          .gif {
              width: 75%;
              height: auto;
              margin: auto;
              padding-top: 15px;
          }

          iframe.giphy-embed {
              width: 100%;
          }

          .gif img {
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

          #logo > img:nth-child(1) {
              filter: grayscale(100%);
          }

          body > div:nth-child(8) > div:nth-child(2) {
              position: fixed !important;
              top: 120px !important;
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

          @media (max-width: 800px) {
              #logo > img:nth-child(1) {
              display: none;
              }
          }

          `
    GM_addStyle(style);
    getRidOfShit()

    if (document.querySelector('.g-recaptcha')) {

        if (window.location.href.indexOf("#") > -1) {
            addGif()
        }
        setTimeout(() => {
            document.querySelector('.g-recaptcha').dispatchEvent(new Event("submit"));
        }, 800)

    } else {

        const body = document.querySelector('body')
        const mutationObserver = new MutationObserver(mutations => {

            console.log(mutations)

            if (document.querySelector('.g-recaptcha')) {
                mutationObserver.disconnect();
                addGif()
                setTimeout(() => {
                    document.querySelector('.g-recaptcha').dispatchEvent(new Event("submit"));
                }, 800)

            }
        })
        mutationObserver.observe(body, { childList: true, subtree: true })

    }

    // div that contains uptobox link after validate button is clicked and/or captcha is resolved.
    //const div = document.querySelector('div.container:nth-child(3)')

    // each second check if div that contains uptobox link has been added into HTML by website's script.
    let zeparti = setInterval(() => {

        if (document.querySelector('#protected-container')) {

            let link = document.querySelector('.col-md-12 > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)');

            if (link.href.includes("uptobox")) {
                // replace uptobox link by uptostream link then clear interval
                link.href = link.href.replace('uptobox', 'uptostream');
                link.innerText = link.href.replace('uptobox', 'uptostream');
                clearInterval(zeparti);

                // check if uptobox link has been replaced by uptostream. As soon it's done, open it in a new tab, then clear interval.
                const openLink = setInterval(() => {

                    let checkOpen = false

                    if (link.href.includes('uptostream')) {

                        /*window.open(link.href, '_self')*/
                        window.open(link.href, '_blank', 'noopener')
                        checkOpen = true
                    }
                    if (checkOpen) {
                        clearInterval(openLink)
                        window.close();
                    }

                }, 1000)
            }



        } else {
            console.log('waiting for the captcha to be resolved')
        }

    }, 500);
    //}
}

//-----------------------------------------------------------------------------------------------TIREXO----------------------------------------------------------------------------------

// cleanUp home page
if (window.location.toString().includes('tirexo')) {

    getRidOfShit()

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
                    let link = `${anchor.substring(anchor.indexOf('https'), anchor.indexOf('>') - 1)}#${cover}`
                    bArray[i + 1].innerHTML = `<a href="#" onclick="window.open('${link}','_blank')">Télécharger</a>`
                    console.log('onclick are set')
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
                        let link = `${anchor.substring(anchor.indexOf('https'), anchor.indexOf('>') - 1)}#${cover}`
                        bArray[j].innerHTML = `<a href="#" onclick="window.open('${link}','_blank')">Episode ${count}</a>`
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
