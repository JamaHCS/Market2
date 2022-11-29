import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export const getHeaderTitle = (route) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Mi Cuenta':
      return 'Mi Cuenta';
    case 'Nueva Venta':
      return 'Nueva Venta';
    case 'Localización del market':
      return 'Localización del market';
    case 'Catalogo':
      return 'Catalogo';
    case 'Ingresar a market':
      return 'Ingresar a market';
  }
}
