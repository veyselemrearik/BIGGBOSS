import Boss from "../../models/boss";
import Firebase from '../../constants/Firebase.js';
export const CREATE_BOSS = 'CREATE_BOSS';
export const UPDATE_BOSS = 'UPDATE_BOSS';
export const GET_BOSS = 'GET_BOSS';



export const fetchUser = () => {
    return async (dispatch, getState) => {
        try {
            const bssId = getState().auth.userId;
            const response = await fetch(`https://bigboss-3916b-default-rtdb.firebaseio.com/users.json`);

            if (!response.ok) {
                throw new Error('Hatalı işlem!');
            }

            const resData = await response.json();
            const loadedBoss = [];

            for (const key in resData) {
                if (resData[key].bossId === bssId) {
                    loadedBoss.push(new Boss(
                        key,
                        resData[key].bossId,
                        resData[key].imageUrl,
                        resData[key].name,
                        resData[key].surname,
                        resData[key].email,
                        resData[key].phoneNumber
                    ));
                }
            }
            dispatch({ type: GET_BOSS, bosses: loadedBoss });
        } catch (err) {
            throw err;
        }

    };
};

export const uploadUserAvatar = (uri) => {
    return async (dispatch, getState) => {
        try {
            const bossId = getState().auth.userId;
            const response = await fetch(uri);
            const blob = await response.blob();
            var ref = Firebase.storage().ref('user-profile/').child(bossId);
            const task = ref.put(blob);
            return new Promise((resolve, reject) => {
                task.on('state_changed', () => { }, reject,
                    () => resolve(task.snapshot.ref.getDownloadURL()));
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

}

export const updateUserAvatar = (uri) => {
    return async (dispatch, getState) => {
        try {
            const bossId = getState().auth.userId;
            const response = await fetch(uri);
            const blob = await response.blob();
            var ref = Firebase.storage().ref('user-profile/').child(bossId);
            const task = ref.put(blob);
            return new Promise((resolve, reject) => {
                task.on('state_changed', () => { }, reject,
                    () => resolve(task.snapshot.ref.getDownloadURL()));
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

}



export const createUser = (imageUrl, name, surname, email, phoneNumber) => {
    return async (dispatch, getState) => {
        const bossId = getState().auth.userId;
        const response = await fetch(`https://bigboss-3916b-default-rtdb.firebaseio.com/users.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bossId,
                imageUrl,
                name,
                surname,
                email,
                phoneNumber
            })
        });
        await response.json();
        dispatch({
            type: CREATE_BOSS,
            bossData: {
                bossId,
                imageUrl,
                name,
                surname,
                email,
                phoneNumber
            }
        });

        const update = {
            displayName: name + ' ' + surname,
            phoneNumber: phoneNumber,
            photoURL: imageUrl,
        };

        await Firebase.auth().currentUser.updateProfile(update);

    };


};


export const updateUser = (id, bossId, imageUrl, name, surname, email, phoneNumber) => {
    return async (dispatch) => {
        await fetch(`https://bigboss-3916b-default-rtdb.firebaseio.com/users/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bossId,
                imageUrl,
                name,
                surname,
                email,
                phoneNumber
            })
        });

        dispatch({
            type: UPDATE_BOSS,
            bId: id,
            bossData: {
                bossId,
                imageUrl,
                name,
                surname,
                email,
                phoneNumber  
            }
        });

        const update = {
            displayName: name + ' ' + surname,
            phoneNumber: phoneNumber,
            photoURL: imageUrl,
        };

        await Firebase.auth().currentUser.updateProfile(update);
    };
};
