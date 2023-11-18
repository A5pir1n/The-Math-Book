document.getElementById('hoverVideo').addEventListener('mouseenter', function() {
    this.play();
});

document.getElementById('hoverVideo').addEventListener('mouseleave', function() {
    this.pause();
});
