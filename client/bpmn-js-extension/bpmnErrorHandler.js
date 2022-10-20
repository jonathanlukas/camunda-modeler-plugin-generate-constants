export default function (context) {
    if(context.element.eventDefinitions && context.element.eventDefinitions[0].errorRef){
        const bpmnErrorCode = context.element.eventDefinitions[0].errorRef.errorCode;
        console.log(`BPMN Error found: ${bpmnErrorCode}`);        
        if(!context.result.bpmnErrorCodes.includes(bpmnErrorCode)){
        context.result.bpmnErrorCodes.push(bpmnErrorCode);
        }
    }
}