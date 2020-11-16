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
        response = JSON.parse(response);
        Object.keys(response).reverse().forEach(function(key, index) {
            console.log(response[key]);
            galleryView(index, key, response[key]);
        })
    })

}

async function galleryView(weekNum, title, arr) {
    weekNum = weekNum + 1;
    var markup = `<div class="art__header">Week ${weekNum}: ${title}</div>
    <div class="art__container">`;
    for(var i = 0; i < arr.length; i++) {
        var row = arr[i];
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
                                            alt="${row.description}" class="art__img--preview">
                                    </div>
                                </div>
                            </label>
                        </div>`;
    }
    markup += `</div>`
    
    document.querySelector('.main__container').insertAdjacentHTML('afterbegin', markup);
}

if(document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    galleryController();
} else {
    document.addEventListener("DOMContentLoaded", galleryController);
}