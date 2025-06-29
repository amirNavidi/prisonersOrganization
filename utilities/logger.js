// import { createLogger, format, transports } from 'winston';
// import path from 'path';
// const LOG_FILE_PATH = 'D:/NavidiLog/PriosnsLog/prisonLog.txt'
// const logFilePath = path.join(LOG_FILE_PATH, 'prisonLog.txt');

// const logger = createLogger({
//     level: 'info',
//     format: format.combine(
//         format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//         format.printf(({ timestamp, level, message }) => {
//             return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
//         })
//     ),
//     transports: [
//         new transports.Console(),
//         new transports.File({ filename: logFilePath })
//     ]
// });

// export default logger;
