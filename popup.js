const btn=document.querySelector(".changeColorBtn");
const colorGrid=document.querySelector(".colorGrid");
const colorValue=document.querySelector(".colorValue");


btn.addEventListener("click",async()=>{
  chrome.storage.sync.get("color",(color)=>{
    console.log("color",color);
  })
  let [tab]=await chrome.tabs.query({
    active:true,
    currentWindow:true
  });
  chrome.scripting.executeScript({
    target:{tabId:tab.id},
    function:pickColor,


  },async(injectionResult)=>{
    const [data]=injectionResult;
    if(data.result){
      const color=data.result.sRGBHex;
      colorGrid.style.backgroundColor=color;
      colorValue.innerText=color;
      try{
        await navigator.clipboard.writeText(color);
      }catch(err){
        console.log("error in navigator",err)
      }
    }
    console.log(`injection` , injectionResult);

  });

});

async function pickColor(){
  try{
    //picker
    const eyeDropper=new EyeDropper();
    return await eyeDropper.open();

  }catch(err){
    consolr.log(`error occured`,err);
  }
}
