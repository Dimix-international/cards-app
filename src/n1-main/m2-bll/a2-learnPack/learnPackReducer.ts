import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardType} from "../../m3-dal/cards-api";

const slice = createSlice({
    name: 'learningPack',
    initialState: {
        cards: [] as Array<CardType>
    },
    reducers: {
        setLearningCards(state, action:PayloadAction<Array<CardType>>) {
            return {...state, cards: [...action.payload]}
        }
    }
})

export const learnPackReducer = slice.reducer;
export const {setLearningCards} = slice.actions;