import {rest} from 'msw'
import data from './data/dummyData.json'
import moment from 'moment';


const handlers = [
    rest.get('http://localhost:8080/api/events', (req,res,context)=>{
        const searchText = req.url.searchParams.get('search') ; 
        console.log('z1 search text ' , searchText); 
        data.sort((a, b) => moment(a.date, 'DD-MM-YYYY').unix() - moment(b.date, 'DD-MM-YYYY').unix());
        let filteredData = data ;
        if(searchText != ''){
            filteredData = data.filter(event =>  (event.author.toLowerCase().includes(searchText.toLowerCase()) || event.title.toLowerCase().includes(searchText.toLowerCase()) ));
        }
        return res(context.status(200) , context.json({data : filteredData}))
    }),
    
    rest.get('http://localhost:8080/api/events/dates' , (req , res , context) => {
        const tempData = [];
        data.map(event => {
            tempData.push(event.date);
        });
        return res(context.status(200) , context.json({data : tempData}))
    })

]

export {handlers ,rest};