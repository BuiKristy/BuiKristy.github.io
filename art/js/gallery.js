var weeks = [1, 2];

function getGallery(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://buikristy.github.io/art/js/pictures.json');
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
    };
    xobj.send(null);  
}

async function galleryController() {
    getGallery(function(response) {
        var json = JSON.parse(response);
        
        for(var i = 0; i < weeks.length; i++) {
            galleryView(weeks[i], json[weeks[i]]);
        }
    })

}

function galleryView(weekNum, json) {
    for(var i = 0; i < json.length; i++) {
    var markup =  `<div>
                        <input type="checkbox" id="art-${weekNum}-${i}">
                        <label for="art-${weekNum}-${i}">
                        <img src="${json.url}" 
                            alt="${json.description}" class="art--img">
                        </label>
                        <p>${json.name}</p>
        
                        <label for="art-${weekNum}-${i}">
                            <div id="cover-${weekNum}-${i}">
                                <div id="box-${weekNum}-${i}">
                                    <img src="${json.url}" 
                                        alt="${json.description}" class="">
                                </div>
                            </div>
                        </label>
                    </div>`;
    }

    // return markup;
}

if(document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    galleryController();
} else {
    document.addEventListener("DOMContentLoaded", galleryController);
}