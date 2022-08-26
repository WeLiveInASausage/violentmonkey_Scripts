// ==UserScript==
// @name        Youtube_Volume_Control
// @namespace   Violentmonkey Scripts
// @downloadURL  https://raw.githubusercontent.com/WeLiveInASausage/violentmonkey_Scripts/main/Youtube_Volume_Control.user.js
// @icon        data:image/png;base64,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
// @include     *://*.youtube.com/*
// @include     *://youtu.be/*
// @version     2.0
// @author      Jansen
// @grant       GM_addStyle
// @grant       GM_addElement
// @runAt       document-end
// @grant       unsafeWindow
// @description Set custom default volume and add buttons default volume, minus volume and plus volume that you can set by x% of your choice
// ==/UserScript==

if (window.location.toString().includes('watch')) {

    window.addEventListener("load", e => {

        const baseVolume = 1 // volume applyed to the player when red button (min) is clicked           /
        const volumeStep = 1 // currently set to increase or decrease the volume by 1% per click    <==|== Adjust the numbers to your needs in a range of 1-100
        let userVolume = 1 // volume by default when youtube page is loaded (currently set to 1%)       \


        const volumeSlider = document.querySelector('.ytp-volume-slider-handle') // to manage visual displayed position
        const divSliderRole = document.querySelector('.ytp-volume-panel') // to observe to adapt own volume variable value
        const slider = document.querySelector('.ytp-volume-slider') // slider that allow you to modify volume whith mouse 
        const video = document.querySelector('video')
        const toolbar = document.querySelector('.ytp-time-display')
        const muteBtn = document.querySelector('.ytp-mute-button')
        let checkSliderEventIsTrusted
        let checkMuteEventIsTrusted

        //----------------------------------------------------------------------------------button creation---------------------------------------------------------------------------------     

        let volumeBasebtn = document.createElement('button')
        volumeBasebtn.setAttribute('class', 'myBtn')
        volumeBasebtn.innerText = "min"

        toolbar.appendChild(volumeBasebtn)

        let volumeDownBtn = document.createElement('button')
        volumeDownBtn.setAttribute('class', 'myBtn1')
        volumeDownBtn.innerText = "-"

        toolbar.appendChild(volumeDownBtn)

        let volumeUpBtn = document.createElement('button')
        volumeUpBtn.setAttribute('class', 'myBtn2')
        volumeUpBtn.innerText = "+"

        toolbar.appendChild(volumeUpBtn)


        //---------------------------------------------------------------------------------Add style to buttons-----------------------------------------------------------------------------------      

        let style =
            `
        .myBtn,.myBtn1,.myBtn2 {
          color: white;
          font-weight: 600;
          line-height: normal;
          border: transparent;
          margin-left: 10px;
          cursor: pointer;
        }
       
        .myBtn{
          background: rgb(204, 0, 0);  
          padding: 0.2vw 0.3vw;
          border-radius: 25px;
          width: 2.2vw;
          min-width: 30px;
          font-size: clamp(12px, 0.7vw, 16px);
        }

       
        .myBtn1,.myBtn2 {
          background: rgb(85, 85, 85);
          padding: 0.2vw;
          border-radius: 50%;
          width: 1.6vw;
          max-width: 23px;
          min-width: 20px;
       }
       
       .myBtn:hover {
        background: rgb(172, 0, 0);
       }
       
       .myBtn1:hover,.myBtn2:hover{
        background: rgb(66, 66, 66);
       }
       
       .myBtn:active,.myBtn1:active,.myBtn2:active {
        transform: scale(0.95)
       }
       `
        GM_addStyle(style);


        //-----------------------------------------------------------------------FUNCTIONS---------------------------------------------------------------------------------

        // convert proportionally volume value into slider length
        function percentToRange(percent, min, max) {
            return ((max - min) * percent + min)
        }

        // since javascript has some troubles to properly return decimal operations value, this ternary does pretty good job to manage to convert values like: 0-100 to video volume format (eg : 0 / 0.05 / 0.47 / 1)
        function convertIntoDecimal(nb) {
            return nb === 100 ? 1 : nb < 100 && nb > 9 ? +`0.${nb}` : nb < 10 && nb > 0 ? +`0.0${nb}` : 0
        }

        function injectValues() {
            video.volume = convertIntoDecimal(userVolume)
            volumeSlider.style.left = `${percentToRange(video.volume, 0, 40)}px`
        }
        //---------------------------------------------------------------initialisation of volume value----------------------------------------------------------------------

        injectValues()

        //----------------------------------------------------------------------Event Listeners------------------------------------------------------------------------------

        volumeBasebtn.addEventListener('click', () => {
            if (muteBtn.getAttribute('title') == "Activer le son (m)") {
                muteBtn.dispatchEvent(new Event('click'))
            }

            // checkMuteEventIsTrusted = true
            video.volume = baseVolume / 100
            volumeSlider.style.left = `${percentToRange(video.volume, 0, 40)}px`
            userVolume = baseVolume
        })

        volumeDownBtn.addEventListener('click', () => {
            if (video.volume * 100 === 1) {
                userVolume -= volumeStep
                injectValues()
                muteBtn.dispatchEvent(new Event('click'))

            } else if (video.volume * 100 > 1) {
                userVolume -= volumeStep
                injectValues()
            }

        })

        volumeUpBtn.addEventListener('click', () => {
            if (video.volume === 0) {
                userVolume += volumeStep
                injectValues()
                muteBtn.dispatchEvent(new Event('click'))

            } else if (video.volume < 1) {
                userVolume += volumeStep
                injectValues()
            }

        })

        // allow mutationObserver to check if user trigger the event, if true you can use YT default controls ==> left click or mousewheel to set volume from slider,
        // it will set userVolume value equal to divSliderRole aria-valuenow attribute.
        slider.addEventListener('mousedown', e => {
            checkSliderEventIsTrusted = true
        })

        slider.addEventListener('mouseup', e => {
            checkSliderEventIsTrusted = false
        })

        slider.addEventListener('mouseover', e => {
            checkSliderEventIsTrusted = true
        })

        slider.addEventListener('mouseout', e => {
            checkSliderEventIsTrusted = false
        })


        //-------------------------------------------------------------MutationObservers-------------------------------------------------------

        const mutationObserver = new MutationObserver(mutations => {

            if (checkSliderEventIsTrusted) {
                //check if user use slider to ajust volume. Whitout this condition (with only code inside else), slider is blocked since the userVolume manages the values of video.volume and "length" of slider
                userVolume = +divSliderRole.getAttribute('aria-valuenow')

            } else {
                // when youtube try to change itself volume ===> execute code below
                console.log('aria-valunow mutation: ' + mutations)
                injectValues()
            }
        })
        // observe attribute aria-valuenow that manage current volume playing
        mutationObserver.observe(divSliderRole, { attributeFilter: ['aria-valuenow'] })


        const muteButtonObserver = new MutationObserver(mutations => {

            console.log('Mute button mutation : ' + mutations)
            // logic is : if mute button title change (which is observed) and slider length (managed by style attribute ==> "left: 0px") is equal to 0, meaning user if user set manually slider to 0
            // then execute code below. So if you click on plus button, it will start to 1% instead of divSliderRole "aria-valuenow" oldValue
            if (volumeSlider.getAttribute("style") === "left: 0px;") {
                userVolume = 0
                video.volume = 0
                volumeSlider.style.left = `${percentToRange(video.volume, 0, 40)}px`
            }
        })
        // observe title attribute of mute button that tell if muted or not
        muteButtonObserver.observe(muteBtn, { attributeFilter: ['title'] })
    })
}
