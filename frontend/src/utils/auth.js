export const isAuthenticated = () => {
    console.log("Usuario autenticado:", auth);
    return document.cookie.includes("sessionid"); // Si usas sesiones de Django
};
