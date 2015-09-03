'use strict';
var PipelineDoc = {

	init : function(config){

		this.mergeObjectRecursively(config, this.config);
		this.item.init();
		this.lightBox.init();
		this.tooltip.init();
		this.horizontalScrollin.init();
		this.keyControl.init();

		$(window).on('resize', function(){
			PipelineDoc.lightBox.resize();
		});

	},

	config : {
		idToStart : 0,
		actualId : 0,
		totalNumberOfBoxes : 0
	},

	mergeObjectRecursively : function(config, configDefault){
        var config = typeof config === 'object' ? config : {};
        for( var item in config ){

            if( config[item].constructor==Object ){
                this.mergeObjectRecursively( config[item], configDefault[item] );
            }else{
                configDefault[item] = config[item];
            }
        }
    },

	lightBox : {

		init : function(){
			this.resize();
			this.bindClick();
		},

		show : function(html){
			$('#overMaskContent').html( '<div id="overmaskCloseButton" ></div>' + html ) ;
			$('#overMaskContent').css('marginLeft', (100 + $(document).scrollLeft() ) + 'px');
			PipelineDoc.lightBox.bindClick();
			$('#overmask').stop().slideDown();
		},

		hide : function(){
			$('#overMaskContent').css('marginLeft', (100 + $(document).scrollLeft() )  + 'px');
			$('#overmask').stop().slideUp();
		},

		bindClick : function(){
			$('#overmaskCloseButton').on('click', function(){
				PipelineDoc.lightBox.hide();
			});
		},

		resize : function(){
			$('#overMaskContent').css('marginTop', '1%');
			$('#overMaskContent').css('width', ($(window).width() - 200) + 'px');
			$('#overmask').css('width', $(document).width());
		},

	},

	item : {

		init : function(){
			this.setActualIdToIdToStart();
			this.bindClick();
			this.getTotalOfBoxes();
		},

		setActualIdToIdToStart : function(){
			PipelineDoc.config.actualId = PipelineDoc.config.idToStart;
		},

		getTotalOfBoxes : function(){
			PipelineDoc.config.totalNumberOfBoxes = ($('.apDiv').size()-1);
		},

		bindClick : function(){

			$('.apDiv').click(function(e, data){

				data = data === undefined ? false : data;

				$('.apDivActive').removeClass('apDivActive');
				$(this).addClass('apDivActive');

				PipelineDoc.config.actualId = parseInt( $(this).attr('id').replace('apDiv', ''), 10) ;
				var objthis = $(this);

				if (e.originalEvent !== undefined){
					PipelineDoc.lightBox.show( objthis.html());
				} else if (data.from === 'key39' || data.from === 'key37'){

					setTimeout(function(){
						objthis.css('opacity', '0.1');
					}, 300);

					setTimeout(function(){
						objthis.css('opacity', '0.5');
					}, 400);

					setTimeout(function(){
						objthis.css('opacity', '1');
					}, 500);

					setTimeout(function(){
						objthis.css('opacity', '0.1');
					}, 600);

					setTimeout(function(){
						objthis.css('opacity', '0.5');
					}, 700);

					setTimeout(function(){
						objthis.css('opacity', '1');
					}, 800);

					setTimeout(function(){
						PipelineDoc.lightBox.show( objthis.html() );
					}, 1200);

				}else if( data.from === 'key38' ){
					PipelineDoc.lightBox.show( objthis.html() );
				}


			});

		}
	},

	horizontalScrollin : {

		init : function(){
			this.transferVerticalToHorizontalScroll(100);
			this.autoHideMouseAndScrollBars.init();
		},

		transferVerticalToHorizontalScroll : function(scrollAmount){
			$(window).mousewheel(function(event, delta) {
				PipelineDoc.lightBox.hide();
				event.preventDefault();
				var scroll = $(window).scrollLeft();
				$(window).scrollLeft(scroll - (delta * scrollAmount));
			});
		},

		autoScrollToShow : function(jObject){

			var halfDisplay = $(window).width()/2;
			var boxPositionLeft = parseInt( jObject.css('left').replace('px', ''), 10);
			var boxWidth = parseInt( jObject.css('width').replace('px', ''), 10);
			var positionToReset = boxPositionLeft - halfDisplay + ( boxWidth / 2 );

			if( boxPositionLeft > $(window).scrollLeft() ){
				$('html, body').stop().animate({
				    scrollLeft : positionToReset
				}, 500);
			}

			if( boxPositionLeft <= $(window).scrollLeft() ){
				$('html, body').stop().animate({
				    scrollLeft : positionToReset
				}, 500);
			}

		},

		autoHideMouseAndScrollBars : {

			init : function(){

				var mouseTimeOut = new Object();

				$(document).on('mousemove', function(){
					clearTimeout(mouseTimeOut);
					$('body')
						.css('cursor', 'default')
						.css('overflowX', 'auto');

					$('.apDiv')
						.css('cursor', 'pointer')
						.removeClass('apDivInactive');

					$( '#mainItens' ).tooltip( "enable" );

					mouseTimeOut = setTimeout(function(){

						$('body')
							.css('cursor', 'none')
							.css('overflowX', 'hidden');

						$('.apDiv')
							.css('cursor', 'none')
							.addClass('apDivInactive');

						$( '#mainItens' ).tooltip( "disable" );

					}, 1000);
				});
			}

		}
	},

	keyControl : {

		init : function(){

			$(document).keydown(function(event) {

				if ( event.which === 38 ) {
					$('#apDiv' + PipelineDoc.config.actualId ).trigger('click', { 'from' : 'key38' });
					event.preventDefault();
				}

				if ( event.which === 40 ) {
					$('#overmaskCloseButton').trigger('click');
					event.preventDefault();
				}


				if ( event.which === 39 ) {

					PipelineDoc.config.actualId = PipelineDoc.config.actualId <= PipelineDoc.config.totalNumberOfBoxes ? PipelineDoc.config.actualId + 1 : PipelineDoc.config.actualId;

					$('#overmaskCloseButton').trigger('click');

					setTimeout(function(){
						$('#apDiv' + PipelineDoc.config.actualId ).trigger('click', { 'from' : 'key39' });
					}, 200);

					PipelineDoc.horizontalScrollin.autoScrollToShow( $('#apDiv' + PipelineDoc.config.actualId ) );

					event.preventDefault();
				}

				if ( event.which === 37 ) {
					PipelineDoc.config.actualId = PipelineDoc.config.actualId > 1 ? PipelineDoc.config.actualId-1 : PipelineDoc.config.actualId;
					$('#overmaskCloseButton').trigger('click');
					setTimeout(function(){
						$('#apDiv' + PipelineDoc.config.actualId ).trigger('click', { 'from' : 'key37' });
					}, 200);

					PipelineDoc.horizontalScrollin.autoScrollToShow( $('#apDiv' + PipelineDoc.config.actualId ) );

					event.preventDefault();
				}

			});

		}
	},

	tooltip : {
		init : function(){
			$( '#mainItens' ).tooltip();
		}
	}

};

$(document).ready(function(){
	var config = { 'idToStart' : 0 };
	PipelineDoc.init(config);
});