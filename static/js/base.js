$(function () {

});

	//日期插件
    (function () {
        function DateTime(elem) {
            let date = new Date();
            let year = date.getFullYear();
            let Month = date.getMonth();
            switch (Month) {
                case 0:
                    Month = "Jan";
                    break;
                case 1:
                    Month = "Feb";
                    break;
                case 2:
                    Month = "Mar";
                    break;
                case 3:
                    Month = "Apr";
                    break;
                case 4:
                    Month = "May";
                    break;
                case 5:
                    Month = "Jun";
                    break;
                case 6:
                    Month = "Jul";
                    break;
                case 7:
                    Month = "Aug";
                    break;
                case 8:
                    Month = "Sept";
                    break;
                case 9:
                    Month = "Oct";
                    break;
                case 10:
                    Month = "Nov";
                    break;
                case 11:
                    Month = " Dec";
                    break;
                default:
                    ;
                    break
            }
            let day = date.getDate();
            day = day < 10 ? '0' + day : day;
            elem.html(`<b>${day}</b> ${Month} ${year}`);
        };
        new DateTime($("#intro .time"));
    }());


    //回到顶部
    (function () {

        $("#toTop").click(function (e) {

            e.stopPropagation();

            $('html,body').animate({
                scrollTop: 0
            });

        });

        //懒加载和回到顶部
        $(window).on("scroll", function () {
            if ($(document).scrollTop() > 200) {

                $("#toTop").stop().animate({
                    bottom: "1.2rem"
                }, 130);
            } else {

                $("#toTop").stop().animate({
                    bottom:"-4rem"
                }, 130);
            }


            function isShow(elem) {

                let imgLocation = elem.getBoundingClientRect();

                let mHeight = $(window).innerHeight();

                setTimeout(function () {
                    if (imgLocation.top < mHeight) {
                        elem.src = elem.dataset.src;
                    }
                }, 1000)


            }

            let imgList = Array.prototype.slice.call($("#main>article .image>img"), 0);
            for (let i of imgList) {
             isShow(i);
            }
        });
        $(window).trigger("scroll");




           //查询模拟触发功能

    $(".delete").on("click", function () {
      
        $(this).prev().val("");
        $(this).css("display", "none")
    });

    }());