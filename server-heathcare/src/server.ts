
import app from "./app";
import { envVars } from "./app/config/env";

// Start the server

const bootstrap = () => {
    try {
        app.listen(envVars.PORT, () => {
            console.log(`server is running on http://localhost:${envVars.PORT}`);

        });
    } catch (err) {
        console.log("not working", err);


    }
}
bootstrap();