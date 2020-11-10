var weeks = [1, 2, 3, 4, 5];
var titles = ["Favorite Pokemon", "Favorite Animal in an Unlikely Habitat", "Favorite Anime Character", "Flower of Your Choice", "Food or Favorite League Character"];

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
        for(var i = weeks.length - 1; i >= 0; i--) {
            galleryView(weeks[i], titles[i], JSON.parse(response)[weeks[i]]);
        }
    })

}

async function galleryView(weekNum, title, json) {
    console.log(json);
    var markup = `<div class="art__header">Week ${weekNum}: ${title}</div>
    <div class="art__container">`;
    for(var i = 0; i < json.length; i++) {
        var row = json[i];
        markup +=  `<div class="art-w-${weekNum}-${i}">
                            <input type="checkbox" id="art-w-${weekNum}-${i}">
                            <label for="art-w-${weekNum}-${i}">
                            <img src="${row.url}" 
                                alt="${row.description}" class="art__img">
                            </label>
                            <p>${row.name}</p>
            
                            <label for="art-w-${weekNum}-${i}">
                                <div id="cover-${weekNum}-${i}">
                                    <div id="box-${weekNum}-${i}">
                                        <img src="${row.url}" 
                                            alt="${row.description}" class="">
                                    </div>
                                </div>
                            </label>
                        </div>`;
    }
    markup += `</div>`
    
    document.querySelector('.container').insertAdjacentHTML('beforeend', markup);
    // return markup;
}

if(document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    galleryController();
} else {
    document.addEventListener("DOMContentLoaded", galleryController);
}