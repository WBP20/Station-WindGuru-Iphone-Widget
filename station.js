let req = await new Request("https://www.windguru.cz/int/wgsapi.php?uid=0080A3AFE725&password=0b8ff2b56e98b5d4fb4fcdd6145bd003&q=station_data_current"
);

let json = await req.loadJSON();

let req2 = await new Request("http://wbureau.free.fr/IMG/logo4.PNG")

let img = await req2.loadImage()
 
//log(json);

let windmin = parseFloat(JSON.stringify(json.wind_min));
let windmax = parseFloat(JSON.stringify(json.wind_max)); 
let windmoy = parseFloat(JSON.stringify(json.wind_avg));
let winddir = parseFloat(JSON.stringify(json.wind_direction)) ; 
let temp = JSON.stringify(json.temperature) ;

windmin = Math.round(windmin*10)/10 ;
windmax = Math.round(windmax*10)/10 ;
windmoy = Math.round(windmoy*10)/10 ;
winddir = Math.round(winddir);

let w = new ListWidget();

let padding = 20;// 
w.setPadding(padding, padding, padding, padding);

let gradient = new LinearGradient();
gradient.locations = [0, 1];
gradient.colors = [
new Color("141414"),
new Color("13233F")
]
w.backgroundGradient = gradient ;

w.url = "https://www.windguru.cz/28999" ;

let refresh = Date.now() + 1000*30 ;

w.refreshAfterDate = new Date(refresh);

let stack = w.addStack();
stack.layoutVertically();

let stack2 = stack.addStack();
stack2.layoutHorizontally();

let imgstack = stack2.addImage(img);
imgstack.imageSize = new Size(40, 40);
stack2.addSpacer(9);

let stack3 = stack2.addStack();
stack3.layoutVertically();

let header1 = stack3.addText("voilerie".toUpperCase());
header1.font = Font.mediumSystemFont(10);

let header2 = stack3.addText("biscay".toUpperCase());
header2.font = Font.mediumSystemFont(10);

stack3.addSpacer(2);

let header3 = stack3.addText("Piriac/mer ".toUpperCase());
header3.font = Font.mediumSystemFont(10);

w.addSpacer(8);

let min = w.addText("Wmin : " + windmin + " knts");
min.font = Font.mediumSystemFont(12);
let max = w.addText("Wmax : " + windmax + " knts");
max.font = Font.mediumSystemFont(12);
let moy = w.addText("Wmoy : " + windmoy + " knts");
moy.font = Font.mediumSystemFont(12);
let dir = w.addText("Dir : " + winddir + "º");
dir.font = Font.mediumSystemFont(12);
let tempe = w.addText("Temp : " + temp + "ºC");
tempe.font = Font.mediumSystemFont(12);

Script.setWidget(w);
Script.complete();
w.presentSmall();
