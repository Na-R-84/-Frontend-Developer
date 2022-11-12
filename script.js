
allImagesCount =0;
(function (){

//API KEY :ngaubE4H2grY5udOG98pp7nUoLUc21kn
let apiTrendUrl =
  "https://api.giphy.com/v1/gifs/random?api_key=ngaubE4H2grY5udOG98pp7nUoLUc21kn";
// console.log(apiTrendUrl);
let containerRandomRef = document.querySelector(".product-container");

function showRefresh() {
  manageRefreshButton("visible");
}
function hideRefresh() {
  manageRefreshButton("hidden");
}
function manageRefreshButton(visibility) {
  var loader = document.querySelector(".refresh");
  loader.style.visibility = visibility;
}
//----------------------------
var isLoading = false;
function showLoading() {
    isLoading =true;
  manageLoading("flex");
  hideRefresh();
}
function hideLoading() {
    isLoading=false;
  manageLoading("none");
  showRefresh();
}
function manageLoading(display) {
 manageTagDisplay(".loader-container", display);
}
//----------------------------

function showPreview(){
    managePreview('flex');
}
function hidePreview(){
    managePreview('none');
}

function managePreview(display){
    manageTagDisplay('.preview', display);
}
//----------------------------


function manageTagDisplay(selector,dispaly) {
    var loader = document.querySelector(selector);
    loader.style.display = dispaly;
  }


 async function loadRandomImages() {
 
  let imagesCount = 1;
  showLoading();
  while (imagesCount <= 10) {
    var response = await fetch(apiTrendUrl);
    var result = await response.json();

   console.log({imagesCount});
    if (imagesCount >= 10) hideLoading();
  


    const img = result?.data?.images?.downsized;
    if(!img) continue;

    const figure = document.createElement("figure")
    figure.className ='product-card';

    let imgId = getImageId( ++allImagesCount);

    figure.innerHTML = `<img id=${imgId} src='${img.url}'>`;
    figure.onclick = () => showImagePreview(imgId);
    containerRandomRef.appendChild(figure);
    imagesCount++;
  }
}



document.querySelector('.refresh').onclick= refreshImages;
function refreshImages() {
  containerRandomRef.innerHTML = "";
  loadRandomImages();
}

loadRandomImages();

window.addEventListener('scroll', e => {

    const {
       scrollTop,
       clientHeight,
       scrollHeight 
    } = document.documentElement;

    if(scrollTop + clientHeight + 10 >= scrollHeight && !isLoading){
        loadRandomImages();
    }

})

function showImagePreview (imgId) {
  console.log({imgId});
    let imgNumber = parseInt(imgId.split('-')[1]);

    showImage(imgNumber, 'main-image');
    showImage(imgNumber -1, 'prev-image');
    showImage(imgNumber +1, 'next-image');

    showPreview();
}

function showImage(imgNumber, className){
    var img = getImage(imgNumber);
    const tag =  document.querySelector('.'+className);
    tag.innerHTML = "";
    if(!img)
    return;

    const imgToShow = document.createElement('img');

    imgToShow.onclick = () => showImagePreview(img.id);
    imgToShow.id = img.id;
    imgToShow.src = img.src;
   
   tag.appendChild(imgToShow);
}

function getImage(imgNumber){
    return document.querySelector(`#${getImageId(imgNumber)}`);
}

function getImageId(imgNumber){
  return `img-${imgNumber}`;
}

var closeBtn = document.querySelector( '.close' );


closeBtn.addEventListener( 'click', function() {
   hidePreview();
});

})();