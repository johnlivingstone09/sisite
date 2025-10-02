//blog box and image
 function showBlogPage(pageId) {
  // Hide all blog pages
  document.querySelectorAll('.blog-page').forEach(page => {
    page.style.display = 'none';
  });
  // Show the requested page
  const page = document.getElementById(pageId);
  if (page) {
    page.style.display = 'block';
  }
  // Optionally hide the blog section
  const blogSection = document.getElementById('blogSection');
  if (blogSection) {
    blogSection.style.display = 'none';
  }
}

function showBlogSection() {
  // Hide all blog pages
  document.querySelectorAll('.blog-page').forEach(page => {
    page.style.display = 'none';
  });
  // Show the blog section
  const blogSection = document.getElementById('blogSection');
  if (blogSection) {
    blogSection.style.display = 'block';
  }
}