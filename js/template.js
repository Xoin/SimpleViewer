SiteTemplate = {
    "Reading": '<div id="%1%" class="preview" style="background:url(\'%2%\') no-repeat;">' +
        '<div class="pages" onclick="Link(\'%3%\',\'%4%\',\'%5%\');">%6%/%7%</div>' +
        '<div class="hitbox" onclick="Link(\'%8%\',\'%9%\',\'%10%\');"></div>' +
        '<div class="previewtext">%11%</div>' +
        '</div>',
    "Preview": '<div id="%1%" class="preview" style="background:url(\'%2%\') no-repeat;">' +
        '<div class="pages" onclick="Link(\'%3%\',\'%4%\',\'%5%\');">%6%/%7%</div>' +
        '<div class="hitbox" onclick="LinkView(\'%8%\',\'%9%\');"></div>' +
        '<div class="previewtext">%10%</div>' +
        '</div>',
    "PreviewSet": '<div class="previewset">' +
        '%1%' +
        '</div>',
    "Title": '<h1>%1%</h1>',
    "Title2": '<h2>%1%</h2>',
    "Title3": '<div style="font-size: 2em;">%1%</h2>',
    "Info": '<b>%1%:</b> %2%<br>'
}

class Template {
    static Get() {
        var output;
        output = SiteTemplate[arguments[0]]
        for (let i = 1; i < arguments.length; i++) {
            var regex = "%" + i + "%";
            if (arguments[i].constructor.name == "Array") {
                var data = "";
                for (let x = 0; x < arguments[i].length; x++) {
                    data += arguments[i][x];
                }

                output = output.replace(regex, data);
            } else {
                output = output.replace(regex, arguments[i]);
            }
        }
        return output;
    }
    static Write(id, html, add = false) {
        var list = document.getElementById(id);
        if (html.constructor.name == "Array") {
            if (add == true) {
                list.innerHTML = "";
            }
            for (let index = 0; index < html.length; index++) {
                list.innerHTML += html[index];
            }

        } else {
            if (add == true) {
                list.innerHTML += html;
            }
        }
    }
}
