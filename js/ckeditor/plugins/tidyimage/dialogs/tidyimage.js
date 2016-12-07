/* TidyCMS image plugin */

'use strict';

CKEDITOR.dialog.add( 'tidyimage', function( editor ) {
	
	var lang = editor.lang.tidyimage,
		commonLang = editor.lang.common;
	
	if ( typeof lang.dir == 'undefined' ) lang.dir = 'ltr';
	
	function onChangeSrc() {
		if ( !isset(tidy.editor.imageDialog) || !tidy.editor.imageDialog.changeActive ) return;
		var me = tidy.editor.imageDialog;
		
		//add slash hack - workaround
		//var value = this.getValue();
		//if ( value.substr(0, 14) == 'tidycms/files/' ) value = '/'+value;
		
		if ( me.imgmode == 'img' ) {
			me.$image.attr('src', this.getValue());
		} else {
			me.$image.css('background-image', 'url('+this.getValue()+')');			
		}
		me.imageModified = true;
	}
	
	var hasFileBrowser = !!( editor.config.filebrowserImageBrowseUrl || editor.config.filebrowserBrowseUrl ),
		srcBoxChildren = [
			{
				id: 'src',
				type: 'text',
				label: commonLang.url,
				onKeyup: onChangeSrc,
				onChange: onChangeSrc,
				setup: function( widget ) {
					this.setValue( widget.data.src );
				},
				commit: function( widget ) {
					widget.setData( 'src', this.getValue() );
				},
				validate: CKEDITOR.dialog.validate.notEmpty( lang.urlMissing )
			}
		];

	if ( hasFileBrowser ) {
		srcBoxChildren.push( {
			type: 'button',
			id: 'browse',
			// v-align with the 'txtUrl' field.
			// TODO: We need something better than a fixed size here.
			style: 'display:inline-block;margin-top:16px;',
			align: 'center',
			label: editor.lang.common.browseServer,
			hidden: true,
			filebrowser: 'info:src'
		} );
	}

	return {
		title: lang.title,
		minWidth: 250,
		minHeight: 100,
		onLoad: function() {
			//console.log('onLoad', this);
		},
		onShow: function() {
			this.imageModified = false;
			this.imgmode = ( this.$image.prop('tagName') == 'IMG' ) ? 'img' : 'block';
			
			this.inputs = {
				src: this.getContentElement( 'info', 'src' ),
				alt: this.getContentElement( 'info', 'alt' ),
			};
			
			tidy.editor.imageDialog = this;
			this.$dialog = $(tidy.editor.imageDialog.parts.dialog.$); 
			
			if ( this.imgmode == 'img' ) {
				this.inputs.src.setValue(this.$image.attr('src'));
				this.inputs.alt.setValue(this.$image.attr('alt'));
			} else {
				this.$dialog.find('input:eq(1)').parents('tr:first').hide();
				this.bgurl = this.$image.css('background-image').replace('url', '').slice(1, -1).trim();
				this.inputs.src.setValue(this.bgurl);
			}
			this.changeActive = true;
			
			/*
			var iframe = this.$dialog.find('iframe')[0];
			$(iframe.contentDocument).find('input').on('change', function(){
				tidy.editor.imageDialog.$dialog.find('.cke_dialog_ui_fileButton').trigger('click');
			});
			*/
			
			
		},
		onCancel: function(){
			var me = tidy.editor.imageDialog;
			
			if ( me.imgmode == 'img' ) {
				if ( me.$image.attr('src') != me.$image.data('tidy-old-src') ) me.$image.attr('src', me.$image.data('tidy-old-src'));
				if ( me.$image.attr('alt') != me.$image.data('tidy-old-alt') ) me.$image.attr('alt', me.$image.data('tidy-old-alt'));
			} else {
				if ( me.$image.css('background-image') != me.$image.data('tidy-old-bgimg') ) me.$image.css('background-image', me.$image.data('tidy-old-bgimg'));
			}
			var aid = me.$image.attr('data-aid');
			if ( isset(tidy.editor.modified.images[aid]) ) delete tidy.editor.modified.images[aid];
			this.imageModified = false;
		},
		onOk: function(){
			var me = tidy.editor.imageDialog;
			var aid = me.$image.attr('data-aid');
			var modified = false;
			
			if ( me.imgmode == 'img' ) {
			
				if ( me.$image.data('tidy-old-src') != me.inputs.src.getValue() ) {
					me.$image.attr('src', me.inputs.src.getValue());
					modified = true;
				}
				if ( me.inputs.alt.getValue() != me.$image.attr('alt') ) {
					me.$image.attr('alt', me.inputs.alt.getValue());
					modified = true;
				}
				if ( modified ) {
					var mod = {
						$target: me.$image,
						oldsrc: me.$image.data('tidy-old-src'),
						src: me.$image.attr('src'),
						alt: me.$image.attr('alt'),
					};
					tidy.editor.addChangedImage(aid, mod);
				} else {
					if ( me.$image.data('tidy-old-src') == me.$image.attr('src') &&
						 me.$image.data('tidy-old-alt') == me.$image.attr('alt') ) tidy.editor.removeChangedImage(aid); 
						 //delete tidy.editor.modified.images[aid];
				}
				
			} else {
				if ( me.bgurl != me.inputs.src.getValue() ) {
					setTimeout(function(){
						me.$image.css('background-image', 'url('+me.inputs.src.getValue()+')');	
						me.$image.data('tidy-old-bgimg', 'url('+me.inputs.src.getValue()+')');
					}, 500);
					modified = true;
					tidy.editor.eventTidyElementChanged(null, me.$image[0]);
				}
			}
			this.imageModified = false;
			
		},
		contents: [
			{
				id: 'info',
				label: lang.infoTab,
				elements: [
					{
						type: 'vbox',
						padding: 0,
						children: [
							{
								type: 'hbox',
								widths: [ '100%' ],
								children: srcBoxChildren
							}
						]
					},
					{
						id: 'alt',
						type: 'text',
						label: lang.alt,
						setup: function( widget ) {
							this.setValue( widget.data.alt );
						},
						commit: function( widget ) {
							widget.setData( 'alt', this.getValue() );
						}
					},
				]
			},
			{
				id: 'Upload',
				hidden: true,
				filebrowser: 'uploadButton',
				label: lang.uploadTab,
				elements: [
					{
						type: 'file',
						id: 'upload',
						label: lang.btnUpload,
						style: 'height:40px'
					},
					{
						type: 'fileButton',
						id: 'uploadButton',
						filebrowser: 'info:src',
						label: lang.btnUpload,
						'for': [ 'Upload', 'upload' ]
					}
				]
			}
		]
	};
} );