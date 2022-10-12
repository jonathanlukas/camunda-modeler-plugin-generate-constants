export default function (context) {
    if(context.element.messageRef && context.element.messageRef.name){
        console.log(`Message found: ${context.element.messageRef.name}`);
        context.result.messages.push(context.element.messageRef.name);
    }
}