import { CREATE_BOSS, UPDATE_BOSS, GET_BOSS } from '../actions/user';
import Boss from '../../models/boss';


const initialState = {
    bossInfo: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_BOSS:
            return {
                bossInfo: action.bosses
            };

        case CREATE_BOSS:
            const newBoss = new Boss(
                action.bossData.id,
                action.bossData.bossId,
                action.bossData.imageUrl,
                action.bossData.name,
                action.bossData.surname,
                action.bossData.email,
                action.bossData.phoneNumber            );
            return {
                ...state,
                bossInfo: newBoss
            };

        case UPDATE_BOSS:
            const bossIndex = state.bossInfo.findIndex(boss => boss.id === action.bId);

            const updatedBoss = new Boss(
                action.bId,
                state.bossInfo[bossIndex].bossId,
                action.bossData.imageUrl,
                action.bossData.name,
                action.bossData.surname,
                action.bossData.email,
                action.bossData.phoneNumber
            );
            const updatedBossInfo = [...state.bossInfo];
            updatedBossInfo[bossIndex] = updatedBoss;

            return {
                ...state,
                bossInfo: updatedBossInfo
            };

    }
    return state;
};