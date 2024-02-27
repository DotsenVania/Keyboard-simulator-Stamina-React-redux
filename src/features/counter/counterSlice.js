import { createSlice, createReducer } from '@reduxjs/toolkit';
import allLessonData from '../../data/data.json';
const initialState = {
  allLessonData,
  currentLessons: [],
  currentLessonName: '',
  idData: {
    idGrupe: 0,
    idLessons: 0,
    idLesoon: 0
  },
  statusLesson: false,
  activePage: {
    pageGrup: true,
    pageLessons: false,
    pageLesson: false
  },
  resultsLesson: {
    time: '',
    speed: 0,
    error: 0
  },
  finalLesoon: false,
  stringForLesson: '',
  darcTheme: false,
  sizeLetter: []
};

export const staminaReducer = createSlice({
  name: 'stamina',
  initialState,
  reducers: {
    addStringForLesson: (state, action) => {
      state.activeStringForLesson = action.payload; 
    },
    setDataLessons: (state, action) => {
      state.currentLessons = action.payload.data;
      state.idData.idGrupe = action.payload.id;
    },
    setActivePage: (state, action) => {
      switch (action.payload) {
        case 'pageGrup':
          state.activePage.pageGrup = true; 
          state.activePage.pageLessons = false; 
          state.activePage.pageLesson = false; 
          break;
        case 'pageLessons':
          state.activePage.pageGrup = false; 
          state.activePage.pageLessons = true; 
          state.activePage.pageLesson = false; 
          break;
        case 'pageLesson':
          state.activePage.pageGrup = false; 
          state.activePage.pageLessons = false; 
          state.activePage.pageLesson = true; 
          break;
        default:
          state.activePage.pageGrup = false; 
          state.activePage.pageLessons = false; 
          state.activePage.pageLesson = true; 
          break;
      }
    },
    setStringForLesson: (state, action) => {
      state.stringForLesson = action.payload; 
      state.idData.idLessons = action.payload.id; 
    },
    setSizeLetter: (state, action) => {
      state.sizeLetter.push(action.payload);
    },
    results: (state, action) => {
      state.resultsLesson.error = action.payload.error;
      state.resultsLesson.time = action.payload.time;
      state.resultsLesson.speed = action.payload.speed;
    },
    finalLessonStatus:  (state, action) => {
      state.finalLesoon = action.payload;  
    },
    tggleDarkTheme: state => {
      state.darcTheme = !state.darcTheme
    }
  },
  
});

export const { 
  addStringForLesson, 
  setDataLessons, 
  setActivePage, 
  setStringForLesson,
  setSizeLetter,
  results,
  finalLessonStatus,
  tggleDarkTheme
  } = staminaReducer.actions;


export default staminaReducer.reducer;
