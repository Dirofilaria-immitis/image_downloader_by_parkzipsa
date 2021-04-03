function checphp(){
  var imgs = document.querySelectorAll("img");
  var countimage = imgs.length;

  for (var j = 0; j < countimage; j++) {
    var testphp = imgs[j].src;
    var checkingphp = /dcimg/;
    var found = testphp.match(checkingphp);
    if(found){
      var founded = "PHP images found"
    }
    }
    return founded
}

window.onload = async () => {
    let [tab1] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab1.id)
    chrome.scripting.executeScript({
      target: { tabId: tab1.id },
      function: checphp,  //사진 선택 로직 함수
    }, function(result){
      for(const frameResult of result){
        var changecolor = frameResult.result
        if(frameResult.result = changecolor){
         document.getElementById("alarm").setAttribute('value', frameResult.result)
         document.getElementById("alarm").style.color = "#f8f1f1";
         document.getElementById("alarm").style.backgroundColor = "#11698e";
       } else{
         document.getElementById("alarm").setAttribute('value', "PHP images not found")
         document.getElementById("alarm").style.color = "#6f9eaf";
       }
      }
    });
  };
  //php 이미지 감지



let letsgo = document.getElementById("download");  //일반 이미지 다운로드 버튼에 할당됨
let letsgophp = document.getElementById("downloadphp");  // PHP 이미지 다운로드 버튼에 힐당됨


function downloadSizeProto(){


             var imgs = document.querySelectorAll("img");
             var countimage = imgs.length;
             var imgSrcs = [];

                 for (var j = 0; j < countimage; j++) {
                if(imgs[j].width <100 || imgs[j].height<100) continue;
                   imgSrcs.push(imgs[j].src);
                   }  //normal image


                if(document.getElementsByTagName('iframe')){
                  var takeiframe = document.getElementsByTagName('iframe');
                  var iframelength = takeiframe.length
                  var finalurl = []
                  for(var i = 0; i<iframelength; i++){
                    var iframeimg = takeiframe[i].contentWindow.document.querySelectorAll("img");
                    var iframeimglength = iframeimg.length;
                    var iframeimgSrcs = [];
                    for(var v = 0; v < iframeimglength; v++){
                      var iframegetimgSrcs = iframeimg[v].src;
                      if(iframeimg[v].width <200 || iframeimg[v].height<200) continue;
                      iframeimgSrcs.push(iframegetimgSrcs);
                    }
                    var fifinalurl = finalurl.concat(iframeimgSrcs);
                  }
                }   //iframe image


                  var done = imgSrcs.concat(fifinalurl);
                  return done;


          }  //images, iframe images

function downloadSizeProtoPHP(){


            var imgsx = document.querySelectorAll("img");
            var countimage = imgsx.length;
               for (var k=0; k<countimage; k++) {
                 var testphpx = imgsx[k].src;
                 var checkingphpx = /php/;
                 var found = testphpx.match(checkingphpx);
                 if(found){
                   window.open(testphpx);
                 }
               }   //php image. url을 extension으로 올려서 하는 방법은 에러가 나는데, 이 상태로는 php 이미지가 있으면 그것만 받고 끝나버린다.
                   // 일단 이대로 쓰고 나중에 php 배우고 수정할 것. 그래도 iframe 이슈는 해결했으니..
         }   //php images



letsgo.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: downloadSizeProto,  //사진 선택 로직 함수
    }, function(result){
      for(const frameResult of result){
        console.log(frameResult.result)
        for (var i = 0; i < frameResult.result.length; i++) {
          if(frameResult.result[i].match(/php/)) continue
          chrome.downloads.download({
                   url: frameResult.result[i]
                 });
            };
      }
    });
  });  //일반 이미지 다운로드


letsgophp.addEventListener("click", async () => {
    let [tab2] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab2.id },
      function: downloadSizeProtoPHP,  //사진 선택 로직 함수
    }, function(result){
      for(const frameResult of result){
        console.log(frameResult.result)
      }
    });
  });  // PHP 이미지 다운로드



chrome.commands.onCommand.addListener(async function(command) {
  console.log('Command:', command);
  let [tab3] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab3.id },
    function: downloadSizeProto,  //사진 선택 로직 함수
  }, function(result){
    for(const frameResult of result){
      console.log(frameResult.result)
      for (var i = 0; i < frameResult.result.length; i++) {
        chrome.downloads.download({
                 url: frameResult.result[i]
               });
          };
    }
  });
}); //단축키: command + shift + z







// var test = document.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByTagName("img")[0];
// iframe 이슈 해결 코드

////////////////////////////////////////////////prototype////////////////////////////////////////////////



         //  chrome.tabs.executeScript({
         //    code: 'document.querySelector("img").src'
         //  }, function (result) {
         //       url = result[0];
         //          ////////////////////////이게 핵심!!!!!!!!! url = result[0]; ///////////////////////
         //      chrome.downloads.download({
         //         url: url
         //       });
         //     });


////////////////////////윈도우에서만 사용 가능. menifest version = 3 // browser_action => action  // version3에서는 chrome.tabs.executeScript 사용 불가능하고 version2에서는
/////////////////////// downloads.download 사용 불가능 한 듯




//      chrome.tabs.executeScript({
//      file: 'contentScript.js'
//    }, function (result) {
//      console.log(result);
//    });

    ////////////////////////맥만 사용 가능. menifest version = 2 // browser_action <= action  // version3에서는 chrome.tabs.executeScript 사용 불가능하고 version2에서는
    /////////////////////// downloads.download 사용 불가능 한 듯//////
