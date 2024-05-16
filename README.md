# Install

This is a lib for plc communication.<br>
Currently is support panasonic plc, will add omron plc later on.<br>
Install via npm<br>
npm i plcjs<br>

# Usage
The lib offers a serial command, you could send code via serial, ether port, even remote serial port.<br>


`const panasonic = require("../plcjs");`<br>
`a = new panasonic;`<br>
`console.log(a.PanasonicVer());`<br>

You could see the output of the mewtocol command string. And use this string sent to PLC via serial port or TCP etc.
