import { schedule } from "node-cron";

export function startSchedule(){

}

export class Schedule {
    
    runJob(fun){
        schedule("* * * * *", fun)
    }
}
