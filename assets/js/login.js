const users = [
    {
        email: "admin@glowup.com",
        username: "admin",
        password: "admin2910",
        role: "admin"
    },
    {
        email: "user@glowup.com",
        username: "usuario",
        password: "user2910",
        role: "user"
    }
];

//Captura del formulario de login
document.getElementById("loginform").addEventListener("submit", function(e){
    e.preventDefault();

const email = document.getElementById("email").value.trim();
const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value.trim();

const user = users.find(
    (u) =>
    u.email === email &&
    u.username === username &&
    u.password === password
);

if(user){
    //Guardamos la sesión en localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));

    //Se redirige según el rol 
    if(user.role === "admin"){
        window.location.href = "administrador.html";
    }
    else if(user.role === "user"){
        window.location.href = "usuario.html";
    }
}
else {
    alert("Por favor ingrese unas credenciales válidas");
}
});


function logout(){
    sessionStorage.clear();
    window.location.href = "index.html"
}
  