import { server } from './server/Server';

server.listen(process.env.PORT || 3333, () => {
    console.log('App rodando na porta ' + process.env.PORT || 3333);
});

// yarn start
// yarn tsc
// node ./build/index.js