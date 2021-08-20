import React from 'react'
import 'antd/dist/antd.css'
import styles from './home.module.css'
import Header from '../components/Header'
import Events from '../components/Events'
import data from '../data/dummyData.json'
import Calendar from 'react-calendar';
import './Calendar.css';
import moment from 'moment'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'


function Home() {
    const [tag, setTag] = React.useState(null);
    const [searchText, setSearchText] = React.useState('');
    const [seatFilter, setSeatFilter] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [date, setDate] = React.useState(new Date());
    const [eventDates, setEventDates] = React.useState([]);
    const [loading , setLoading] = React.useState(false);

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
            tempData.push(event.date);
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
    }, [])

    // React.useEffect(() => {
    //     const timeStamp = moment(new Date(date).toISOString()).unix() ;
    //     const dateWiseSorted = data.filter(event => { return moment(event.date, 'DD-MM-YYYY').unix() >= timeStamp });
    //     setFilteredData(dateWiseSorted);

    // } , [date])


    const filterData = () => {
        const timeStamp = moment(new Date(date).toISOString()).unix();
        let tempData = data.filter(event => ((date ? moment(event.date, 'DD-MM-YYYY').unix() >= timeStamp : true) && (event.author.toLowerCase().includes(searchText.toLowerCase()) || event.title.toLowerCase().includes(searchText.toLowerCase())) && (seatFilter.length === 0 ? true : seatFilter.includes(event.status)) && (tag ? event.category === tag : true)));
        setFilteredData(tempData);
    }

    React.useEffect(() => {
        setLoading(true); 
        filterData();
        setLoading(false);
    }, [date, searchText, tag, seatFilter])

    React.useEffect(() => {
        data.sort((a, b) => moment(a.date, 'DD-MM-YYYY').unix() - moment(b.date, 'DD-MM-YYYY').unix());
    }, [])

    return (
        <div className={styles.container}>
            <Header tag={tag} setSeatFilter={setSeatFilter} seatFilter={seatFilter} setTag={setTag} searchText={searchText} setSearchText={setSearchText} />
            <div className={styles.mainBody}>
                <div className={styles.eventDetails}>
                    <PerfectScrollbar>
                        <Events loading={loading} date={date} filteredData={filteredData} />
                    </PerfectScrollbar>
                </div>
                <div className={styles.calendar}>
                    <Calendar
                        value={date}
                        onChange={(e) => setDate(e)}
                        tileClassName={({ date, view }) => {
                            for (let eventDate of eventDates) {
                                if (eventDate === moment(date).format("DD-MM-YYYY")) {
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
