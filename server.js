const { error } = require('console');
const { sequelize } = require('./api/db');
const { app } = require('./index');
const PORT = process.env.PORT || 3000;

const init = async () => {
    try {
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`)
        })
    } catch (e) {
        console.log("Error starting server: ", error);
    }
};

init();