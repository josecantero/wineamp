$(document).ready(function(){
    $('.wineplayer')[0].innerHTML = 
        '<video  poster="" >'+
            '<source src="">'+
        '</video>'+
        '<div class="center-controls">'+
            '<img class="nextVideoPoster" src="">'+
            '<span class="regresive-counter">5</span>'+
            '<div class="preloader"></div>'+
        '</div>'+
        '<div class="mobile-10s-step-backward">'+
        '</div>'+
        '<div class="mobile-10s-step-fordward">'+
        '</div>'+
        '<div class="video-info">'+
            '<div class="title">'+
                '<h4>You are watching</h4>'+
                '<h1 class="h1-title"></h1>'+
                '<h2 class="h2-serie"></h2>'+
                '<h3 class="h3-autor"></h3>'+
                '<h5 class="h5-description"></h5>'+
            '</div>'+
        '</div>'+
        '<div class="next-video-preview-container">'+
            '<div class="next-video-preview-col-1">'+
                '<img src="" class="next-video-preview-image" alt="">'+
            '</div>'+
            '<div class="next-video-preview-col-2">'+
                '<h1 class="next-video-title">Title</h1>'+
                '<h2 class="next-video-serie">Serie</h2>'+
                '<span class="next-video-total-time">00:00:00</span>'+
            '</div>'+
        '</div>'+
        '<div class="previous-video-preview-container">'+
            '<div class="previous-video-preview-col-1">'+
                '<img src="" class="previous-video-preview-image" alt="">'+
            '</div>'+
            '<div class="previous-video-preview-col-2">'+
                '<h1 class="previous-video-title">Title</h1>'+
                '<h2 class="previous-video-serie">Serie</h2>'+
                '<span class="previous-video-total-time">00:00:00</span>'+
            '</div>'+
        '</div>'+
        '<div class="center-controls">'+
            '<div class="controls-container-progress-bar">'+
                '<div>'+
                    '<input type="range" class="video-progress" min="0" max="100" value="0" step="0.1">'+
                '</div>'+
            '</div>'+
            '<div class="controls-container">'+
                '<div class="play-controls">'+
                    '<i class="fas fa-step-backward"></i>'+
                    '<i class="fas fa-play video-play"></i>'+
                    '<i class="fas fa-step-forward"></i>'+
                    '<span class="backward-ten">10</span>'+
                    '<i class="far fa-undo-alt"></i>'+
                    '<span class="forward-ten">10</span>'+
                    '<i class="far fa-redo-alt"></i>'+
                    '<i class="far fa-volume-up volume-icon wide-screen-volume"></i>'+
                    '<span class="total-time">00:00:00</span>'+
                    '<span class="time-separation"> - </span>'+
                    '<span class="current-time">00:00:00</span>'+
                '</div>'+
                '<div class="screen-controls">'+
                    '<i class="far fa-volume-up volume-icon mobile-screen-volume"></i>'+
                    '<i class="far fa-info-circle"></i>'+
                    '<i class="fad fa-stream"></i>'+
                    '<i class="fas fa-cog"></i>'+
                    '<i class="fal fa-closed-captioning"></i>'+
                    '<i class="fas fa-expand"></i>'+
                '</div>'+
            '</div>'+
        '</div>'
});
