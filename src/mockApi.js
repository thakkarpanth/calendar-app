import { rest } from 'msw'
import data from './data/dummyData.json'
import moment from 'moment';


const handlers = [
    rest.get('http://localhost:8080/api/events', (req, res, context) => {
        const searchText = req.url.searchParams.get('search');
        const date = req.url.searchParams.get('date');
        let seatFilter = req.url.searchParams.get('seatFilter');
        const tag = req.url.searchParams.get('tag');
        const page = req.url.searchParams.get('page');
        var d = new Date();
        var n = d.getTimezoneOffset();
        const timeStamp = moment(new Date(date).toISOString()).unix() + n*60;

        if(seatFilter === '') 
            seatFilter = [];
        else    
            seatFilter = seatFilter.split(',');
        
        data.sort((a, b) => moment(a.date, 'DD-MM-YYYY').unix() - moment(b.date, 'DD-MM-YYYY').unix());
        let filteredData = data;
        console.log('z1 timestamp ' , timeStamp , moment('19-07-2021', 'DD-MM-YYYY').unix())
        filteredData = data.filter(event => (
            (date ? moment(event.date, 'DD-MM-YYYY').unix() >= timeStamp-1 : true) &&
            (seatFilter.length === 0 ? true : seatFilter.includes(event.status)) &&
            (tag ? event.category === tag : true) &&
            (searchText !== '' ? event.author.toLowerCase().includes(searchText.toLowerCase()) || event.title.toLowerCase().includes(searchText.toLowerCase()) : true)
        )
        );

        let paginatedData = []; 
        for(let i = page*5 ; i < page*5+5 ; i++){
            if(i >= filteredData.length) break;
            console.log('filtered data  i ' , filteredData[i]);
            paginatedData.push(filteredData[i]); 
        }
        return res(context.status(200), context.json({ data: paginatedData , count : filteredData.length }))
    }),

    rest.get('http://localhost:8080/api/events/dates', (req, res, context) => {
        const tempData = [];
        data.map(event => {
            tempData.push(event.date);
        });
        return res(context.status(200), context.json({ data: tempData }))
    })

]

export { handlers, rest };