import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardType} from "../../m3-dal/cards-api";

const slice = createSlice({
    name: 'learningPack',
    initialState: {
        cards: [] as Array<CardType>,
    },
    reducers: {
        setLearningCards(state, action: PayloadAction<Array<CardType>>) {
            state.cards  = action.payload
        },
        setGradeOfCard(state, action: PayloadAction<{ cardId: string, grade: number }>) {

            const id = state.cards.findIndex(card => card._id === action.payload.cardId);
            if (id > -1) {
                state.cards[id].grade = action.payload.grade
            }
        },
    }
})

export const learnPackReducer = slice.reducer;
export const {setLearningCards, setGradeOfCard} = slice.actions;