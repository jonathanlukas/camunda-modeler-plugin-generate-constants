export default function (context) {
    if(context.element.eventDefinitions && context.element.eventDefinitions[0].messageRef){
        console.log(`Message found: ${context.element.eventDefinitions[0].messageRef.name}`);
        const messageName = context.element.eventDefinitions[0].messageRef.name
        if(!context.result.messages.includes(messageName)){
        context.result.messages.push(messageName);
        }
    }
}

//context.element.messageRef && context.element.messageRef.name