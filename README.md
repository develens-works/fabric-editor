# Key Binds

```
$ Ctrl + Wheel for zoom in and zoom out (For Now)
$ Ctrl + Left Click to move the entire canvas
$ Ctrl + c to copy objects
$ Ctrl + v to paste objects
$ Ctrl + d to duplicate objects
$ Ctrl + z to undo objects
$ Ctrl + y to redo objects
$ Delete to delete objects
```

# Installation

```
$ npm install
```

Run the project:
```
$ npm run dev
```

# Standard Commit Name

### Type

- Feat     (new feature)
- Fix      (bug fix)
- Refactor (refactoring production code)
- Style    (formatting, missing semi colons, etc; no code change)
- Docs     (changes to documentation)
- Test     (adding or refactoring tests; no production code change)
- Chore    (updating bash scripts, git files etc; no production code change)

### Example

- Fix(Core/Components): Missing Type
- Feat(Core/Pages): New Home Pages

### How can i submit new commit?

- You can use this command for commit
```
$ npm install -g gitmoji-cli
$ git add .
$ gitmoji -c

after use this command you can see this message
? Choose a gitmoji: (Use arrow keys)

then you can choose your commit type

after choose your commit type you can see this message
? Enter the commit title:
```

# Code Style

- Tab width 4
- Bracket Alman
- Single Quotation

#### Wrong Code Style

```
function test(){
    return 'test'
}

const test = () => {
    return 'test'
}

const obj = {
    name: 'test',
    age: 20
}

{'Salam'}

<Component size={2}/>
```

#### Correct Code Style

```
function test()
{
    return 'test'
}

const test = () =>
{
    return 'test'
}

const obj =
{
    name: 'test',
    age: 20
}

{ 'Salam' }

<Component size={ 2 } />
```

# Editors & IDE
### If you are using vscode make sure to install

- Eslint
- EditorConfig

- and make sure to disable vscode default formatter and prettier

# Folder Structure

### Assets

- This folder contains fonts and photos

### Components

- The components folder contains a set of UI sections such as buttons, custom input, medals, etc. that are shared and used among project files.

### Pages

- This folder actually reflects the routes of our program, with the interpretation that the name of the folder can be said, in fact, each file in this folder is called when loading a route, and the components created in the project are used in these pages. To be

### Layouts

- The layouts folder is almost identical to the Components folder. This includes reusable components that are used on pages.

- The difference is that the components in the layouts folder reflect parts of the page such as Footer, SideBar, and Header, while the components folder contains independent UI components such as buttons, forms, or input sections.

- Sometimes, a layout can consist of several components

### Services

- The services folder is inspired by the Angular architecture. Angular has a feature called Dependency Injection that allows us to inject a service anywhere in the project. Most of the time, a service is used to manage API integration.

### Redux

- If you decide to use redux in your project, the Store folder will appear. Inside, there is a sub-folder of actions and reducers for managing redux modes.

### Utils

- The utils folder is just a place to find some of the functional functions that are frequently used in the project. Files in the utils folder should only contain some functions such as date formatting, string conversion and so on.
