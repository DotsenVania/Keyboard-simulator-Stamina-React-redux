import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import {results} from '../../features/counter/counterSlice'; 

function Stopwotch(props) {
    const [hour, setHour] = useState(0);//Hour meter
    const [minute, setMinute] = useState(0);//Minute counter
    const [second, setSeconsd] = useState(0); // Seconds counter
    const [intervalId, setIntervaId] = useState(null); // Reference interval
    const [styles, setStules] = useState({}); // Stopwatch styles
    const [allSecond, setAllSecond] = useState(0); // Total seconds
    const [speed, setSpeed] = useState(0); // The result of the speed calculation
    
    const dispatch = useDispatch();
    const {resultsLesson, finalLesoon, darcTheme} = useSelector(state => state.stamina); 
    const {trueClickCounter} = props; 

    function speedCalc() {
        setSpeed(60 / (allSecond / trueClickCounter));
    };

    useEffect(() => {
        speedCalc();
    }, [allSecond])
    useEffect(() => {
        if(finalLesoon) {
            dispatch(results({
                time: `${hours}:${minutes}:${seconds}`,
                speed: Math.trunc(speed),
                error: props.sumError
            }))
        }
    }, [finalLesoon])

    function startStopwotch() {
        setIntervaId(setInterval(() => {
            setSeconsd(state => state + 1);
            setAllSecond(state => state + 1);  
        }, 1000));
    }

    function stopStopwotch() {
        clearInterval(intervalId)
    }

    function fullStop () {
        setSeconsd(0); 
        setMinute(0);
        setHour(0);
        setAllSecond(0)
        clearInterval(intervalId);
    }

    useEffect(() => {
        if(second == 60) {
            setMinute(state => state + 1) 
            setSeconsd(0); 
        }else if(minute == 60) {
            setSeconsd(0); 
            setMinute(0) 
            setHour(state => state + 1) 
        }else if(hour == 24) {
            setSeconsd(0); 
            setMinute(0) 
            setHour(0) 
        }
    }, [second, minute, hour, speed]);

    useEffect(() => {
        switch (props.statusTime) {
            case 'fullStop':
                    fullStop();
                    setStules({color: darcTheme? "white" : 'black'})
                break;
            case 'stop':
                    stopStopwotch();
                    setStules({color: darcTheme? "white" : 'black'})
                break;
            case 'start':
                    startStopwotch();
                    setStules({color: 'green'})
                break;
            default:
                    fullStop();
                break;
        }
    }, [props.statusTime, darcTheme])

    let hours = hour < 10 ? `0${hour}` : hour,
        minutes =  minute < 10 ? `0${minute}` : minute,
        seconds =  second < 10 ? `0${second}` : second;


    return (
        <>
             <div style={styles} className="status__timer indent"><span>Time:</span> {hours}:{minutes}:{seconds}</div>
             <div className="status__speed indent"><span>Speed:</span> {trueClickCounter == 0 ? 0 : Math.trunc(speed) } s/m</div>
             <div className="status__error indent"><span>Error:</span> {props.sumError}</div>
        </>
    )
};




export default Stopwotch; 