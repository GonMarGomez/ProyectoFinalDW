const btn = document.getElementById('buttonForm');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_hjt632d';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El mensaje se envió correctamente',
        showConfirmButton: false,
        timer: 3500
      })
    }, (err) => {
      btn.value = 'enviar mensaje!';
      alert(JSON.stringify(err));
    });
});
 btn.addEventListener("click", () => {
   Toastify({
     text: "Seguinos en Instagram!!",
     duration: 4000,
     style: {
            background: "linear-gradient(to left, #ffa5c9, #b68bc1)",
             },
     destination: "https://www.instagram.com/groov.is/",
   }).showToast();
 });