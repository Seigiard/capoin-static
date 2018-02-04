var ls = ls || {};

ls.beautypo = ( function ($) {
    this.getVkIframe = function(link){
        return '<iframe src="'+link+'" frameborder="0"></iframe>';
    }

    this.getYoutubeIframe = function(id){
        return '<iframe type="text/html" width="640" height="385" src="http://www.youtube.com/embed/'+id+'?wmode=opaque&amp;showsearch=0&amp;rel=0&amp;iv_load_policy=3&amp;controls=2&amp;autohide=1&amp;autoplay=1" frameborder="0">';
    }

    this.getVimeoIframe = function(id){
        return '<iframe src="http://player.vimeo.com/video/'+id+'?autoplay=1" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
    }

    this._parseHref = function(href) {
        var a = document.createElement('a');
        a.href = href;
        var url = new Object();

        url["href"] = a.href; // 'http://site.ru/page/123?foo=bar#top'
        url["protocol"] = a.protocol; // 'http:'
        url["host"] = a.host; // 'site.ru'
        url["pathname"] = a.pathname; // '/page/123'
        url["search"] = ls.beautypo._parseQueryString(a.search); // '?foo=bar'
        url["hash"] = a.hash; // '#top'
        return url;
    }

    this._parseQueryString = function(query, groupByName) {
        if (typeof query != 'string') {
            throw 'Ivalid input';
        }

        var parsed = {},
            hasOwn = parsed.hasOwnProperty,
            query = query.substring(1).replace(/\+/g, ' '),
            pairs = query.split(/[&;]/);

        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].match(/^([^=]*)=?(.*)/);
            if (pair[1]) {
                try {
                    var name  = decodeURIComponent(pair[1]);
                    var value = decodeURIComponent(pair[2]);
                } catch(e) {
                    throw 'Invaid %-encoded sequence';
                }

                if (!groupByName) {
                    parsed[name] = value;
                } else if (hasOwn.call(parsed, name)) {
                    parsed[name].push(value);
                } else {
                    parsed[name] = [value];
                }
            }
        }
        return parsed;
    }

    this.getIframe = function(service, id){
        switch(service)
        {
            case "youtube":
                return '<iframe width="640" height="385" src="http://www.youtube.com/embed/'+id+'?wmode=opaque&amp;showsearch=0&amp;rel=0&amp;iv_load_policy=3&amp;controls=2&amp;autohide=1&amp;autoplay=1" frameborder="0" allowfullscreen scrolling="no"></iframe>';
                break;
            case "vimeo":
                return '<iframe src="http://player.vimeo.com/video/'+id+'?autoplay=1&amp;wmode=opaque" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen scrolling="no"></iframe>';
                break;
            case "rutube":
                return '<iframe src="http://rutube.ru/video/embed/'+id+'?wmode=opaque" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen scrolling="no"></iframe>';
                break;
        }
    }

    return this;
}).call(ls.beautypo || {}, jQuery);

$(function() {
    $(".player--video-youtube > a").click(function(e){
        e.preventDefault();
        var link = $(this);
        var url = ls.beautypo._parseHref(link.attr("href"));
        link.after(ls.beautypo.getIframe("youtube", url.search.v)).fadeOut("slow");
        $(".player--video a").not(this).fadeIn("fast").next("iframe").remove();
    });

    $(".player--video-vimeo > a").click(function(e){
        e.preventDefault();
        var link = $(this);
        var url = ls.beautypo._parseHref(link.attr("href"));
        link.after(ls.beautypo.getIframe("vimeo", url.pathname.substring(1))).fadeOut("slow");
        $(".player--video a").not(this).fadeIn("fast").next("iframe").remove();
    });

    $(".player--video-rutube > a").click(function(e){
        e.preventDefault();
        var link = $(this);
        var url = ls.beautypo._parseHref(link.attr("href"));
        link.after(ls.beautypo.getIframe("rutube", url.pathname.replace("/tracks/","").replace(".html",""))).fadeOut("slow");
        $(".player--video a").not(this).fadeIn("fast").next("iframe").remove();
    });
 });



$(function() {
    $('.fotorama').each(function(i,el){
        var el = $(el);
        var count = $("img",el).length;
        $("img",el).each(function(i,img){
            var img = $(img);
            var a = document.createElement('a');
            img.attr("alt", img.attr("alt")
                ? '<small class="">'+(i+1)+'/'+count+'</small>'+img.attr("alt")
                : '<small class="lonely">'+(i+1)+'/'+count+'</small>'
            );

            a.href = img.attr("src");
            if(a.host == location.host && a.pathname.indexOf("_original.jpg") > 7){
                if(UrlExists(a.href.replace("_original.jpg","_preview.jpg"))){
                    img.attr("src", a.href.replace("_original.jpg","_preview.jpg")).wrap(a);
                }
            }
        });
    });
    $('.fotorama').fotorama({
        width:          "100%"
        ,background:    "#FAFEF9"
        ,nav:           "thumbs" // thumbs|dots|none
        ,navPosition:   "bottom" // top|bottom
        ,caption:       "overlay"
        ,thumbSize:     "100"
        // ,thumbMargin:   0
        // ,dotColor:      ""
        ,loop:          true
        ,zoomToFit:     true
        ,minPadding:    0
    });
});