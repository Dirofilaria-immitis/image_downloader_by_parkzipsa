
// 2.0 팝업창에 띄워서 원하는 사진 눌러서 다운받을 수 있도록
//3.0 네이버는 안되는데, iframe 문제인듯 나중에 tabid 쪽에서 설명서 읽고 다시 설정할 것
// 4.0 특정 웹페이 사진들이 네트워크 오류 일으킴. URL 문제인 것 같은데 콘솔창이나 ALERT 창으로 디버깅 하면서 수정할 것



let letsgo = document.getElementById("download");

function downloadAll(){
                    var imgs = document.querySelectorAll("img");
                    var countimage = document.querySelectorAll("img").length;
                    var imgSrcs = [];
                    for (var i = 0; i < countimage; i++) {
                          imgSrcs.push(imgs[i].src);
                        };
                            var url = imgSrcs;
                            return url
                }
//전체 이미지


function downloadSizeProto(){
             var imgs = document.querySelectorAll("img");
             var countimage = document.querySelectorAll("img").length;
             var imgSrcs = [];
                 for (var i = 0; i < countimage; i++) {
                if(imgs[i].width <100 || imgs[i].height<100) continue;
                   imgSrcs.push(imgs[i].src);
                   }
                           var url = imgSrcs;
                           return url
                           }
//사이즈 조절한 이미지


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


// https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentDocument
// https://stackoverflow.com/questions/13266192/accessing-iframe-from-chrome-extension
// 이걸로 아이프레임 이슈 해결

// 불완전하지만 새 탭에서 여는 명령어로 php url 이미지 이슈 해결





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




