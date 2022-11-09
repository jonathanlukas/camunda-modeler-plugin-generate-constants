export default function (context) {
  let messageName = undefined;
  if (context.element.messageRef) {
    messageName = context.element.messageRef.name;
  }
  if (
    context.element.eventDefinitions &&
    context.element.eventDefinitions[0] &&
    context.element.eventDefinitions[0].messageRef
  ) {
    messageName = context.element.eventDefinitions[0].messageRef.name;
  }
  if (messageName) {
    console.log(`Message found: ${messageName}`);
    if (!context.result.messages.includes(messageName)) {
      context.result.messages.push(messageName);
    }
  }
}
