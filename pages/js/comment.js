document.addEventListener("mouseup", function (event) {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      showCommentBox(event.pageX, event.pageY, selectedText);
    } else {
      hideCommentBox();
    }
  });
  
  function showCommentBox(x, y, selectedText) {
    let commentBox = document.querySelector(".comment-box");
  
    if (!commentBox) {
      commentBox = document.createElement("div");
      commentBox.className = "comment-box";
      commentBox.innerHTML = `
        <textarea placeholder="Type your comment..." rows="3" cols="30"></textarea>
        <br>
        <button class="submit-comment">Submit</button>
      `;
      document.body.appendChild(commentBox);
  
      commentBox.querySelector(".submit-comment").addEventListener("click", function () {
        addComment(selectedText, commentBox.querySelector("textarea").value);
        hideCommentBox();
      });
    }
  
    commentBox.style.display = "block";
    commentBox.style.left = `${x}px`;
    commentBox.style.top = `${y}px`;
  }
  
  function hideCommentBox() {
    let commentBox = document.querySelector(".comment-box");
    if (commentBox) {
      commentBox.style.display = "none";
    }
  }
  
  function addComment(selectedText, comment) {
    const comments = document.querySelector(".comments");
    const commentElement = document.createElement("div");
    commentElement.innerHTML = `
      <strong>User A</strong>: "${comment}" (<em>${selectedText}</em>)
    `;
    comments.appendChild(commentElement);
  }
  