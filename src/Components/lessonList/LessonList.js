import './lessonList.scss';



import {useState, useEffect} from 'react'; 
import {useDispatch, useSelector} from 'react-redux'; 
import { setActivePage,  setStringForLesson} from '../../features/counter/counterSlice';
import { usePreparationString } from '../../hooks/usePreparationString';

function LessonList () {
    const {currentLessons, darcTheme} = useSelector(state => state.stamina);  // I get data with lessons
    const darkClass = darcTheme ? 'dark' : ''; 
    const {transformDataInString} = usePreparationString(); // I get a function for transforming data into a string
    const dispatch = useDispatch();

    // Downloading the data necessary for the lesson and switching to the simulator page ********************************
    const nextLesson = (id) => {
        dispatch(setActivePage('pageLesson'));
        dispatch(setStringForLesson(transformDataInString(id)));
    }
    //********************************************************************************************************

    //Rendering of the list of Lessons and a button to jump to a separate lesson *****************************************
    const lessons = currentLessons.map((lesson, i) => {
        return (
                <div key={i} onClick={() => nextLesson(i)} className={`lesson__grupe ${darkClass}`}>{lesson.nameLesson}</div>
        )
    })
    //********************************************************************************************************
    
    return (
        <>
            {lessons}
        </>
    )
};

export default LessonList
