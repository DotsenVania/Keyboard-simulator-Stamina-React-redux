import './results.scss';

import { useDispatch, useSelector } from 'react-redux';
import {useState, useEffect} from 'react';

import {finalLessonStatus} from '../../features/counter/counterSlice';


function Results(props) {
    const {resultsLesson, finalLesoon, darcTheme} = useSelector(state => state.stamina)
    const darkClass = darcTheme ? 'dark' : ''; 

    useEffect(() => {
        console.log(resultsLesson)
    },[finalLesoon])
    const {prev, beckLesson, next} = props;

    return (
        <>
            <div className={`result ${darkClass}`}>
                <div className="result__block">
                    <div className="result__block_title">RESULT</div>
                    <div className="result__block_descr descr">
                        <div className="descr__info display__felx_column">
                            <div className="descr__img icon-clock"></div>
                            <div className="descr__text">{resultsLesson.time}</div>
                        </div>
                        <div className="descr__info display__felx_column">
                            <div className="descr__img icon-speed"></div>
                            <div className="descr__text">{resultsLesson.speed}</div>
                        </div>
                        <div className="descr__einfo display__felx_column">
                            <div className="descr__img icon-error"></div>
                            <div className="descr__text">{resultsLesson.error}</div>
                        </div>
                    </div>
                    <div className="result__block_btn btn">
                        <div onClick={() => prev()} className="btn__prev icon-chevron-left"></div>
                        <button className="btn__stop" onClick={() => beckLesson()}>Stop</button>
                        <div onClick={() => next()} className="btn__next icon-chevron-right"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Results; 