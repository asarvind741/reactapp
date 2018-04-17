import { SUBMIT_QUIZ } from './types';

export function submitQuiz(data){
    console.log("user, userinfo", data);
    return {
        type: SUBMIT_QUIZ,
        data
    }

}