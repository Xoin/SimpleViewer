var curretncomic = 0;
var url = window.location.href;
var hash = url.substring(url.indexOf("#") + 1);
var comic = HashInvent();
var baseurl = url.split('#')[0];
var databaselength = Object.keys(myMedia).length;
var databaselimit = 5;
var databaselimitold = 0;
var dual = false;
var title = "SimpleViewer"
var storagename = "SimpleViewer";
myStorage = window.localStorage
var comicid = 0;

class Settings {

}

class Storage {

}

function StoragCheck() {
    var currentstorage = JSON.parse(myStorage.getItem(storagename));
    return currentstorage;
}
function StorageGet(series, volume) {
    var returns;
    var currentstorage = JSON.parse(myStorage.getItem(storagename));
    if (currentstorage != undefined && currentstorage[series] != undefined) {
        for (let index = 0; index < currentstorage[series].length; index++) {
            if (currentstorage[series][index].volume == volume) {
                returns = { "series": currentstorage[series][index].series, "volume": currentstorage[series][index].volume, "page": currentstorage[series][index].page }
            }
        };
    }
    return returns;
}
function StorageRemove(series, volume, page) {
    var currentstorage = JSON.parse(myStorage.getItem(storagename));

    currentstorage[series].some(element => {
        if (element.volume == volume) {
            delete currentstorage[series][element.index];
        }
    });
    myStorage.setItem(storagename, JSON.stringify(currentstorage));
}
function StorageAdd(series, volume, page) {
    var currentstorage = JSON.parse(myStorage.getItem(storagename));
    if (currentstorage == undefined) {
        currentstorage = {};
        currentstorage[series] = [{ "volume": volume, "series": series, "page": page }];
    }
    else {
        if (currentstorage[series] == undefined) {
            currentstorage[series] = [{ "volume": volume, "series": series, "page": page }];
        }
        else {
            var exists = false;
            for (let index = 0; index < Object.keys(currentstorage[series]).length; index++) {
                if (currentstorage[series][index].volume == volume) {
                    currentstorage[series][index] = { "volume": volume, "series": series, "page": page };
                    exists = true;
                }
                else {
                }
            };
            if (exists == false) {
                currentstorage[series][Object.keys(currentstorage[series]).length] = { "volume": volume, "series": series, "page": page };
            }
        }
    }

    myStorage.setItem(storagename, JSON.stringify(currentstorage));
}

function HashInvent() {
    url = window.location.href;
    hash = url.substring(url.indexOf("#") + 1);
    var info;
    if (url == url.split('#')[0]) {
        result = {
            "comic": "index",
            "sub": "",
            "volume": 0,
            "page": 0
        }
    }
    else {
        var info = hash.split('!');
        info[0] = info[0].replace(/%20/g, ' ');
        info[3] = "";
        if (info[0].indexOf('/') > 0) {
            info[3] = info[0].split('/')[1];
            info[0] = info[0].split('/')[0];
        }
        result = {
            "comic": info[0],
            "sub": info[3],
            "volume": info[1],
            "page": info[2]
        }
    }
    return result;
}

function checkUrl(url, id, background = false) {
    var formats = ["jpg", "png", "gif"];
    var mainformat;

    var status;
    formats.some(element => {
        var request = new XMLHttpRequest();
        var targeturl = baseurl.replace('viewer.html', '') + url + "." + element;
        if (status != "OK") {
            fetch(targeturl)
                .then(function (response) {

                    if (response.ok) {
                        return response.statusText;
                    }
                }).then(function (statusText) {
                    if (statusText == "OK" && background == true) {
                        status = statusText;
                        var image = document.getElementById(id);
                        image.setAttribute("style", "background:url('" + targeturl + "') no-repeat;");
                    }
                    else if (statusText == "OK" && background == false) {
                        status = statusText;
                        var image = document.getElementById(id);
                        image.setAttribute("src", targeturl);
                    } else {
                        status = statusText
                    }
                }).catch(function (err) {
                });
        }
    });
    return status;
}

class PreviewComic {
    constructor(series, volume, currentpage, pages, name, cover, comicid, reading = false) {
        this.series = series;
        this.volume = volume;
        this.currentpage = currentpage;
        this.pages = pages;
        this.name = name;
        this.cover = cover;
        this.comicid = comicid;
        this.reading = reading;
        this.thumb = "";
        this.status = "";
    }
    Item() {
        var imageurl, format = "";
        var bookmark = StorageGet(this.series, this.volume);
        if (bookmark != undefined) {
            var status = "";
            if (bookmark.page == this.pages) {
                status = " done";
            }
            this.currentpage = bookmark.page;
        }
        if (this.name == "") {
            this.name = this.series + " #" + this.volume;
        }
        if (this.pages != 0) {
            if (this.reading == true) {
                return Template.Get("Reading", this.comicid, this.thumb, this.series, this.volume, 1, this.currentpage, this.pages, this.series, this.volume, this.currentpage, this.name.replace('/', "<br>"));
            } else {
                return Template.Get("Preview", this.comicid, this.thumb, this.series, this.volume, this.currentpage, this.currentpage, this.pages, this.series, this.volume, this.name.replace('/', "<br>"));
            }

        }
    }
}

function ComicItem(series, volume, currentpage, pages, name, cover, comicid, reading = false) {

    return result;
}


function Build() {
    var imageindex = [];
    if (comic.comic == "index") {
        window.document.title = title + "- Index";
        var navy = document.getElementById("navy");
        navy.setAttribute("class", "nav navhide");
        var listhtml = "";
        var reading = [];
        var list = [];
        if (databaselimitold == 0 && StoragCheck() != null) {
            var data = StoragCheck();
            list[list.length] = Template.Get("Title", "Reading:");
            for (let index = 0; index < Object.keys(data).length; index++) {
                for (let index2 = 0; index2 < data[Object.keys(data)[index]].length; index2++) {
                    var storedcomic = data[Object.keys(data)[index]][index2];
                    var Comics = ComicDatabase.GetVolume(storedcomic.series, storedcomic.volume);
                    if (Comics != undefined) {
                        var Readingcomic = new PreviewComic(storedcomic.series, Comics.volume, Comics.currentpage, Comics.pages, Comics.name, Comics.cover, "comic_" + comicid, true);
                        if (storedcomic.page != Comics.pages) {
                            reading[reading.length] = Readingcomic.Item();
                            imageindex[imageindex.length] = { "series": storedcomic.series, "volume": Comics.volume, "cover": Comics.cover, "id": "comic_" + comicid }
                        }
                        comicid++;
                    }
                }
            }
            list[list.length] = Template.Get("PreviewSet", reading);
        }
        for (let index = databaselimitold; index < databaselimit; index++) {
            const Series = Object.keys(myMedia)[index];
            var tempseries = [];
            list[list.length] = Template.Get("Title", Series);
            var Comic = ComicDatabase.GetSeries(Series);
            for (var Vol in Comic) {
                Vol = Comic[Vol];
                if (Vol.pages > 0) {
                    var Readingcomic = new PreviewComic(Vol.Series, Vol.volume, Vol.currentpage, Vol.pages, Vol.name, Vol.cover, "comic_" + comicid, false);
                    if (Readingcomic != undefined) {
                        tempseries[tempseries.length] = Readingcomic.Item();
                        imageindex[imageindex.length] = { "series": Vol.Series, "volume": Vol.volume, "cover": Vol.cover, "id": "comic_" + comicid }
                        comicid++;
                    }
                }
            }
            list[list.length] = Template.Get("PreviewSet", tempseries);
            var tempseries = [];
            var ComicSub = ComicDatabase.GetSeriesSubs(Series);
            if (ComicSub != undefined) {
                for (var Sub in ComicSub) {
                    for (const Subs in Object.keys(ComicSub[Sub])) {
                        const element = ComicSub[Sub][Object.keys(ComicSub[Sub])[Subs]];
                        tempseries[tempseries.length] = Template.Get("Title2", element[0].Series);
                        for (let SubComic = 0; SubComic < element.length; SubComic++) {
                            if (element[SubComic].pages > 0) {
                                var Readingcomic = new PreviewComic(Series + "/" + element[SubComic].Series, element[SubComic].volume, element[SubComic].currentpage, element[SubComic].pages, element[SubComic].name, element[SubComic].cover, "comic_" + comicid, false);
                                if (Readingcomic != undefined) {
                                    tempseries[tempseries.length] = Readingcomic.Item();
                                    imageindex[imageindex.length] = { "series": Series + "/" + element[SubComic].Series, "volume": element[SubComic].volume, "cover": element[SubComic].cover, "id": "comic_" + comicid }
                                    comicid++;
                                }
                            }
                        }
                    }
                }
            }
            list[list.length] = Template.Get("PreviewSet", tempseries);
        }

        Template.Write("list", list);
        for (let index = 0; index < imageindex.length; index++) {
            const element = imageindex[index];
            imageurl = "";
            if (imageindex[index].cover == 0) {
                imageurl = "Thumb/Comics/" + imageindex[index].series + "/" + imageindex[index].volume + "/" + 1 + "_thumb";
            }
            else {
                imageurl = "Thumb/Comics/" + imageindex[index].series + "/" + imageindex[index].volume + "/" + imageindex[index].cover + "_thumb";
            }
            checkUrl(imageurl, imageindex[index].id, true);
        }
    } else {
        if (dual == true) {
            var image = document.getElementById("image");
            image.setAttribute("class", "dual");
        }
        comic = HashInvent();
        if (comic.sub != "") {
            if (comic.page > 1) {
                StorageAdd(comic.comic + "/" + comic.sub, comic.volume, comic.page);
            }
            ComicViewer(comic.comic + "/" + comic.sub, comic.volume, comic.page);
            window.document.title = title + "- " + comic.comic + " / " + comic.sub + " - page " + comic.page;
        }
        else {
            if (comic.page > 1) {
                StorageAdd(comic.comic, comic.volume, comic.page);
            }

            ComicViewer(comic.comic, comic.volume, comic.page);
            window.document.title = title + "- " + comic.comic + " - page " + comic.page;
        }
    }
}
var previousPosition = window.pageYOffset || document.documentElement.scrollTop;
window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY + 600) >= document.body.offsetHeight) {
        comic = HashInvent();
        if (comic.comic == "index") {
            if (databaselimit + 1 <= databaselength) {
                databaselimitold = databaselimit;
                databaselimit += 1;
                Build();
            }
        }
    }
};
function ComicViewer(imageset, volume, pageselected) {
    var imageprev = document.getElementById("imageprev");
    var imagecurrent = document.getElementById("imagecurrent");
    imagecurrent.scrollIntoView();
    var currentsecond = document.getElementById("currentsecond");
    var imagenext = document.getElementById("imagenext");
    var comictile = document.getElementById("title");
    var comicpage = document.getElementById("progress");
    var imageurl, format;
    var storedcomic = ComicDatabase.GetVolume(comic.comic, comic.volume);
    if (comic.sub != "") {
        storedcomic = ComicDatabase.GetVolume(comic.comic + "/" + comic.sub, comic.volume);
    }
    if (parseInt(comic.page) - 1 > 0) {
        imageurl = "Comics/" + imageset + "/" + volume + "/" + (parseInt(pageselected) - 1);
        checkUrl(imageurl, "imageprev");
    }
    imageurl = "Comics/" + imageset + "/" + volume + "/" + (parseInt(pageselected));
    checkUrl(imageurl, "imagecurrent");
    if (dual == true) {
        imageurl = "Comics/" + imageset + "/" + volume + "/" + (parseInt(pageselected) + 1);
        checkUrl(imageurl, "currentsecond");
        if (parseInt(comic.page) + 2 < storedcomic.pages) {
            imageurl = "Comics/" + imageset + "/" + volume + "/" + (parseInt(pageselected) + 2);
            checkUrl(imageurl, "imagenext");
        }
    }
    else {
        if (parseInt(comic.page) + 1 < storedcomic.pages) {
            imageurl = "Comics/" + imageset + "/" + volume + "/" + (parseInt(pageselected) + 1);
            checkUrl(imageurl, "imagenext");
        }
    }
    comictile.innerHTML = storedcomic.Series + " " + storedcomic.volume + " " + storedcomic.name;
    comicpage.innerHTML = + comic.page + " / " + storedcomic.pages;
    var navy = document.getElementById("navy");
    navy.setAttribute("class", "nav");

}
function ComicClear() {
    comic = HashInvent();
    var imageprev = document.getElementById("imageprev");
    var imagecurrent = document.getElementById("imagecurrent");
    var currentsecond = document.getElementById("currentsecond");
    var imagenext = document.getElementById("imagenext");
    var comictile = document.getElementById("title");
    var comicpage = document.getElementById("progress");
    imageprev.setAttribute("src", "/");
    imagecurrent.setAttribute("src", "/");
    currentsecond.setAttribute("src", "/");
    imagenext.setAttribute("src", "/");
    comictile.innerHTML = "";
    comicpage.innerHTML = "";
    var comicid = 0;
}

//https://keycode.info/
document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 37) {
        NavPrev();
    }
});

document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 39) {
        NavNext();
    }
});


document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 32) {
        NavHome();
    }
});

function NavNext() {
    comic = HashInvent();
    var storedcomic = ComicDatabase.GetVolume(comic.comic, comic.volume);
    if (comic.sub != "") {
        storedcomic = ComicDatabase.GetVolume(comic.comic + "/" + comic.sub, comic.volume);
    }
    if (parseInt(comic.page) + 1 <= storedcomic.pages) {
        if (comic.sub == "") {
            history.pushState(null, null, baseurl + "#" + comic.comic + "!" + comic.volume + "!" + (parseInt(comic.page) + 1));
        }
        else {
            history.pushState(null, null, baseurl + "#" + comic.comic+"/"+ comic.sub + "!" + comic.volume + "!" + (parseInt(comic.page) + 1));
        }
        //window.location.reload();
        Build();
    }
    else {
        if (ComicDatabase.GetVolume(comic.comic, (parseInt(comic.volume) + 1)) != undefined) {
            if (comic.sub == "") {
                history.pushState(null, null, baseurl + "#" + comic.comic + "!" + (parseInt(comic.volume) + 1) + "!" + (parseInt(1)));
            }
            else {
                history.pushState(null, null, baseurl + "#" + comic.comic+"/"+ comic.sub + "!" + (parseInt(comic.volume) + 1) + "!" + (parseInt(1)));
            }
            comic = HashInvent();
            window.location.reload();
            Build();
        }
    }
}
function NavPrev() {
    comic = HashInvent();
    var storedcomic = ComicDatabase.GetVolume(comic.comic, (parseInt(comic.volume) - 1));
    if (comic.sub != "") {
        storedcomic = ComicDatabase.GetVolume(comic.comic + "/" + comic.sub, (parseInt(comic.volume) - 1));
    }
    if (parseInt(comic.page) - 1 > 0) {
        if (comic.sub == "") {
        history.pushState(null, null, baseurl + "#" + comic.comic + "!" + comic.volume + "!" + (parseInt(comic.page) - 1));
        }
        else {
            history.pushState(null, null, baseurl + "#" + comic.comic+"/"+ comic.sub + "!" + comic.volume + "!" + (parseInt(comic.page) - 1));
        }
        //window.location.reload();
        Build();
    }
    else {
        if (storedcomic.volumes - 1 != undefined && storedcomic.pages > 0) {
            if (comic.sub == "") {
                history.pushState(null, null, baseurl + "#" + comic.comic + "!" + (parseInt(comic.volume) - 1) + "!" + storedcomic.pages);
            }
            else {
                history.pushState(null, null, baseurl + "#" + comic.comic+"/"+ comic.sub + "!" + (parseInt(comic.volume) - 1) + "!" + storedcomic.pages);
            }
            
            comic = HashInvent();
            window.location.reload();
            Build();
        }
    }
}
function NavHome() {
    ComicClear();
    history.pushState(null, null, baseurl);
    comic = HashInvent();
    databaselimit = 3;
    databaselimitold = 0;
    window.scrollTo(0, 0);
    Build();
}
function DoublePage() {
    if (dual == true) {
        dual = false
    }
    else {
        dual = true
    }
    comic = HashInvent();
    Build();
    window.scrollTo(0, 0);
}

function Link(linkcomic, linkvolume, linkpage) {
    history.pushState(null, null, baseurl + "#" + linkcomic + "!" + linkvolume + "!" + (parseInt(linkpage)));
    var list = document.getElementById("list");
    list.innerHTML = "";
    var navy = document.getElementById("information");
    navy.setAttribute("class", "information hide");
    window.scrollTo(0, 0);
    comic = HashInvent();
    databaselimit = 3;
    databaselimitold = 0;
    Build();
}

function LinkView(linkcomic, linkvolume) {
    data = [];
    selectedcomic = ComicDatabase.GetVolume(linkcomic, linkvolume);
    if (selectedcomic.cover == 0) {
        imageurl = "Comics/" + linkcomic + "/" + selectedcomic.volume + "/" + 1;
    }
    else {
        imageurl = "Comics/" + linkcomic + "/" + selectedcomic.volume + "/" + selectedcomic.cover;
    }
    checkUrl(imageurl, "comicbig", false);
    var comicbig = document.getElementById("comicbig");
    comicbig.setAttribute("onclick", "Link('" + linkcomic + "','" + linkvolume + "','1')");
    var navy = document.getElementById("information");
    navy.setAttribute("class", "information");
    var comicinfo = document.getElementById("comicinfo");
    comicinfo.innerHTML = "";
    //
    if (selectedcomic.name == "") {
        data[data.length] = Template.Get("Title3", selectedcomic.Series + " #" + selectedcomic.volume);
    }
    else {
        data[data.length] = Template.Get("Title3", selectedcomic.name);
    }
    //
    data[data.length] = Template.Get("Info", "Series", linkcomic.split('/')[0]);
    data[data.length] = Template.Get("Info", "Volume", selectedcomic.volume);
    data[data.length] = Template.Get("Info", "Pages", selectedcomic.pages);
    Template.Write('comicinfo', data);
}

var NavPrevB, NavNextB, NavHomeB, refreshlinkB, DoublePageB, buttoncloseB;
document.addEventListener("DOMContentLoaded", function (event) {
    Build();
    NavPrevB = document.getElementById("NavPrev");
    NavNextB = document.getElementById("NavNext");
    NavHomeB = document.getElementById("NavHome");
    DoublePageB = document.getElementById("DoublePage");
    refreshlinkB = document.getElementById("refreshlink");
    buttoncloseB = document.getElementById("buttonclose");

    NavPrevB.onclick = function () {
        NavPrev();
    }

    NavNextB.onclick = function () {
        NavNext();
    }

    NavHomeB.onclick = function () {
        NavHome();
    }
    DoublePageB.onclick = function () {
        DoublePage();
    }
    buttoncloseB.onclick = function () {
        var navy = document.getElementById("information");
        navy.setAttribute("class", "information hide");
    }
});