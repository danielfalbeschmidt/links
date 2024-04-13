const app = require('./app');

const PORT = 5000;



app.listen(PORT, () => {
    console.info(`BACKEND IS RUNNING ON PORT ${PORT}`)
});
