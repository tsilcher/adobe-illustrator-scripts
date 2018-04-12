/*!
 * Favicon Export Script v0.1 for Adobe Illustrator
 * https://github.com/tsilcher/adobe-illustrator-scripts/
 *
 * Copyright 2018 - Thomas A. Silcher
 * Released under the GNU GPL v3 license
 * http://www.gnu.org/licenses/gpl.txt
 *
 * Date: Feb 1st 2018
 */


/* This script requires an artboard to be 16x16 px in size. */
var document = app.activeDocument;
var folder = Folder.selectDialog();
var documentName;
var artboard;
var html = new String();
var filePrefix = "favicon";
var assetPath = "/" + filePrefix + "s" + "/"

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
		documentName = document.name.replace(".ai", "");

		exportToSVG();							//  ----- --    SVG supported in Firefox 41+

		exportToPNG(100,  16,  "icon");			//  16x16 px  standard for most desktop browsers
		exportToPNG(200,  32,  "icon");			//  32x32 px  standard for most desktop browsers
		exportToPNG(400,  64,  "icon");			//  64x64 px  standard for most desktop browsers
		exportToPNG(600,  96,  "icon");			//  96x96 px  GoogleTV icon
		exportToPNG(1000, 160, "icon");			// 160x160 px ???
		exportToPNG(1225, 196, "icon");			// 196x196 px Chrome for Android home screen icon
		exportToPNG(1425, 228, "icon");			// 228x228 px Opera Coast icon

		exportToPNG(356,  57,  "apple-touch-icon"); // 57x57 px non-retina iPhone pre iOS 7
		exportToPNG(450,  72,  "apple-touch-icon"); // 72x72 px non-retina iPad pre iOS 7
		exportToPNG(475,  76,  "apple-touch-icon"); // 76x76 px non-retina iPad iOS 7
		exportToPNG(712,  114, "apple-touch-icon"); // 114x114 px retina iPhone pre iOS 7
		exportToPNG(750,  120, "apple-touch-icon"); // 120x120 px retina iPhone iOS 7
		exportToPNG(900,  144, "apple-touch-icon"); // 144x144 px retina iPad pre iOS 7
		exportToPNG(950,  152, "apple-touch-icon"); // 152x152 px retina iPad iOS 7
		exportToPNG(1125, 180, "apple-touch-icon"); // 180x180 px retina HD iPhone 6 Plus iOS 8+
	}

	/* Export HTML code */
	saveHTML(html, "favicon-head", documentName);
}

// <link rel="apple-touch-icon-precomposed" sizes="57x57" href="apple-touch-icon-57x57.png" />
// <link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-114x114.png" />
// <link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-72x72.png" />
// <link rel="apple-touch-icon-precomposed" sizes="144x144" href="apple-touch-icon-144x144.png" />
// <link rel="apple-touch-icon-precomposed" sizes="60x60" href="apple-touch-icon-60x60.png" />
// <link rel="apple-touch-icon-precomposed" sizes="120x120" href="apple-touch-icon-120x120.png" />
// <link rel="apple-touch-icon-precomposed" sizes="76x76" href="apple-touch-icon-76x76.png" />
// <link rel="apple-touch-icon-precomposed" sizes="152x152" href="apple-touch-icon-152x152.png" />
// <link rel="icon" type="image/png" href="favicon-196x196.png" sizes="196x196" />
// <link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96" />
// <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
// <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
// <link rel="icon" type="image/png" href="favicon-128.png" sizes="128x128" />
// <meta name="application-name" content="&nbsp;"/>
// <meta name="msapplication-TileColor" content="#FFFFFF" />
// <meta name="msapplication-TileImage" content="mstile-144x144.png" />
// <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
// <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
// <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
// <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
//<link rel="icon" type="image/svg+xml" href="http://www.w3.org/html/logo/downloads/HTML5_Badge.svg">

function generateHTML(relation, type, size, fileName) {
	switch(relation) {
    case "apple-touch-icon":
        html += "<link rel=" + '"' + relation + '"' + " sizes=" + '"' + size + "x" + size + '"' + " href=" + '"' + fileName + '"' + "/>\n"
        break;
    case "icon":
    	html += "<link rel=" + '"' + relation + '"' + " type=" + '"'+ type + '"' + (size ? (" sizes=" + '"' + size + "x" + size + '"') : "") + " href=" + '"' + fileName + '"' + "/>\n"
        break;
    default:
        alert("Unknown link relation " + '"' + relation + '"' + " specified for:\n" + fileName + ".");
	}
}

function saveHTML(content, fileName) {
	var myFolder = new Folder(folder.absoluteURI + "/" + documentName);

	if (!myFolder.exists)
		myFolder.create();

	file = new File(myFolder.fsName + "/" + fileName + ".html");
    file.open("w");  
    file.writeln(content);
    file.close();
}

function exportToPNG(scaleTo, size, relation) {
	try {  
		var i, file, options;
		var myFolder = new Folder(folder.absoluteURI + "/" + documentName);

		if (!myFolder.exists)
			myFolder.create();

		document.artboards.setActiveArtboardIndex(artboard);

		file = new File(myFolder.fsName + "/" + filePrefix + "-" + size + ".png");
		
		options = new ExportOptionsPNG24();
		options.transparency     = true;
		options.antiAliasing     = false;
		options.artBoardClipping = true;
		options.verticalScale    = scaleTo;
		options.horizontalScale  = scaleTo;
		
		document.exportFile(file, ExportType.PNG24, options);

		generateHTML(relation, "image/png", size, assetPath + filePrefix + "-" + size + ".png");
	} catch(e) {  
		alert( e.message, "Script Alert", true);  
	}
}
  
function exportToSVG() {
	try {  
		var i, file, options;
		var myFolder = new Folder(folder.absoluteURI + "/" + documentName);

		if (!myFolder.exists)
			myFolder.create();

		file = new File(myFolder.fsName + "/" + filePrefix + ".svg");

		options = new ExportOptionsWebOptimizedSVG();
		options.saveMultipleArtboards = true;
		options.artboardRange 		  = artboard+1;
		options.fontType			  = SVGFontType.OUTLINEFONT;
		options.svgId				  = SVGIdType.SVGIDREGULAR;
		options.coordinatePrecision	  = 2;
		options.svgMinify			  = true;
		options.svgResponsive		  = true;

		document.exportFile(file, ExportType.WOSVG, options);

		generateHTML("icon", "image/svg+xml", null, assetPath + filePrefix + ".svg");
	} catch(e) {  
		alert( e.message, "Script Alert", true);  
	}
}  