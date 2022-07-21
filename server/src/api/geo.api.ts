import axios from 'axios';
import cfg from "config"

var options = {
    method: 'GET',
    url: cfg.get('GEO_API_URL') as string,
    params: {access_key: cfg.get('GEO_API_KEY') as string},
    headers: {
        'Content-Type': 'application/json'
    }
};

const geoLocApiReq = async (ipaddress: string)=>{
    options.url += `${ipaddress}`;
    return axios.request(options).then((response)=>{
        return {success: true, data: response};
    }).catch((err)=>{
        return {success: false, data: err};
    });
}

export default geoLocApiReq;