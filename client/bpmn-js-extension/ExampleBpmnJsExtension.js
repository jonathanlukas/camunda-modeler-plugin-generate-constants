/**
 * A bpmn-js service that provides the actual plug-in feature.
 *
 * Checkout the bpmn-js examples to learn about its capabilities
 * and the extension points it offers:
 *
 * https://github.com/bpmn-io/bpmn-js-examples
 */
import MessageHandler from './messageHandler.js';

const handlers = [
  MessageHandler
]

export default function ExampleBpmnJsExtension(elementRegistry, editorActions, canvas, modeling) {

  editorActions.register({
    "generateConstants:java": function() {
      parse();
    },
    "generateConstants:python": function() {
      console.log("yeah!!");
    }
  });

  const parse = () => {
    const result = {
      messages: [],
      
    };
    var elements = elementRegistry._elements;
  Object.keys(elements).forEach(function(key) {
      var businessObject = elements[key].element.businessObject;
      const context = {
        element: businessObject,
        result: result
      };
      handlers.forEach(h => h(context));
  });
  console.log(result);
  };
}

ExampleBpmnJsExtension.$inject = [ 'elementRegistry', 'editorActions', 'canvas', 'modeling' ];