import './main.scss'; 

import {useState, useEffect} from 'react'; 
import {useDispatch, useSelector} from 'react-redux'; 
import { usePreparationString } from '../../hooks/usePreparationString';
import { setDataLessons, setActivePage } from '../../features/counter/counterSlice';
import MainCurrentExercise from '../mainCurrentExercise/MainCurrentExercise';

import LessonList from '../lessonList/LessonList';


function Main () {
    const lessonData = useSelector(state => state.stamina.allLessonData);
    const {pageGrup, pageLessons, pageLesson} = useSelector(state => state.stamina.activePage);
    const { allLessonData, idData, darcTheme} = useSelector(state => state.stamina);
    const darkClass = darcTheme ? 'dark' : ''; 
    const {stringForLesson} = useSelector(state => state.stamina); 
    const {transformData} = usePreparationString(); 

    const dispatch = useDispatch()

    // Downloading the necessary data and moving to the next page  **************************
    function nextLessons(id) {
        dispatch(setActivePage('pageLessons')); // Строка активної сторінки для reducer
        dispatch(setDataLessons(transformData(id)))
    }
    //*************************************************************************************

    //Rendering of programming groups for lessons************************************************
    const group = lessonData.map((group, i) => {
        let className; 
        switch (group.nameGrup) {
            case 'HTML':
                className = 'icon-html5'
                break;
            case 'CSS':
                className = 'icon-css3'
                break;
            case 'JS':
                className = 'icon-javascript'
                break;
            case 'REACT':
                className = 'icon-react'
                break;
            
            default:
                break;
        }

        return (
                    <div onClick={() => nextLessons(i)} className={`lesson__grupe ${darkClass}`}>
                        <div className={`lesson__grupe_img ${className}`}></div>
                        <div key={i} >{group.nameGrup}</div>
                    </div>
                
        )
    })
    //***********************************************************************************

    // Dynamic header according to the active page*****************************
    const setTitles = () => {
        let title = 'Frontend'
        if(pageGrup) {
            title ='Frontend'
        }else if (pageLessons) {
            title = allLessonData[idData.idGrupe].nameGrup
        }else if (pageLesson) {
            title = stringForLesson.lessonName
        }
        return title; 
    }
    
   let title = setTitles(); 
   //*************************************************************************************

   //Conditional rendering of components********************************************************
    const groupsContent = pageGrup ? ( <div className="lesson">{group}</div>) : null
    const lessonsContent = pageLessons ? <LessonList/> : null
    const lessonContent = pageLesson ? <MainCurrentExercise/> : null
  //**************************************************************************************

    return (
        <div className='main'>
            <div className="main__title">{title}</div>
            <div className="main__wrapper">
                {groupsContent} 
                {lessonsContent}
                {lessonContent}
            </div>
            
        </div>
    )
}; 

export default Main; 