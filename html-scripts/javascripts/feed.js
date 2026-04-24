let posts = JSON.parse(localStorage.getItem("posts")) || []

const feed = document.getElementById("feed")

function renderPosts(){
  feed.innerHTML = ""

  posts.forEach((post, index) => {
    let div = document.createElement("div")

    div.innerHTML = `
      <p><strong>${post.name}</strong></p>
      <p>${post.content}</p>
      <p>${post.time}</p>
      <button onclick="likePost(${index})">Like (${post.likes})</button>
      <button onclick="deletePost(${index})">Delete</button>
    `

    feed.appendChild(div)
  })
}

document.getElementById("postBtn").addEventListener("click", function(){
  let user = JSON.parse(localStorage.getItem("userProfile"))

  let newPost = {
    name: user.name,
    content: document.getElementById("postInput").value,
    time: new Date().toLocaleString(),
    likes: 0
  }

  posts.push(newPost)
  localStorage.setItem("posts", JSON.stringify(posts))

  renderPosts()
})

function likePost(index){
  posts[index].likes++
  localStorage.setItem("posts", JSON.stringify(posts))
  renderPosts()
}

function deletePost(index){
  if(confirm("Delete this post?")){
    posts.splice(index,1)
    localStorage.setItem("posts", JSON.stringify(posts))
    renderPosts()
  }
}

renderPosts()