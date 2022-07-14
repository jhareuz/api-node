import config from './config';
import start from './server/start';
import bootstrap from './server/bootstrap';

import cluster from 'cluster';

if(cluster.isMaster) {
  for(var i = 0; i < config.concurrency.web; i++) {
    // Create a worker
    cluster.fork();
  }
} else {
  bootstrap().then(start);
}
