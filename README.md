# Install

This is a lib for plc communication.<br>
Currently is support panasonic plc.<br>
Install via npm<br>

# Usage
The lib offers a serial command, you could send code via serial, ether port, even remote serial port.<br>

```js
const panasonic = require("../plcjs");
a = new panasonic;
//Show the command that you planed to write
console.log(a.PanasonicVer());
```

You could see the output of the mewtocol command string. And use this string sent to PLC via serial port or TCP etc.
