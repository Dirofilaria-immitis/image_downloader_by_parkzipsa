let letsgo = document.getElementById("download");

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
                  console.log(done);




                  for (var k=0; k<countimage; k++) {
                    var testphp = imgs[k].src;
                    var checkingphp = /php/;
                    var found = testphp.match(checkingphp);
                    if(found){
                      window.open(testphp);
                    } 
                  }   //php image




                  return done;
          }




letsgo.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
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
  });
//버튼 눌렀을 때 실행




chrome.commands.onCommand.addListener(async function(command) {
  console.log('Command:', command);
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
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
});
//단축키: command + shift + z






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




