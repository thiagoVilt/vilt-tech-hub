export default function decorate(block) {
  const formRows = [...block.children];
  block.textContent = '';

  const form = document.createElement('form');
  form.classList.add('vilt-form');

  formRows.forEach((row) => {
    const [labelName, type, placeholder, isRequired] = row.children;
    const fieldWrapper = document.createElement('div');
    fieldWrapper.classList.add('form-field', `field-${type.textContent.trim().toLowerCase()}`);

    const label = document.createElement('label');
    label.textContent = labelName.textContent;

    let input;
    if (type.textContent.trim().toLowerCase() === 'textarea') {
      input = document.createElement('textarea');
    } else {
      input = document.createElement('input');
      input.type = type.textContent.trim().toLowerCase();
    }

    input.placeholder = placeholder.textContent;
    if (isRequired.textContent.trim().toLowerCase() === 'required') {
      input.required = true;
    }

    fieldWrapper.append(label, input);
    form.append(fieldWrapper);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Send Message';
  submitBtn.classList.add('form-submit');
  form.append(submitBtn);

  // Lógica de envio (Exemplo simples)
  form.onsubmit = (e) => {
    e.preventDefault();
    // alert('Thank you! Vilt Tech Hub will contact you soon.');
    form.reset();
  };

  block.append(form);
}
