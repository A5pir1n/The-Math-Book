document.getElementById('submit-comment').addEventListener('click', function() {
    var commentInput = document.getElementById('comment-input');
    var commentText = commentInput.value.trim();
    
    if (commentText) {
        var commentDisplay = document.getElementById('comments-display');
        var newComment = document.createElement('div');
        newComment.textContent = commentText;
        newComment.classList.add('comment');
        commentDisplay.appendChild(newComment);
        commentInput.value = ''; // Clear the input field
    } else {
        alert('Please enter a comment.');
    }
});
