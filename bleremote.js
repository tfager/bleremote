var presses = 0;
var command1Index = 0;
var actions = [ "viaplay", "hbo", "netflix", "volume_up", "volume_down", "drums", "computer_audio", "computer", "chromecast", "tv_off" ];

function sendCommand(index) {
    presses++;
    var str = presses.toString() + ":" + actions[index];
    NRF.setAdvertising({}, { manufacturer: 0x0590, manufacturerData: str });
}

function sendCommand1() {
    sendCommand(command1Index);
}

function sendCommand2() {
    sendCommand(command1Index+1);
}

function redrawScreen() {
    g.clear();
    g.setFont("Vector", 20);
    g.drawString(actions[command1Index], g.getWidth()-120, 30);
    g.drawString(actions[command1Index+1], g.getWidth()-120, 100);
    g.drawString("Next", g.getWidth()-120, 170);
}

function nextCommands() {
    command1Index++;
    if (command1Index > actions.length-2) {
        command1Index = 0;
    }
    redrawScreen();
}

setWatch(sendCommand1, BTN, { edge: "rising", debounce: 50, repeat: true });
setWatch(sendCommand2, BTN2, { edge: "rising", debounce: 50, repeat: true });
setWatch(nextCommands, BTN3, { edge: "rising", debounce: 50, repeat: true });

redrawScreen();
