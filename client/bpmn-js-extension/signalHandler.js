export default function (context) {
  if (
    context.element.eventDefinitions &&
    context.element.eventDefinitions[0] &&
    context.element.eventDefinitions[0].signalRef
  ) {
    const signalName = context.element.eventDefinitions[0].signalRef.name;
    console.log(`Signal found: ${signalName}`);
    if (!context.result.signals.includes(signalName)) {
      context.result.signals.push(signalName);
    }
  }
}
