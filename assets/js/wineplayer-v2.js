$(document).resize();

let videojson = 0;
let videojsonlen = 0
let videoindex = 0;
let video_seconds_duration = 0;

let playerIsInFullScreen = false;
let playVideo = false;
let currentTimeFromPercentage = 0;
let current_time = 0;

let video_formated_duration = 0;
let video_current_time = 0;
let percentage = 0;

let current_horas = '00';
let current_minutos = '00';
let current_segundos = '00';

let total_hours;
let total_minutes;
let total_seconds;

/*****************************************
 *  add a renderizer for the video player
 *****************************************/
setTimeout(setVideo,100);

function setVideo(){
    /*****************************************
     * get video list array fron json objtect
     *****************************************/
    let jqxhr = $.getJSON( "videos.json", function() {
        
    }).done(function(data) {
        
        /*****************
         * Loading video
         *****************/
        loadvideo();
        
        function loadvideo(){
            videojson = data['video'];
            setVideoVarSettings();
            setVideoOnHTML();
        }

        /***************************************************
         * Settings video time and video list configuration
         ***************************************************/
        function setVideoVarSettings(){
            videojsonlen = videojson.length;
            video_seconds_duration = videojson[videoindex].duration;
            video_formated_duration = moment.duration(video_seconds_duration, 'seconds');
        }

        /************************
         * Set the video on html 
         ************************/
        function setVideoOnHTML(){
            $('video').attr('src', videojson[videoindex].url); 
            $('video').attr('poster', videojson[videoindex].poster);
            $('.h1-title')[0].innerHTML = videojson[videoindex].name;
            /* se requiere controlar que videojson traiga los siguientes datos*/
            $('.h2-serie')[0].innerHTML = videojson[videoindex].serie;
            $('.h3-autor')[0].innerHTML = videojson[videoindex].autor;
            $('.h5-description')[0].innerHTML = videojson[videoindex].description
            $('.next-video-preview-image').attr('src',videojson[videoindex].nextVideo);
            $('.next-video-title')[0].innerHTML = videojson[videoindex].nextVideoName;
            $('.next-video-serie')[0].innerHTML = videojson[videoindex].serie;
            //$('.next-video-autor')[0].innerHTML = videojson[videoindex].autor;
            $('.next-video-total-time')[0].innerHTML = videojson[videoindex].nextVideoDuration;

            
            $('.previous-video-preview-image').attr('src',videojson[videoindex].previousVideo);
            $('.previous-video-title')[0].innerHTML = videojson[videoindex].previousVideoName;
            $('.previous-video-serie')[0].innerHTML = videojson[videoindex].serie;
            //$('.next-video-autor')[0].innerHTML = videojson[videoindex].autor;
            $('.previous-video-total-time')[0].innerHTML = videojson[videoindex].previousVideoDuration;
            /******************************************************************/
            $('video')[0].load();
        
            /**************
             * time format
             **************/
            total_hours = video_formated_duration.hours();
            total_minutes = video_formated_duration.minutes();
            total_seconds = video_formated_duration.seconds();

            if(video_formated_duration.hours() < 10) total_hours = '0' + video_formated_duration.hours();
            if(video_formated_duration.minutes() < 10) total_minutes = '0' + video_formated_duration.minutes(); 
            if(video_formated_duration.seconds() < 10) total_seconds = '0' + video_formated_duration.seconds();
        }

        /************************************
         * Video information loading and set
         ************************************/
        $('.fa-info-circle').click(function(){
            if($('.video-info').css('display') == 'none'){
                $('.video-info').css('display','block');
            }else{
                $('.video-info').css('display','none');
            }
        });

        /**
         * previous video preview
         */
        $('.fa-step-backward').mouseover(function(){
            if(videojson[videoindex].previousVideo!="" & screen.width > 850){
                $('.previous-video-preview-container').css('display','block');
            }
        });
        $('.fa-step-backward').mouseout(function(){
            $('.previous-video-preview-container').css('display','none');
        });

        /**
         * Next video preview
         */
        $('.fa-step-forward').mouseover(function(){
            if(videojson[videoindex].nextVideo!="" & screen.width > 850){
                $('.next-video-preview-container').css('display','block');
            }
        });

        $('.fa-step-forward').mouseout(function(){
            $('.next-video-preview-container').css('display','none');
        });

        /***************************************
         *  Video play state control
         ***************************************/
        $('.video-play').click(function(){
            letChangeVideoState();
        });

        $('video').click(function(){
            if(screen.width > 859){
                letChangeVideoState()
            }else{
                if($('.controls-container').css('display') == 'none'){
                    $('.controls-container').css('display','flex');
                    $('.controls-container-progress-bar').css('display','flex');
                }
                else{
                    $('.controls-container').css('display','none');
                    $('.controls-container-progress-bar').css('display','none');
                }
            }
        });

        /*************************************
         * Change play button to pause button
         *************************************/
        function letChangeVideoState(){
            if(!playVideo){
                $('.video-play').removeClass('fa-play');
                $('.video-play').addClass('fa-pause');
                playVideo = true;
                letPlayVideo('play');
            }else{
                $('.video-play').removeClass('fa-pause');
                $('.video-play').addClass('fa-play');
                playVideo = false;
                letPlayVideo('pause');
            }
        }

        /***********************
         * Play and Pause video
         ***********************/
        function letPlayVideo(playOption){
            $('video').trigger(playOption);
        }


        /*******************************
         * Video progress range control
         *******************************/
        $(document).on('input', '.video-progress', function() {
            currentTimeFromPercentage = $('video')[0].duration * $('.video-progress').val() / 100;
            $('video')[0].currentTime = currentTimeFromPercentage;
        });

        /*********************************************************************
         * video played changes (time and progress) and next video connection
         *********************************************************************/
        $('video').on('timeupdate', function(){
            current_time = $('video')[0].currentTime;
            percentage = (100 * current_time / video_seconds_duration);
            if(percentage == 'NaN%'){
                percentage = '2';
            }
            
            //$('.video-progress-bar').css('width',(parseFloat(percentage)*progressBarwidth)/100);
            document.getElementsByClassName('video-progress')[0].value = percentage;

            video_current_time = moment.duration(current_time, 'seconds');
            if(video_current_time.hours() < 10) current_horas = '0' + video_current_time.hours();
            else current_horas = video_current_time.hours();

            if(video_current_time.minutes() < 10) current_minutos = '0' + video_current_time.minutes();
            else current_minutos = video_current_time.minutes();

            if(video_current_time.seconds() < 10) current_segundos = '0'+ video_current_time.seconds();
            else current_segundos = video_current_time.seconds();
            
            $('.current-time').html('<b>'+current_horas+':'+current_minutos+':'+current_segundos);
            $('.total-time').html('<b>'+total_hours+':'+total_minutes+':'+total_seconds+'</b>');
        
            /********************************************
             * change the pause buton to play button 
             * change from video play status to poster 
             ********************************************/
            if($('video')[0].currentTime >= video_seconds_duration){
                if(videoindex<videojsonlen-1){
                    nextVideo();
                }else{
                    letChangeVideoState();
                    $('video')[0].load();
                }
            }
        });

        /*****************************************************************************
         * 10 SECONDS FORDWARD AND 10 SECONDS BACKWARD [wide screen & mobile screen]
         ****************************************************************************/
        $('.fa-undo-alt').click(function(){
            if($('video')[0].currentTime > 0){
                if($('video')[0].currentTime < 10){
                    $('video')[0].currentTime = 0
                }else{
                    $('video')[0].currentTime =$('video')[0].currentTime - 10
                }
            }
        });

        $('.fa-redo-alt').click(function(){
            if($('video')[0].duration - $('video')[0].currentTime < 10){
                $('video')[0].currentTime = $('video')[0].duration;
            }else{
                $('video')[0].currentTime =$('video')[0].currentTime + 10
            }
        });

        var lefttouchtime = 0;
        var lefttouchcount = 0;
        $(".mobile-10s-step-backward").on("click", function() {
            if(lefttouchcount < 2){
                setTimeout(function(){
                    if($('.controls-container').css('display') == 'none'){
                        $('.controls-container').css('display','flex');
                        $('.controls-container-progress-bar').css('display','flex');
                    }
                    else{
                        $('.controls-container').css('display','none');
                        $('.controls-container-progress-bar').css('display','none');
                    }
                    lefttouchcount = 0;
                },1000)
            }
            if (((new Date().getTime()) - lefttouchtime) < 500) {
                if($('video')[0].currentTime > 0){
                    if($('video')[0].currentTime < 10){
                        $('video')[0].currentTime = 0
                    }else{
                        $('video')[0].currentTime =$('video')[0].currentTime - 10
                    }
                }
                lefttouchcount += 1
                clearTimeout();
            }
            lefttouchtime = new Date().getTime();
        });

        var righttouchtime = 0;
        var righttouchcount = 0
        $(".mobile-10s-step-fordward").on("click", function() {
            console.log('hola');
            if(righttouchcount<2){
                setTimeout(function(){
                    if($('.controls-container').css('display') == 'none'){
                        $('.controls-container').css('display','flex');
                        $('.controls-container-progress-bar').css('display','flex');
                    }
                    else{
                        $('.controls-container').css('display','none');
                        $('.controls-container-progress-bar').css('display','none');
                    }
                    righttouchcount = 0;
                },1000);
            }
            if (((new Date().getTime()) - righttouchtime) < 500) {
                if($('video')[0].duration - $('video')[0].currentTime < 10){
                    $('video')[0].currentTime = $('video')[0].duration;
                }else{
                    $('video')[0].currentTime =$('video')[0].currentTime + 10
                }
                righttouchcount += 1
                clearTimeout();
            }
            righttouchtime = new Date().getTime();
        });



        /************************
         *  Video screen control
         ************************/
        $('.fa-expand').click(function(){
            var player = $('.wineplayer')[0];
            full_screen(player);
        });

        function full_screen(wineplayer){
            if(!playerIsInFullScreen){
                playerIsInFullScreen = true;
                if (wineplayer.requestFullscreen) {
                    wineplayer.requestFullscreen();
                } else if (wineplayer.mozRequestFullScreen) { /* Firefox */
                    wineplayer.mozRequestFullScreen();
                } else if (wineplayer.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    wineplayer.webkitRequestFullscreen();
                } else if (wineplayer.msRequestFullscreen) { /* IE/Edge */
                    wineplayer.msRequestFullscreen();
                }

                if(screen.width<850){
                    screen.orientation.lock('landscape');
                }

                // https://usefulangle.com/post/105/javascript-change-screen-orientation
                /*screen.orientation.lock("portrait")
                .then(function() {
                    console.log('Locked');
                })
                .catch(function(error) {
                    console.log(error);
                });*/
            }else {
                playerIsInFullScreen = false;
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                
                if(screen.width<850){
                    screen.orientation.unlock();
                }
            }
        }

        /****************************
         * Change to the next video
         ****************************/
        $('.fa-step-forward').click(function(){
            nextVideo();
            $('.next-video-preview-container').css('display','none');
        });

        function nextVideo(){
            videoindex = videoindex + 1;
            if(videoindex < videojsonlen){
                setVideoVarSettings();
                setVideoOnHTML();
                playVideo = false;
                letChangeVideoState();
                letPlayVideo('play');
            }else{
                videoindex--;
                $('video')[0].load();
            }
        }

        /*******************************
         * Change to the previews video
         *******************************/

        $('.fa-step-backward').click(function(){
            previousVideo();
            $('.previous-video-preview-container').css('display','none');
        });

        function previousVideo(){
            videoindex = videoindex - 1;
            if(videoindex < videojsonlen & videoindex >= 0){
                setVideoVarSettings();
                setVideoOnHTML();
                playVideo = false;
                letChangeVideoState();
                letPlayVideo('play');
            }else{
                videoindex++;
                $('video')[0].load();
                playVideo = false;
                letChangeVideoState();
                letPlayVideo('play');
            }
        }

    });


    /**
     * Volume control
     */
    $('.volume-icon').click(function(){
        var volume_control_display;
        if(screen.width<850){
            volume_control_display = '.mobile-screen-volume';
        }else{
            volume_control_display = '.wide-screen-volume';
        }
        if($('video')[0].volume > 0){
            $('video')[0].volume = 0;
            $(volume_control_display).removeClass('fa-volume-up');
            $(volume_control_display).addClass('fa-volume-slash');
        }else{
            $('video')[0].volume = 1;
            $(volume_control_display).removeClass('fa-volume-slash');
            $(volume_control_display).addClass('fa-volume-up');
        }

    });

    $('.fa-volume-slash').click(function(){
        $('video')[0].volume = 1;
    });

    /*
    progress para chrome
    https://jsfiddle.net/daltonrenaldo/4zxm7fw0/
    */


    /**
     * obtener valur de range al colocar puntero sobre el mismo
     * https://stackoverflow.com/questions/35631551/get-the-value-on-hover-of-an-input-type-range
     * esto servirá para obtener captura del video en dicha posición.
     */

    /**
     * SCREEN LOCK PARA MOBILES
     * https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Managing_screen_orientation
     */


    /**
     * DOUBLE CLICK FOR 10 SECONDS FORWARD
     * https://www.w3schools.com/jquery/event_dblclick.asp
     * https://stackoverflow.com/questions/27560653/jquery-on-double-click-event-dblclick-for-mobile
     */

}