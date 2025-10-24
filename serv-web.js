


        // Contact Form Popup

         const openBtnAlt = document.getElementById("openContactFormAlt");
  const closeBtnAlt = document.getElementById("closeContactFormAlt");
  const popupAlt = document.getElementById("contactPopupAlt");

  openBtnAlt.addEventListener("click", () => {
    popupAlt.classList.add("active");
  });

  closeBtnAlt.addEventListener("click", () => {
    popupAlt.classList.remove("active");
  });

  popupAlt.addEventListener("click", (e) => {
    if (e.target === popupAlt) {
      popupAlt.classList.remove("active");
    }
  });
        
   
