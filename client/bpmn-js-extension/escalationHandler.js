export default function (context) {
  if (
    context.element.eventDefinitions &&
    context.element.eventDefinitions[0] &&
    context.element.eventDefinitions[0].escalationRef
  ) {
    const bpmnEscalationCode =
      context.element.eventDefinitions[0].escalationRef.escalationCode;
    console.log(`BPMN Escalation found: ${bpmnEscalationCode}`);
    if (!context.result.bpmnEscalationCodes.includes(bpmnEscalationCode)) {
      context.result.bpmnEscalationCodes.push(bpmnEscalationCode);
    }
  }
}
