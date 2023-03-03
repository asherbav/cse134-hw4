//import DOMPurify from 'node_modules/isomorphic-DOMPurify';

const alertButton = document.getElementById("alert-button");
const alertDialog = document.getElementById('alert-dialog');
const confirmButton = document.getElementById("confirm-button");
const confirmDialog = document.getElementById("confirm-dialog");
const promptButton = document.getElementById("prompt-button");
const promptDialog = document.getElementById("prompt-dialog");

const output = document.getElementById('prompt-output');
const promptResponse = document.getElementById("prompt-input");
const promptCancel = document.getElementById("prompt-cancel");
const promptOk = document.getElementById("prompt-ok");


/*function clean(dirty){
    return DOMPurify.sanitize(dirty);
} */

// "Show the dialog" button opens the <dialog> modally
alertButton.addEventListener("click", () => {
    output.value = ``;
    alertDialog.showModal();
});

confirmButton.addEventListener("click", () => {
    output.value = ``;
    confirmDialog.showModal();
});

// "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
confirmDialog.addEventListener('close', () => {
    output.value = `Confirm Result: ${confirmDialog.returnValue}.`;
  });

promptButton.addEventListener("click", () => {
    output.value = ``;
    promptDialog.showModal();
});

// "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
promptOk.addEventListener('click', () => {
    let input = promptResponse.value;
    if (input === null ) {
        output.value = `Prompt Result: User didn't enter anything`;
    }
    else{
        //input = clean(input);
        output.value = `Prompt Result: ${input}`;
    }

  });

promptCancel.addEventListener('click', () => {
    output.value = `Prompt Result: User didn't enter anything`;
    
  });