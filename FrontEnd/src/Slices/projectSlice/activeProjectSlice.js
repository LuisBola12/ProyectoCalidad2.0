import { createSlice } from '@reduxjs/toolkit';

const activeProjectSlice = createSlice({
  name: 'activeProjectSlice',
  initialState: {
    projectName: '',
  },
  reducers: {
    updateActiveProject: (state, action) => { state.projectName = action.payload; },
    resetProject: (state) => { state.projectName = ''; },
  },

});


export const { updateActiveProject,resetProject} = activeProjectSlice.actions;
export default activeProjectSlice.reducer;