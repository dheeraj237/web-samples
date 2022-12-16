

const track = document.getElementById("image-track");

window.onmousedown = e => {
    console.log('down', e)
    track.dataset.mouseDownAt = e.clientX;
}
window.onmouseup = e => {
    console.log('up', e);
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = parseFloat(track.dataset.percentage);
}

window.onmousemove = e => {

    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta/maxDelta) * -100;
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform:`translate(${nextPercentage}%, -50%)`
    }, { duration: 4800, fill: "forwards"});

    for(const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% center`
        }, { duration: 4800, fill: "forwards"});
    }
}