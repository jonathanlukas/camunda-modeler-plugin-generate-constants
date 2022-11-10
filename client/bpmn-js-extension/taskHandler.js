export default function (context) {
    if(context.element.topic){
        const externalTaskTopic = context.element.topic
        console.log(`External Task Topic found: ${externalTaskTopic}`);
        if(!context.result.externalTaskTopics.includes(externalTaskTopic)){
            context.result.externalTaskTopics.push(externalTaskTopic);
            }
       
    }

    if(context.element.delegateExpression){
        const delegateExpression = context.element.delegateExpression
        console.log(`Delegate Expression found: ${delegateExpression}`);
        if(!context.result.delegateExpressions.includes(delegateExpression)){
            context.result.delegateExpressions.push(delegateExpression);
        }
        
    }

    if (context.element.class){
        const javaClass = context.element.class;
        console.log(`Java Class found: ${javaClass}`);
        if(!context.result.javaClasses.includes(javaClass)){
            context.result.javaClasses.push(javaClass);
        }
    }

    if(context.element.extensionElements && context.element.extensionElements.values && context.element.extensionElements.values[0] && context.element.extensionElements.values[0].type) {
        const jobType = context.element.extensionElements.values[0].type;
        console.log(`Job Type found: ${jobType}`);
        if(!context.result.jobTypes.includes(jobType)){
            context.result.jobTypes.push(jobType);
        }
    }

}