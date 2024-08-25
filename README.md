# Instructions

- Download GitHub Desktop - https://desktop.github.com/download/
- Download VS Code - https://code.visualstudio.com/
- Install Live Server Extension (used for automatic refresh of webpage, results can be seen immediatelly)
- Clone repository - https://github.com/mroglic/mandala_workshop
- Our work will be in ***workshop*** folder
- Create folder with your name inside workshop folder
- Copy "sender.html" and "sender.js" from any folder inside ***templates*** 
- Our drawing code will be only inside ***drawSymbol()***
- At the end of ***drawSymbol()*** call ***CD.sendAllCommands();***
- Once we are satisfied with mandala, we generate gcode from our drawing and send it to robot for execution

## Use these functions

```js

// choose color
let line_color = [233, 29, 98];

// line
CD.line(startX, startY, endX, endY);

// circle
CD.circle(centerX, centerY, diameter);

// rectangle
CD.rect(rectX, rectY, width, height);
CD.sg.rectMode(CORNER);
CD.sg.rectMode(CENTER);

```



 