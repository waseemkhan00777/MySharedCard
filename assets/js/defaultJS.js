//sidebar
function openNav() {
    document.getElementById("mySidebar").style.left = "0";
    document.getElementById("myOverlay").style.display = "block";
}
function closeNav() {
    document.getElementById("mySidebar").style.left = "-320px";
    document.getElementById("myOverlay").style.display = "none";
}

//Back to top
if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}

//Smooth Scrolling
  $('.btnScroll').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 1000);
    return false;
  });
