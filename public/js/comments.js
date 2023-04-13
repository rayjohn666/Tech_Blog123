

// const commentFormHandler = async (event) => {
document.querySelector('#new-comment-form').addEventListener('submit', event =>{
  event.preventDefault();
  const postId = document.querySelector('#comment-box').value;
  const commentContent = document.querySelector(
    'textarea[name="comment-body"]'

  ).value;
  console.log(commentContent);

  if (commentContent) {
    fetch("/api/commentRoutes", {
      method: "POST",
      body: JSON.stringify({
        postId,
        commentContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response =>{
      if (response.ok){
        document.location.reload();
      }
      else {
      alert(response.statusText);
    }
  })
}});



document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);
