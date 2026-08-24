const USERS_KEY = "siarn_users";
const SESSION_KEY = "siarn_session";


function getUsers() {
  const users = localStorage.getItem(USERS_KEY);

  return users ? JSON.parse(users) : [];
}


function createSession(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    role: user.role || "user",

    address: user.address || {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },

    points: user.points || 0,
  };
}


function ensureAdminUser() {
  const users = getUsers();

  const adminExists = users.some(
    (user) =>
      user.email.toLowerCase() ===
      "admin@raizes.com"
  );

  if (adminExists) {
    return;
  }

  const admin = {
    id: "admin-001",

    name: "Administrador",

    email: "admin@raizes.com",

    password: "admin123",

    role: "admin",

    phone: "",

    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },

    points: 0,

    createdAt: new Date().toISOString(),
  };

  users.push(admin);

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}


export function registerUser(userData) {
  ensureAdminUser();

  const users = getUsers();

  const emailExists = users.some(
    (user) =>
      user.email.toLowerCase() ===
      userData.email.toLowerCase()
  );

  if (emailExists) {
    return {
      success: false,
      message: "Este e-mail já está cadastrado.",
    };
  }

  const newUser = {
    id: crypto.randomUUID(),

    name: userData.name,

    email: userData.email.toLowerCase(),

    password: userData.password,

    role: "user",

    phone: userData.phone || "",

    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },

    points: 0,

    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

  const session = createSession(newUser);

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );

  return {
    success: true,
    user: session,
  };
}


export function loginUser(email, password) {
  ensureAdminUser();

  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() ===
        email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "E-mail ou senha incorretos.",
    };
  }

  const session = createSession(user);

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );

  return {
    success: true,
    user: session,
  };
}


export function getCurrentUser() {
  const session =
    localStorage.getItem(SESSION_KEY);

  return session
    ? JSON.parse(session)
    : null;
}


export function updateUser(userId, userData) {
  const users = getUsers();

  const index = users.findIndex(
    (user) => user.id === userId
  );

  if (index === -1) {
    return {
      success: false,
      message: "Usuário não encontrado.",
    };
  }

  users[index] = {
    ...users[index],
    ...userData,
  };

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

  const session = createSession(users[index]);

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );

  return {
    success: true,
    user: session,
  };
}


export function addUserPoints(userId, points) {
  const users = getUsers();

  const index = users.findIndex(
    (user) => user.id === userId
  );

  if (index === -1) {
    return {
      success: false,
      message: "Usuário não encontrado.",
    };
  }

  const currentPoints =
    users[index].points || 0;

  users[index].points =
    currentPoints + points;

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

  const session = createSession(users[index]);

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );

  return {
    success: true,
    user: session,
    points: users[index].points,
  };
}


export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}


export function isAuthenticated() {
  return Boolean(getCurrentUser());
}