import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () => {
    server.listen(process.env.PORT || 3333, () => {
        console.log("App rodando na porta " + process.env.PORT || 3333);
    });
};


/**
 * Se estiver rodando localmente, inicializa as migrates e seed 
 *  antes de inicializar o servidor com o startServer()
 */
if (process.env.IS_LOCALHOST !== "true") {
    Knex.migrate.latest()
        .then(() => {
            Knex.seed.run()
                .then(() => startServer())
                .catch(console.log);
        })
        .catch(console.log); 
} else {
    startServer();
}



// yarn start
// yarn tsc
// node ./build/index.js