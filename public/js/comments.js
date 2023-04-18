const commentFormHandler = async (event) => {
  event.preventDefault();
  const postId = document.querySelector('input[name="comment-body"]').value;
  // const commentContent = document.querySelector('textarea[name="comment-body"]').value;
  console.log(postId);

  if (postId) {
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        postId
        
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("RESPONSE",response)
        if (response.ok) {
          return response;
        } else {
          alert(response.statusText);
        }
      })
      .then((data) => {
        // Log the new comment
        console.log(data);

        // Get the container for the comments
        const commentsContainer = document.querySelector("#commentsContainer");

        // Create a new element for the new comment
        const commentEl = document.createElement("div");
        commentEl.classList.add("comment");
        commentEl.innerHTML = `
          <p class="comment-content">${data.commentContent}</p>
          <p class="comment-author">By ${data.username}</p>
        `;

        // Add the new comment to the container
        commentsContainer.appendChild(commentEl);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

document.getElementById("post").addEventListener("click", commentFormHandler);