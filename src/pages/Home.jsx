import React from 'react'
import { Spin } from 'antd'
import 'antd/dist/antd.css'
import styles from './home.module.css'
import Header from '../components/Header'
import Events from '../components/Events'
import data from '../data/dummyData.json'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'


function Home() {
    const [tag, setTag] = React.useState(null);
    const [searchText, setSearchText] = React.useState('');
    const [seatFilter, setSeatFilter] = React.useState(null);
    const [filteredData, setFilteredData] = React.useState([]);
    const [date , setDate] = React.useState(null) ;
    const [eventDates , setEventDates] = React.useState([]); 

    const filterEventsByTag = () => {
        if (tag) {
            const tempData = data.filter(event => event.category === tag);
            setFilteredData(tempData);
        }
        else
            setFilteredData(data);
    }

    const getDates = () => {
        const tempData = []; 
        data.map(event => {
            tempData.push(event.date) ;
        })
        setEventDates(tempData);
    }

    const filterEventsByName = (searchText) => {
        let tempData = filteredData;
        tempData = tempData.filter(event => {
            return event.author.toLowerCase().includes(searchText) || event.title.toLowerCase().includes(searchText)
        });
        setFilteredData(tempData);
    }


    // React.useEffect(() => {
    //     setSearchText('');
    //     filterEventsByTag();
    // }, [tag])


    // React.useEffect(() => {
    //     if (searchText === '') {
    //         setFilteredData(filterEventsByTag);
    //     }
    //     else {
    //         filterEventsByName(searchText.toLowerCase());
    //     }
    // }, [searchText])

    React.useEffect(() => {
        getDates();
    } , [])

    // React.useEffect(() => {
    //     const timeStamp = moment(new Date(date).toISOString()).unix() ;
    //     const dateWiseSorted = data.filter(event => { return moment(event.date, 'DD-MM-YYYY').unix() >= timeStamp });
    //     setFilteredData(dateWiseSorted);
        
    // } , [date])


    const filterData = () => {
        const timeStamp = moment(new Date(date).toISOString()).unix() ;
        let tempData = data.filter(event  => ((date ? moment(event.date, 'DD-MM-YYYY').unix() >= timeStamp : true) && (event.author.toLowerCase().includes(searchText.toLowerCase()) || event.title.toLowerCase().includes(searchText.toLowerCase())) && (tag ? event.category === tag : true)));
        setFilteredData(tempData);
    }

    React.useEffect(() =>{
       filterData() ; 
    } , [date , searchText , tag])
    return (
        <div className={styles.container}>
            <Header tag={tag} setTag={setTag} searchText={searchText} setSearchText={setSearchText} />
            <div className={styles.mainBody}>
                <div className={styles.eventDetails}>
                    <Events filteredData={filteredData} />
                </div>
                <div className={styles.calendar}>
                    <Calendar
                        value = {date}
                        onChange={(e) => setDate(e)}
                        tileClassName={({ date, view }) => {
                                for(let eventDate of eventDates){
                                    if(eventDate === moment(date).format("DD-MM-YYYY")){
                                        return 'highlight'
                                    }
                                    // return 'normal'
                                }
                                
                          }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
