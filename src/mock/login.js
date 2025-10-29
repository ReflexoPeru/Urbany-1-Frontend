
export const mockUsers = [
    {
        id: 1,
        name: "LeiKVaR",
        email: "ramzvaal@gmail.com",
        password: "sagentefullleft",
        token: "abc123xyz"
    },
    {
        id: 2,
        name:"MioVera",
        email: "mariafernanda@gmail.com",
        password: "naomisaai",
        token: "def456uvw"
    },
    {
        id: 3,
        name: "LeonDeLaCumbia",
        email: "leonardorojas@gmailcom",
        password: "vuelveamisbrazos",
        token: "qwe201rty"
    }
];


// Simulación de una llamada a la API de Login
export const mockLogin = async (email, password) => {
    // Simula un pequeño retardo
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find(
        (u) => u.email === email && u.password === password
    );

    if (user) {
        return { success: true, user };
    } else {
        return { success: false, message: "Credenciales inválidas" };
    }
};