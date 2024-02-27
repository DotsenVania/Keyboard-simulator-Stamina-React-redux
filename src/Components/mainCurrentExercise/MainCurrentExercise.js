import './MainCurrentExercise.scss'; 
import info from '../../data/icon/information.png';
import Keyboard from '../keyboard/Keyboard.js';
import Stopwotch from '../stopwotch/Stopwotch';
import Results from '../results/Results';
import MethodDescription from '../methodDescription/MethodDescription';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 


import { usePreparationString } from '../../hooks/usePreparationString';

import { setStringForLesson, finalLessonStatus, results } from '../../features/counter/counterSlice';

export default function MainCurrentExercise() {
    const {transformDataInString} = usePreparationString(); 
    const {stringForLesson, currentLessons, idData, finalLesoon, darcTheme} = useSelector(state => state.stamina); //Строка для уроку
    const darkClass = darcTheme ? 'dark' : ''; 

    const [str, setStr] = useState([]); //Масив букв для уроку
    const [sizes, setSizes] = useState([]) // Масив розмірів ширини кожної букви
    const [numLetter, setNumLetter] = useState(0); // нумерація для масива
    const [sumSize, setSumSize] = useState(0); //Сума відступу для тексту
    const [sumError, setSumError] = useState(0);
    const [errorStyle, setErrorStyle] = useState(false); // Для оформлення помилки
    const [numArrMethods, setNumArrMethods] = useState(0); //Рахунок для масива методів (масив з кількістю символів) 
    const [currentArrMethods, setCurentArrMethods] = useState(0); //Рахунок для порівняння з числом в масиві  
    const [letterError, setLetterError] = useState(''); // Невірно введена буква
    const [newText, setNewText] = useState(false); // Статус прогрузки тексту для нового уроку
    const [enabledShift, setEnabledShift] = useState(false); // Статус клавіші Shift  нажата / не нажата
    const [statusFocus, setStatusFocus] = useState(false); // Статус фокуса на уроці
    const [statusTime, setStatusTime] = useState('fullStop') // Строка статусу секундоміра
    const [progres, setProgres] = useState(0); // Ширина лінії прогресу в процентах
    const [trueClickCounter, setTrueClickCounter] = useState(0); // Лічильник всіх вірних натискань для підрахунку швидкості
    const [infoMethod, setInfoMethod] = useState({}); // Запис даних про метод
    const [idMethodForModal, setIdMethodForModal] = useState(0); // id для модального вікна з детальним описом метода
    const [modalDescrActive, setModalDescrActive] = useState(false); // Показ модального вікна

    const dispatch = useDispatch(); 
    const focus = useRef(); 

    useEffect(() => {
       if(numLetter === str.length - 1) {
        dispatch(finalLessonStatus(true));
        offFocus()
       }
    }, [numLetter, str])

    //Строка в масив ***************************************************************************
    function transformStrInArray() {
        setStr(stringForLesson.string.split(''));
        setNewText(true)
    }

    useEffect(() => {
        transformStrInArray();
    }, [stringForLesson]);
    //******************************************************************************************

    //Кожну букву масива в окремий компонент ***************************************************
    function letterOutput() {
        let size = (size) => {
            setSizes(state => [...state, size])
        }
        const string = str.map((letter, i) => {
            return <Letter key={i} size={size} letter={letter}/>
        })

        return string; 
    }
    let letters = newText ? letterOutput(): null;    

    //******************************************************************************************

    // Підрахунок відстанні зрушення тексту і активної букви з масиву***************************
    function biasInLeft(e) {
        if(str[numLetter] === e.key) {
            setNumLetter(state => state + 1)
            setSumSize(state => state += +sizes[numLetter]);
            setProgres(state => state + (100 / (str.length - 1)));
            setTrueClickCounter(state => state + 1);

            setCurentArrMethods(state => state + 1)
            if( stringForLesson.arrNum[numArrMethods] - 1 <= currentArrMethods) {
                setCurentArrMethods(state => 0)
                setNumArrMethods(state => state + 1)
            }
        }else {
            if(e.key !== 'Shift' && e.key !== 'Alt' && e.key !== 'Control') {
                setSumError(state => state + 1)
                setErrorStyle(true)
                setLetterError(e.key)
                setTimeout(() => {
                    setLetterError('')
                    setErrorStyle(false)
                }, 100)
            }
            if(e.key == 'Shift') {
                setEnabledShift(true)
            }
            
        }
    }

    function onKeyUp(e) {
        setEnabledShift(false)
    }
     //******************************************************************************************

     
    //Скидання зрушення тексту і активної букви**************************************************
    function beckLesson() {
        setNumLetter(state => 0);
        setSumSize(state => 0);
        setSumError(state => 0);
        setCurentArrMethods(state => 0);
        setNumArrMethods(state => 0);
        setStatusTime('fullStop');
        setProgres(0);
        setTrueClickCounter(0);
        dispatch(finalLessonStatus(false));
    }
    //******************************************************************************************

    //Добавлення і стилізація методів які використовуються в уроці *****************************

    function metodsInLesson() {
        const methods = currentLessons[stringForLesson.id].words.map((method, i) => {
            let clazz; 
            if(numArrMethods === i) {
                clazz = {backgroundColor: '#7bae37', border: "none"}
            }
            function modalActive() {
                setIdMethodForModal(i);
                setModalDescrActive(true); 
            }
            return (
                    <div key={i} style={clazz} onClick={() => modalActive()} className={`methods__wrapper_item ${darkClass}`}>
                        {method.name}
                        <div className="icon-info"></div>
                    </div>
            )
        })
    //******************************************************************************************
    
    //Добавлення опису метода ******************************************************************
        const description = currentLessons[stringForLesson.id].words.map((method, i) => {
            if(numArrMethods === i) {
                return (
                        <div key={i} className="methods__descr">
                            {method.description}
                        </div>
                )
            }
            
        })
        return {methods, description};
    }
    const methodContetn = metodsInLesson().methods; 
    const methodDescr = metodsInLesson().description; 


    //******************************************************************************************
    //Функції для кнопок які переключаються між уроками ****************************************
    function next() {
        const id = idData.idLessons;
        if(id !== currentLessons.length - 1) {
            beckLesson();
            dispatch(setStringForLesson(transformDataInString(id + 1)));
            setNewText(false);
            setSizes([]);
        }else {
            dispatch(setStringForLesson(transformDataInString(id )));
        }
    }
    function prev() {
        
        const id = idData.idLessons
        if(id > 0) {
            dispatch(setStringForLesson(transformDataInString(id - 1)));
            beckLesson();
            setNewText(false);
            setSizes([]);
        }else {
            dispatch(setStringForLesson(transformDataInString(id)));
        }
    }
    //******************************************************************************************

    function offFocus () {
        focus.current.blur();
        setStatusFocus(false);
    }
    function onFocus ()  {
        focus.current.focus();
        setStatusFocus(true);
    }
    useEffect(() => {
        statusFocus ? setStatusTime('start') :  setStatusTime('stop');
    }, [statusFocus])


    return (
        <>
            <div className="wrapper">
                <div className="methods">
                    <div className="methods__wrapper">
                        {methodContetn}
                    </div>
                    <div className="methods__descr">
                        {methodDescr}
                    </div>
                </div>
               
                <div className="status">
                    <Stopwotch statusTime={statusTime} trueClickCounter={trueClickCounter} sumError={sumError}/>
                </div>
                <div className="main">
                    <div ref={focus} 
                        onKeyDown={biasInLeft}  
                        onFocus={() => setStatusFocus(true)}
                        onBlur={() => setStatusFocus(false)}
                        onKeyUp={onKeyUp} 
                        tabIndex={1} 
                        className="main__block" 
                        style={errorStyle ? {backgroundColor: '#fc766d'}: null}>
                            <div style={{left: -sumSize + 'px'}} className="main__block_wrapper">
                                <div style={{left: sumSize + 'px'}} className={errorStyle ? "main__error active": "main__error"}>{letterError}</div>
                                {letters}
                            </div>
                            <div style={{width: `${progres}%`}} className="main__block_progres"></div>
                        </div>
                    <div className={`main__btn btn ${darkClass}`}>
                        <div onClick={() => prev()} className="btn__prev icon-chevron-left"></div>
                        <button className="btn__stop" onClick={() => beckLesson()}>Stop</button>
                        {statusFocus ? <button onClick={() => offFocus() } className="btn__play-pause">Pause</button> : null }
                        {!statusFocus ? <button onClick={() => onFocus() } className="btn__play-pause">Start</button> : null}
                        <div onClick={() => next()} className="btn__next icon-chevron-right"></div>
                    </div>
                </div>
            </div>
            <Keyboard letter={str[numLetter]} letterError={letterError} enabledShift={enabledShift}/>
            {finalLesoon ?<Results prev={prev} beckLesson={beckLesson} next={next}/> : null}
           <MethodDescription modalDescrActive={modalDescrActive} id={idMethodForModal} setModalDescrActive={setModalDescrActive}/> 
        </>
    )
}

//Компонент букви*******************************************************************************************************
function Letter (props) {
    const size = useRef();

    //Добавляю відступи між словами ************************************************************************************
    let style = props.letter == " " ? {width: "10px"}: null;
    //******************************************************************************************************************
    // Записую в стейт ширину кожної букви******************************************************************************
    useEffect(() => {
        props.size( getComputedStyle(size.current).width.replace(/px/, '') )
    },[props.letter])
    //******************************************************************************************************************
    return (
        <>
            <div className='letter' style={style} ref={size}>{props.letter}</div>
        </>
    )
}
//**********************************************************************************************************************