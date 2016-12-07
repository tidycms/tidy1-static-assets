/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.disableAutoInline = true;
CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config
	/*
	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];
	*/
	
	config.allowedContent = true; 
	config.enterMode = CKEDITOR.ENTER_BR;
	config.forcePasteAsPlainText = true; // default so content won't be manipulated on load
	config.basicEntities = true;
	config.entities = true;
	config.entities_latin = false;
	config.entities_greek = false;
	config.entities_processNumerical = false;
	
	config.filebrowserUploadUrl = 'server.php?c=editor&m=fileUpload',
	config.filebrowserImageUploadUrl = 'server.php?c=editor&m=fileUpload&type=image',
	
	/*
	config.toolbarGroups = [
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		//{ name: 'links' },
		//{ name: 'insert' },
		//{ name: 'links', items: ['link', 'image'] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
	];
	*/
	
	config.toolbar_TidyText = [
		[ 'PasteText', 'Format', ],
		[ 'Bold', 'Italic', 'Underline' ],
		//{ name: 'test', groups: [ 'align' ] },
		[ 'JustifyLeft','JustifyCenter', 'JustifyRight', 'JustifyBlock' ], //, 
		[ 'NumberedList', 'BulletedList', 'Indent', 'Outdent' ],
		[ 'Link', 'Image', 'Youtube' ],
		[ 'Undo', 'Redo' ],
		[ 'Sourcedialog' ]
	];
	config.toolbar = 'TidyText';
	/*
	config.codemirror = {
		enableSearchTools: false,
		showSearchButton: false,
		showFormatButton: false,
		showCommentButton: false,
		showUncommentButton: false,
	};
	*/
	config.extraPlugins = 'youtube,sourcedialog,tidyimage';
	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Subscript,Superscript';
	config.removePlugins = 'devtools,codemirror';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};
