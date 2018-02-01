/*!
 * Mac App Icon Export Script v0.1 for Adobe Illustrator
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
	
		/* Guidelines: https://developer.apple.com/macos/human-interface-guidelines/icons-and-images/app-icon */
		/* Mac */
		exportToPNG(40,   "Mac 16pt",  "",    documentName, ""); // 16x16 px
		exportToPNG(80,   "Mac 16pt",  "@2x", documentName, ""); // 32x32 px
		exportToPNG(80,   "Mac 32pt",  "",    documentName, ""); // 32x32 px
		exportToPNG(160,  "Mac 32pt",  "@2x", documentName, ""); // 64x64 px
		exportToPNG(320,  "Mac 128pt", "",    documentName, ""); // 128x128 px
		exportToPNG(640,  "Mac 128pt", "@2x", documentName, ""); // 256x256 px
		exportToPNG(640,  "Mac 256pt", "",    documentName, ""); // 256x256 px
		exportToPNG(1280, "Mac 256pt", "@2x", documentName, ""); // 512x512 px
		exportToPNG(1280, "Mac 512pt", "",    documentName, ""); // 512x512 px
		exportToPNG(2560, "Mac 512pt", "@2x", documentName, ""); // 1024x1024 px
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