var audio, context, analyser, src, array, logo;

logo = document.getElementById("logo").style;

audio = document.getElementById("audio");

button = document.getElementById("button");

button.onclick = function(){
    if(!context){
        preparation();
    }
    if(audio.paused){
        audio.play();
        loop();
        button.value = "Stop a Magic"
    }else{
        audio.pause();
        button.value = "Start a Magic"
    }
}

function preparation(){
    context = new webkitAudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop(){
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    if ((array[0]/160 > 1) && (array[0]/160 < 1.4)) 
    {
    	logo.transform = "scale(" + (array[0]/160).toString() + ")";
    }
    else {
    	logo.transform = "scale(1)";
    } 
}