require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {appRouter, authRouter} = require('./routes');
const { notifications } = require('./cron/notifications');
const { hours } = require('./cron/hours');
const { deleteSchedules } = require('./cron/deleteSchedules');

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(appRouter);

notifications.start()
hours.start()
deleteSchedules.start()

app.listen(process.env.PORT || 3003);