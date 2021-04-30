
const getMenuFrontEnd = (role = 'USER_ROLE') => {

  const menu = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Productos', url: '../dashboard' },
        { titulo: 'Mi perfil', url: 'perfil' },
        { titulo: 'Carrito de la compra', url: 'perfil/carrito' },
      ]
    },
  ];

  if (role === 'ADMIN_ROLE') {
    menu[0].submenu.push({ titulo: 'Gráficas', url: 'grafica1' });

    menu.push({
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Productos', url: 'productos' },
      ]
    });
  }

  return menu;
}

module.exports = {
  getMenuFrontEnd
}
