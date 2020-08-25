$(window).on("load",function(){
    let playlistshowed = false;
    let vidInformationShowed = false;
    let video = $('video')[0];

    $(window).resize(function(){
        //$('video').attr('src','#')
    });

    
    $('.info-slideshow').click(function(){
        if(!vidInformationShowed){
            console.log(1);
            $('.vid-information').removeClass('vid-information-hided');
            $('.vid-information').removeClass('vid-information-hide'); 
            $('.vid-information').addClass('vid-information-show');
            $('.info-slider').removeClass('fa-chevron-right');
            $('.info-slider').addClass('fa-chevron-left');
            vidInformationShowed = true;
        }else{      
            $('.vid-information').removeClass('vid-information-show');
            $('.vid-information').addClass('vid-information-hide');              
            $('.info-slider').removeClass('fa-chevron-left')
            $('.info-slider').addClass('fa-chevron-right')
            vidInformationShowed = false;
        }
    });

    $('.playlist-slider').click(function(){
        if(!playlistshowed){
            $('.scrolling-wrapper').removeClass('scrolling-wrapper-hided');
            $('.scrolling-wrapper').removeClass('scrolling-wrapper-hide');
            $('.scrolling-wrapper').addClass('scrolling-wrapper-show');
            $('.playlist-slider').removeClass('fa-chevron-up');
            $('.playlist-slider').addClass('fa-chevron-down');
            playlistshowed = true;
        }else{
            $('.playlist-slider').removeClass('fa-chevron-down');
            $('.playlist-slider').addClass('fa-chevron-up');
            $('.scrolling-wrapper').removeClass('scrolling-wrapper-show');
            $('.scrolling-wrapper').addClass('scrolling-wrapper-hide');
            playlistshowed = false;
        }
    });

    $('.pip').click(function(){
        // https://filisantillan.com/blog/picture-in-picture/
        try{
            video.requestPictureInPicture();
        }catch(error){
            
        }
        
    });
    
});