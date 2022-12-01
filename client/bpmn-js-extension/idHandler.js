export default function (context) {
    if(context.element.$type.match("Task")){
        const taskId = context.element.id
        console.log(`Task with Id: ${taskId}`);
        if(!context.result.taskIds.includes(taskId)){
            context.result.taskIds.push(taskId);
            }
    }
    else if(context.element.$type.match("Event")){
        const eventId = context.element.id
        console.log(`Event Id found: ${eventId}`);
        if(!context.result.eventIds.includes(eventId)){
            context.result.eventIds.push(eventId);
        }
    }
    else if(context.element.$type.match("Process")){
        const processID = context.element.id
        console.log(`Process with Id:  ${processID}`);
        if(!context.result.processIds.includes(processID)){
            context.result.processIds.push(processID);
        }
    }

}