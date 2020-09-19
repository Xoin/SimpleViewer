class ComicDatabase {
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
    static GetSeries(name) {
        if (myMedia[name][0] != undefined) {
            return myMedia[name][0].Volumes;
        }
    }
    static GetSeriesSubs(name,sub = undefined) {
        if (sub != undefined)
        {
            if (myMedia[name][1] != undefined) {
                for (let index = 0; index < Object.keys(myMedia[name][1].Sub).length; index++) {
                    if (myMedia[name][1].Sub[index][sub][0].Series == sub) {
                        return myMedia[name][1].Sub[index][sub];
                    }
                }
            }
        }
        else {
            if (myMedia[name][1] != undefined) {
                return myMedia[name][1].Sub;
            }
        }
    }
    static GetVolume(name, volume) {
        var issub = false;
        if (name.indexOf('/') > 0) {
            issub = true;
        }

        if (issub) {
            var comic = name.split('/')[0];
            var sub = name.split('/')[1];
            if (myMedia[comic][1] != undefined) {
                for (let index = 0; index < Object.keys(myMedia[comic][1].Sub).length; index++) {
                    if (myMedia[comic][1].Sub[index][sub][volume].Series == sub) {
                        return myMedia[comic][1].Sub[index][sub][volume];
                    }
                }
            }
        }
        else {
            var comic = name;
            if (myMedia[comic][0] != undefined) {
                return myMedia[comic][0].Volumes[volume];
            }
        }
    }
}