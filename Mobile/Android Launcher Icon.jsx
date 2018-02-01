/*!
 * Android App Icon Export Script v0.1 for Adobe Illustrator
 * https://gitlab.com/tmygn/adobe-illustrator-scripts
 *
 * Copyright 2018 - Thomas A. Silcher
 * Released under the GNU GPL v3 license
 * http://www.gnu.org/licenses/gpl.txt
 *
 * Date: Feb 1st 2018
 */

var document = app.activeDocument;
var folder = Folder.selectDialog();
var artboard;

/* This script requires an artboard to be 48x48 px in size. */
if (document && folder)
{
	var skip = false;
	artboard = 0;

	if (document.artboards.length > 1) {
		var input = prompt("Multiple artboards\nThis document contains multiple artboards. Which artboard would you like to export? (e.g. \"1\")", "1");
		if (!input)
			skip = true;

		artboard = parseInt(input) - 1;
		if (artboard > document.artboards.length-1 || artboard < 0) {
			alert("This arboard does not exist!\nI'll try with the first one instead... =)");
			artboard = 0;
		}
	}

	if (!skip) {
		var documentName = document.name.replace(".ai", "");
	
		/* Guidelines: https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html */
		/* Android */
		exportToPNG(75,   "ic_launcher", "", documentName, "mipmap-ldpi");	  // 36x36	 (Low density screen)
		exportToPNG(100,  "ic_launcher", "", documentName, "mipmap-mdpi");	  // 48x48   (Medium density screen)
		exportToPNG(150,  "ic_launcher", "", documentName, "mipmap-hdpi");	  // 72x72	 (High density screen)
		exportToPNG(200,  "ic_launcher", "", documentName, "mipmap-xhdpi");	  // 96x96	 (Extra-high density screen)
		exportToPNG(300,  "ic_launcher", "", documentName, "mipmap-xxhdpi");  // 144x144 (Extra-extra-high density screen)
		exportToPNG(400,  "ic_launcher", "", documentName, "mipmap-xxxhdpi"); // 192x192 (Extra-extra-extra-high density screen)
		/* Optional but recommended */
		exportToPNG(1066, "ic_launcher", "", documentName, "Google Play");	  // 512x512 (High-res icon für Goole Play Store)
	}
}

function exportToPNG(scaleTo, layerName, densitySuffix, folderName, subfolderName)
{
	try {
		var i, file, options;
		var myFolder = new Folder(folder.absoluteURI + "/" + folderName + "/" + subfolderName);

		if (!myFolder.exists)
			myFolder.create();

		document.artboards.setActiveArtboardIndex(artboard);

		file = new File(myFolder.fsName + "/" + layerName + densitySuffix + ".png");
		
		options = new ExportOptionsPNG24();
		options.transparency     = true;
		options.antiAliasing     = true;
		options.artBoardClipping = true;
		options.verticalScale    = scaleTo;
		options.horizontalScale  = scaleTo;
		
		document.exportFile(file, ExportType.PNG24, options);
	} catch(e) {  
		alert( e.message, "Script Alert", true);  
	}
}