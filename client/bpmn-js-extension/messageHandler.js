export default function (context) {
    if(context.element.eventDefinitions && context.element.eventDefinitions[0].messageRef){
        const messageName = context.element.eventDefinitions[0].messageRef.name
        console.log(`Message found: ${messageName}`);
        if(!context.result.messages.includes(messageName)){
        context.result.messages.push(messageName);
        }
    }
}

//context.element.messageRef && context.element.messageRef.name