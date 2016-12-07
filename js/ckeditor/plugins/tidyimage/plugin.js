/* TidyCMS image plugin */

'use strict';

( function() {
	
	CKEDITOR.plugins.add( 'tidyimage', {
		lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn',
		requires: 'dialog',
		icons: 'image',
		hidpi: true,
		
		init: function( editor ) {
			//console.log('init', editor);
			CKEDITOR.dialog.add( 'tidyimage', this.path + 'dialogs/tidyimage.js' );
		},

		afterInit: function( editor ) {
			//console.log('afterInit', editor);
		}
	});
	
	CKEDITOR.plugins.tidyimage = {
		
	};
	
} )();

//CKEDITOR.config.tidyimage_captionedClass = 'image';