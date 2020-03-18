import {registerRoute} from 'workbox-routing';
import {NetworkFirst} from 'workbox-strategies';

/*eslint-disable-next-line*/
workbox.routing.registerNavigationRoute('/index.html')

registerRoute(
  new RegExp('/'),
  new NetworkFirst()
);
