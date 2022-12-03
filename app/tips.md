# Separate complex markup

Complex HTML must be kept out of logic functions

# Abstract what changes, keep what doesn't

Instead of this:

```js
if (completed) {
  return `<li>
    <div class="task_description">
    <label for="${task.id}">
        <input type="checkbox" id="${task.id}" class="check_done" checked />
        <span class="bubble ${task.type}"></span>
        ${task.value}
    </label>
    </div>
    <div class="fuctional_icons">
    <button><img src="edit.svg" alt="edit icon" /> </button>
    <button> <img src="delete.svg" alt="delete icon" /> </button>
    </div>
</li>`;
} else
  return `<li>
    <div class="task_description">
    <label for="${task.id}">
        <input type="checkbox" id="${task.id}" class="check_done" checked />
        <span class="bubble ${task.type}"></span>
        ${task.value}
    </label>
    </div>
    <div class="fuctional_icons">
    <button><img src="edit.svg" alt="edit icon" /> </button>
    <button> <img src="delete.svg" alt="delete icon" /> </button>
    </div>
</li>`;
```

Do this:

```js
if(completed) {
    return <li>
    <div class="task_description">
    <label for="${task.id}">
        <input type="checkbox" id="${task.id}" class="check_done" ${task.completed? "checked": ""} />
        <span class="bubble ${task.type}"></span>
        ${task.value}
    </label>
    </div>
    <div class="fuctional_icons">
    <button><img src="edit.svg" alt="edit icon" /> </button>
    <button> <img src="delete.svg" alt="delete icon" /> </button>
    </div>
</li>
}

```

# Custom Radio/Buttons

Approach 1:

Visibly hide the button itself, style border around it like https://moderncss.dev/pure-css-custom-styled-radio-buttons/#custom-radio-button-style

Approach 2 (KEEP AWAY YA M3RS, don't do it):

Position absolute z-index -9999 left -9999999

Approach 3:

Appearance: none, margin: 0, padding: 0, border: none, tabindex=0 on label

# ID Generation

Approach 1 (Complex):

Uniform ID generator like https://www.npmjs.com/package/nanoid

Approach 2 (Simplest):

savedTasks.length

Approach 3 (Bad for dev):

Date.now()

# Variable Definition

Use const until you need let

# Avoid unknown shortcuts

Use intellisense & autocomplete ya معرص

# Use bubbling instead of separate event listeners

Cases:

Have straight on interactive elements or consistent handling. `<button>text</button>` or every element has the same structure.

```html
<ul onClick>
  <button><img />text</button>
  <button><img />text</button>
  <button><img />text</button>
</ul>
```

# Accessibility for icons

<img src="edit.svg" alt="" role="presentation" />

role="presentation" ===> no need to alt in this case

# Multiple conditions on the same value

```js
if(
ev.target.tagName !== "button" ||
    ev.target.tagName !== "label" ||
    ev.target.tagName !== "input"
)
```

do this instead:

```js
if (!["button", "label", "input"].includes(ev.target.tagName)) return;
```

# Naming Issues

- Inconsistent id/class names (tasks-list, todo_task)
- Inconsistent function calls
- Unhelpful comments (وانت كده كده فاهم الكود اصلا)
- Components are Capitalized or use todoComponent for example

# Pure Functions

```js
const savedTasks = [];

function pureFunction(items) {
  items[0] = {}; // impure modify input
  console.log(); // impure sideeffect
  return Math.random(); // impure not same output for same input
  savedTasks = []; // impure modify outer scope

  return items.map((item) => item.name);
}

// Same input, same output
// Input is read-only. Don't modify input/parameters
// No side effects (print, storage, db, html response, modify outer scope)
```

# Highlight HTML strings

```js
const html = String.raw;

function Todo () {
    return html```<p></p>```
}
```