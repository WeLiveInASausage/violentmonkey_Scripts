// ==UserScript==
// @name        Direct to Uptostream
// @namespace   https://github.com/WeLiveInASausage/violentmonkey_Scripts
// @downloadURL https://raw.githubusercontent.com/WeLiveInASausage/violentmonkey_Scripts/main/dl-protect%20uptostream%20link%20%26%20hide%20tirexo%20useless%20links.user.js
// @icon        https://i.ibb.co/MNg7Q8v/Sans-titre-1-1.png
// @match       https://dl-protect.info/*
// @match       https://www.tirexo.*/*
// @version     2.6
// @author      Jansen
// @grant       GM_addStyle
// @inject-into auto
// @description Purges the list of tirexo links to display only uptobox links and automates the DL-protect process
// ==/UserScript==

function getRidOfShit() {
    setTimeout(() => {
        const shits = document.querySelectorAll('script')
        shits.forEach(shit => {
            if (shit.src.includes('jywigigu') || shit.src.includes('ads') || shit.src.includes('fauxtitters') || shit.src.includes('stats') || shit.hasAttribute('data-cfasync')) {
                shit.remove()
            }
        })
    }, 500)
}

//--------------------------------------dl-protect----------------------------------------

if (window.location.toString().includes('protect')) {




    //window.onload = () => {

      document.getElementsByTagName("h1")[0].innerText = "Your Uptostream link is generating"
      document.getElementsByTagName("p")[0].innerText = "thanks for waiting, have a nice day !"

      // cleaning HTML of some unwanted shit.
      let style =
          `
          body {
              background: #1c1c1c ! important;
          }

          .amigo, footer {
              display: none !important;
          }

          h3 {
              color: #b7b7b7 !important;
          }

          .col-md-12.urls.text-center {
              background: #262626 !important;
              border: 1px solid #484848 !important;
          }

          `
      GM_addStyle(style);
      getRidOfShit()

      /*if(document.querySelector('.g-recaptcha')){
        document.querySelector('.g-recaptcha').dispatchEvent(new Event("submit"));
      }*/

// If dl-protect "continue button" getting trouble to be auto clicked

  const body = document.querySelector('body')

    const mutationObserver = new MutationObserver(mutations => {

    console.log(mutations)

    if (document.querySelector('.g-recaptcha')) {
        mutationObserver.disconnect();
        console.log('EXIST')
        document.querySelector('.g-recaptcha').dispatchEvent(new Event("submit"));

      }
    })
    mutationObserver.observe(body, { childList: true, subtree: true })


    // div that contains uptobox link after validate button is clicked and/or captcha is resolved.
    //const div = document.querySelector('div.container:nth-child(3)')


    // each second check if div that contains uptobox link has been added into HTML by website's script.
    let zeparti = setInterval(() => {

        if (document.querySelector('#protected-container')) {

            let link = document.querySelector('.col-md-12 > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)');

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

            let finalArray = [];

            for (i = 0; i < bArray.length; i++) {

                if (/*bArray[i].innerText === '1fichier' || */bArray[i].innerText === 'Uptobox') {
                    finalArray.push(bArray[i])
                    finalArray.push(bArray[i + 1])

                    // replace anchor.href by onclick method so that the dl-protect tab can open uptostream on itself after the script execution is done.
                    let anchor = bArray[i + 1].innerHTML
                    let link = anchor.substring(anchor.indexOf('https'), anchor.indexOf('>') - 1)
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

            let finalArray = [];

            bArray.forEach((el, i) => {

                let count = 1

                if (/*el.innerText === '1fichier' || */el.innerText === 'Uptobox') {
                    finalArray.push(el)
                    for (j = i + 1; j <= i + maxEp; j++) {
                        finalArray.push(bArray[j])

                        let anchor = bArray[j].innerHTML
                        let link = anchor.substring(anchor.indexOf('https'), anchor.indexOf('>') - 1)
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
