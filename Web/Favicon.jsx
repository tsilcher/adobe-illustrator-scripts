/*!
 * Favicon Export Script v0.1 for Adobe Illustrator
 * https://gitlab.com/tmygn/adobe-illustrator-scripts
 *
 * Copyright 2017 - Thomas A. Silcher
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 * Date: Dec 11th 2017
 */


/* This script required an artboard to be 16x16 px in size. */
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

		exportToSVG(		"favicon", "any", documentName, "icon");			//  ----- --    SVG supported in Firefox 41+

		exportToPNG(100,	"favicon", 16,	  documentName, "icon"); 			//  16x16 px  standard for most desktop browsers
		exportToPNG(200,	"favicon", 32,	  documentName, "icon"); 			//  32x32 px  standard for most desktop browsers
		exportToPNG(400,	"favicon", 64,	  documentName, "icon"); 			//  64x64 px  standard for most desktop browsers
		exportToPNG(600,	"favicon", 96,	  documentName, "icon"); 			//  96x96 px  GoogleTV icon
		exportToPNG(1000,	"favicon", 160,	  documentName, "icon");			// 160x160 px ???
		exportToPNG(1225,	"favicon", 196,	  documentName, "icon"); 			// 196x196 px Chrome for Android home screen icon
		exportToPNG(1425,	"favicon", 228,	  documentName, "icon"); 			// 228x228 px Opera Coast icon

		exportToPNG(356,	"favicon", 57,	  documentName, "apple-touch-icon"); // 57x57 px non-retina iPhone pre iOS 7
		exportToPNG(450,	"favicon", 72,	  documentName, "apple-touch-icon"); // 72x72 px non-retina iPad pre iOS 7
		exportToPNG(475,	"favicon", 76,	  documentName, "apple-touch-icon"); // 76x76 px non-retina iPad iOS 7
		exportToPNG(712,	"favicon", 114,	  documentName, "apple-touch-icon"); // 114x114 px retina iPhone pre iOS 7
		exportToPNG(750,	"favicon", 120,	  documentName, "apple-touch-icon"); // 120x120 px retina iPhone iOS 7
		exportToPNG(900,	"favicon", 144,	  documentName, "apple-touch-icon"); // 144x144 px retina iPad pre iOS 7
		exportToPNG(950,	"favicon", 152,	  documentName, "apple-touch-icon"); // 152x152 px retina iPad iOS 7
		exportToPNG(1125,	"favicon", 180,	  documentName, "apple-touch-icon"); // 180x180 px retina HD iPhone 6 Plus iOS 8+
	}
}

function exportToPNG(scaleTo, layerName, size, folderName, relationship) {
	try {  
		var i, file, options;
		var myFolder = new Folder(folder.absoluteURI + "/" + folderName);

		if (!myFolder.exists)
			myFolder.create();

		document.artboards.setActiveArtboardIndex(artboard);

		file = new File(myFolder.fsName + "/" + layerName + "-" + size + ".png");
		
		options = new ExportOptionsPNG24();
		options.transparency     = true;
		options.antiAliasing     = false;
		options.artBoardClipping = true;
		options.verticalScale    = scaleTo;
		options.horizontalScale  = scaleTo;
		
		document.exportFile(file, ExportType.PNG24, options);
	} catch(e) {  
		alert( e.message, "Script Alert", true);  
	}
}
  
function exportToSVG(layerName, size, folderName, relationship) {
	try {  
		var i, file, options;
		var myFolder = new Folder(folder.absoluteURI + "/" + folderName);

		if (!myFolder.exists)
			myFolder.create();

		file = new File(myFolder.fsName + "/" + layerName + ".svg");

		options = new ExportOptionsWebOptimizedSVG();
		options.saveMultipleArtboards = true;
		options.artboardRange 		  = artboard+1;
		options.fontType			  = SVGFontType.OUTLINEFONT;
		options.svgId				  = SVGIdType.SVGIDREGULAR;
		options.coordinatePrecision	  = 2;
		options.svgMinify			  = true;
		options.svgResponsive		  = true;

		document.exportFile(file, ExportType.WOSVG, options);
	} catch(e) {  
		alert( e.message, "Script Alert", true);  
	}
}  