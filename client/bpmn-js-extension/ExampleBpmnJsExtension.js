import MessageHandler from "./messageHandler.js";
import SignalHandler from "./signalHandler.js";
import BpmnErrorHandler from "./bpmnErrorHandler.js";
import TaskHandler from "./taskHandler.js";
import EscalationHandler from "./escalationHandler.js";
import IdHandler from "./idHandler.js";
import JavaGenerator from "./javaGenerator.js";

const handlers = [
  MessageHandler,
  SignalHandler,
  BpmnErrorHandler,
  TaskHandler,
  EscalationHandler,
  IdHandler,
];

const generators = {
  java: JavaGenerator,
};

export default function ExampleBpmnJsExtension(
  elementRegistry,
  editorActions,
  canvas,
  modeling
) {
  editorActions.register({
    "generateConstants:java": function () {
      generateConstants("java");
    },
    "generateConstants:python": function () {
      generateConstants("python");
    },
  });

  const generateConstants = (language) => {
    const result = parse();
    const generated = generators[language](result);
  };

  const parse = () => {
    const result = {
      messages: [],
      signals: [],
      bpmnErrorCodes: [],
      bpmnEscalationCodes: [],
      externalTaskTopics: [],
      delegateExpressions: [],
      javaClasses: [],
      jobTypes: [],
      elementIds: {},
    };
    var elements = elementRegistry._elements;
    Object.keys(elements).forEach(function (key) {
      var businessObject = elements[key].element.businessObject;
      const context = {
        element: businessObject,
        result: result,
      };
      handlers.forEach((h) => h(context));
    });
    console.log(result);
    return result;
  };
}

ExampleBpmnJsExtension.$inject = [
  "elementRegistry",
  "editorActions",
  "canvas",
  "modeling",
];
