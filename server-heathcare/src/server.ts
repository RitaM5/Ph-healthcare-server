
import app from "./app";

// Start the server

const bootstrap = () => {
    try {
        app.listen(5000, () => {
            console.log(`server is running on http://localhost:5000`);

        });
    } catch (err) {
        console.log("not working", err);

    }
}
bootstrap();