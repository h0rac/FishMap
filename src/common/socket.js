import SocketIOClient from "socket.io-client";
import {API_ENDPOINT} from "../constants/constants";

const ioSocket =  SocketIOClient(`ws://${API_ENDPOINT}`, { jsonp: false , transports: ['websocket'] }, );

export default ioSocket