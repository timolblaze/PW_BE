import axios from 'axios';
import { logger } from './utils';
import { serverUrl, pingTime, apiVersion } from '@configs';

const ping = async () => {
    try{
        const { data } = await axios.get(`${serverUrl}/${apiVersion}/ping`);
        logger.info(`Server pinged successfully: ${data.message}! Status code is ${200} & Status text is OK`);
    } catch(e: any) {
        logger.info(`this the error message: ${e.message}`); 
    }
};

setInterval(ping, pingTime)