---
title: Codeblock voorbeelden
tags:
  - Welcome/test
difficulty: 3
---

# Read only

```javascript
const list = [1, 2, 3, 4];

list.forEach(e => console.log(e))

list.map(e => 'Element: ' + e).forEach(e => console.log(e))
```

# Runnable

```javascript runner
const list = [1, 2, 3, 4];

list.forEach(e => console.log(e))

list.map(e => 'Element: ' + e).forEach(e => console.log(e))
```

# Sandbox

```javascript sandbox
const list = [1, 2, 3, 4];

list.forEach(e => console.log(e))

list.map(e => 'Element: ' + e).forEach(e => console.log(e))
```
 
# Mermaid

```mermaid
classDiagram
	Class01 <|-- AveryLongClass : Cool
	Class03 *-- Class04
	Class05 o-- Class06
	Class07 .. Class08
	Class09 --> C2 : Where am i?
	Class09 --* C3
	Class09 --|> Class07
	Class07 : equals()
	Class07 : Object[] elementData
	Class01 : size()
	Class01 : int chimp
	Class01 : int gorilla
	Class08 <--> C2: Cool label
```