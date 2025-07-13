import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from "@/store.ts";
import axios from "axios";
import type {IResult} from "@/components/ui/dialog/dialogWrapper.tsx";


export interface iWord {
  id: number,
  eng_name: string,
  rus_name: string,
  engLearned: boolean | null,
  rusLearned: boolean | null,
  // error?: string | null

}

export type IWordSlice = {
  words: iWord[]
  countWords: number;
  loading: 'loading' | 'error' | 'idle';
}
export type ResponseWord = {
  eng_name: string
  id: number
  rus_name: string
}

export const initialState: IWordSlice = {
  words: [],
  loading: 'idle',
  countWords: 0
}
export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:9000/api/${id}`)
      return await res.data;
    } catch (e) {
      console.log(e)
    }
  }
)
export const countPage = createAsyncThunk(
  'words/countPage',
  async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/count')
      return await res.data[0];
    } catch (e) {
      console.log(e)
    }
  }
)

export const dictionary = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    checkWords: (state, action) => {
      action.payload.forEach((word: IResult) => {
        const index = state.words.findIndex(item => item.id === word.id)
        if (index !== -1) {
          state.words[index].engLearned = word.value.toLowerCase() === state.words[index].eng_name.toLowerCase() || state.words[index].eng_name.toLowerCase().replace(/[(),]/g, '').split(' ').includes(word.value.toLowerCase())
          state.words[index].rusLearned = word.value.toLowerCase() === state.words[index].rus_name.toLowerCase() || state.words[index].rus_name.toLowerCase().replace(/[(),]/g, '').split(' ').includes(word.value.toLowerCase())
        }
      })
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWords.pending, (state: IWordSlice) => {
        state.loading = 'loading'
      })
      .addCase(fetchWords.fulfilled, ((state: IWordSlice, action: PayloadAction<ResponseWord[]>) => {
        state.loading = 'idle'
        const newWords = action.payload.map(word => ({
          id: word.id,
          eng_name: word.eng_name,
          rus_name: word.rus_name,
          engLearned: null,
          rusLearned: null
        }));
        newWords.forEach((word: iWord) => {
          if (state.words.find(item => item.id === word.id)) {
            return
          } else {
            state.words.push(word)
            state.words.sort((a, b) => a.id - b.id)
          }
        })
      }))
      .addCase(countPage.fulfilled, ((state: IWordSlice, action) => {
        state.countWords = action.payload.count
      }))
  }

});

export const {checkWords} = dictionary.actions
export const selectCount = (state: RootState) => state.dictionary
export default dictionary.reducer