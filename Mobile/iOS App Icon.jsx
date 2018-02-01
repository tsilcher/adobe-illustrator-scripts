/*!
 * iOS App Icon Export Script v0.1 for Adobe Illustrator
 * https://gitlab.com/tmygn/adobe-illustrator-scripts
 *
 * Copyright 2017 - Thomas A. Silcher
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 * Date: Dec 11th 2017
 */

/* This script required an artboard to be 40x40 px in size. */
var document = app.activeDocument;
var folder = Folder.selectDialog();
var artboard;

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
	
		/* Guidelines: https://developer.apple.com/library/content/qa/qa1686/_index.html */
		/* iPhone */
		exportToPNG(100,   "iPhone Notification iOS 7-11 20pt", 			  "@2x", documentName, ""); // 40x40 px
		exportToPNG(150,   "iPhone Notification iOS 7-11 20pt", 			  "@3x", documentName, ""); // 60x60 px
		exportToPNG(145,   "iPhone Spotlight iOS 5,6 Settings_iOS 5-11 29pt", "@2x", documentName, ""); // 58x58 px
		exportToPNG(217.5, "iPhone Spotlight iOS 5,6 Settings_iOS 5-11 29pt", "@3x", documentName, ""); // 87x87 px
		exportToPNG(200,   "iPhone Spotlight iOS 7-11 40pt", 				  "@2x", documentName, ""); // 80x80 px
		exportToPNG(300,   "iPhone Spotlight iOS 7-11 40pt", 				  "@3x", documentName, ""); // 120x120 px
		exportToPNG(300,   "iPhone App iOS 7-11 60pt", 						  "@2x", documentName, ""); // 120x120 px
		exportToPNG(450,   "iPhone App iOS 7-11 60pt", 						  "@3x", documentName, ""); // 180x180 px
		/* iPad */
		exportToPNG(50,    "iPad Notifications iOS 7-11 20pt", 				  "",    documentName, ""); // 20x20 px
		exportToPNG(100,   "iPad Notifications iOS 7-11 20pt", 				  "@2x", documentName, ""); // 40x40 px
		exportToPNG(72.5,  "iPad Settings iOS 5-11 29pt", 					  "",    documentName, ""); // 29x29 px
		exportToPNG(145,   "iPad Settings iOS 5-11 29pt", 					  "@2x", documentName, ""); // 58x58 px
		exportToPNG(100,   "iPad Spotlight iOS 7-11 40pt", 					  "",    documentName, ""); // 40x40 px
		exportToPNG(200,   "iPad Spotlight iOS 7-11 40pt", 					  "@2x", documentName, ""); // 80x80 px
		exportToPNG(190,   "iPad App iOS 7-11 76pt", 						  "",    documentName, ""); // 76x76 px
		exportToPNG(380,   "iPad App iOS 7-11 76pt", 						  "@2x", documentName, ""); // 152x152 px
		exportToPNG(417.5, "iPad Pro App iOS 9-11 83.5pt", 					  "@2x", documentName, ""); // 167x167 px
		/* CarPlay */
		exportToPNG(300,   "CarPlay 60pt", 									  "@2x", documentName, ""); // 120x120 px
		exportToPNG(450,   "CarPlay 60pt", 									  "@3x", documentName, ""); // 180x180 px
		/* Optional but recommended */
		exportToPNG(1280,  "iTunesArtwork", 								  "",    documentName, ""); // 512x512   App list in iTunes
		exportToPNG(2560,  "iTunesArtwork", 								  "@2x", documentName, ""); // 1024x1024 App list in iTunes on devices with retina display
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
		options.transparency     = false;
		options.antiAliasing     = false;
		options.artBoardClipping = true;
		options.verticalScale    = scaleTo;
		options.horizontalScale  = scaleTo;
		
		document.exportFile(file, ExportType.PNG24, options);
	} catch(e) {  
		alert( e.message, "Script Alert", true);  
	}
}