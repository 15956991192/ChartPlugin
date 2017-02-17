 (function( $ ) {
 
    $.fn.chartCircle = function(options) {
        var settings = $.extend({
            // These are the defaults.
            foregroundColor: "#556b2f",
            backgroundColor: "#eee",
            fillColor: false,
            width: 15,
            dimension: 200,
            fontsize: 15,
			percent: 50,
            animationStep: 1.0
        }, options );
         return this.each(function() {
			 console.log(settings);
                var dimension = '';
                var text = '';
				var info = '';
                var width = '';
                var size = 0;
				var percent = 0;
				var endPercent = 100;
				var fgcolor = '';
				var bgcolor = '';
				var icon = '';
                var animationstep = 0.0;
    
                $(this).addClass('circliful');
			        dimension = settings.dimension;
			 		width = settings.width;
                    size = settings.fontsize;
			 		percent = settings.percent / 100;
			 		endPercent=settings.percent;
                    fgcolor = settings.fgcolor;
                    bgcolor = settings.bgcolor;
			 		animationstep = settings.animationStep;
                if(settings.text != undefined) {
                    text = settings.text;
					
					if(settings.icon!= undefined) {
						icon = '<i class="fa ' + settings.icon + '"></i>';
					}
					
					 if(settings.type != undefined) {
						type = settings.type;
					
						if(type == 'half') {
							$(this).append('<span class="circle-text-half">' +  icon  + text + '</span>');
							$(this).find('.circle-text-half').css({'line-height': (dimension / 1.45) + 'px', 'font-size' : size + 'px' });
						} else {
							$(this).append('<span class="circle-text">' + icon + text + '</span>');
							$(this).find('.circle-text').css({'line-height': dimension + 'px', 'font-size' : size + 'px' });
						}
					} else {
						$(this).append('<span class="circle-text">' + icon + text + '</span>');
						$(this).find('.circle-text').css({'line-height': dimension + 'px', 'font-size' : size + 'px' });
					}
                } else if(settings.icon != undefined) {
				
				}
				
				if(settings.info != undefined) {
                    info = settings.info;
					
					if(settings.type != undefined) {
						type = settings.type;
					
						if(type == 'half') { 
							$(this).append('<span class="circle-info-half">' + info + '</span>');
							$(this).find('.circle-info-half').css({'line-height': (dimension * 0.9) + 'px', });
						} else {
							$(this).append('<span class="circle-info">' + info + '</span>');
							$(this).find('.circle-info').css({'line-height': (dimension * 1.25) + 'px', });
						}
					} else {
						$(this).append('<span class="circle-info">' + info + '</span>');
						$(this).find('.circle-info').css({'line-height': (dimension * 1.25) + 'px', });
					}
                }
    
                $(this).width(dimension + 'px');
				
              var canvas = $('<canvas></canvas>').attr({ width: dimension, height: dimension }).appendTo($(this)).get(0);
              var context = canvas.getContext('2d');
              var x = canvas.width / 2;
              var y = canvas.height / 2;
			  var degrees = percent * 360.0;
			  var radians = degrees * (Math.PI / 180);
              var radius = canvas.width / 2.5;
              var startAngle = 2.3 * Math.PI;
              var endAngle = 0;
              var counterClockwise = false;
              var curPerc = animationstep === 0.0 ? endPercent : 0.0;
              var curStep = Math.max(animationstep, 0.0);
			  var circ = Math.PI * 2;
			  var quart = Math.PI / 2;
			  var type = '';
			  
			  if(settings.type != undefined) {
                    type = settings.type;
					
					if(type == 'half') {
						var startAngle = 2.0 * Math.PI;
						var endAngle = 3.13;
						var circ = Math.PI * 1.0;
						var quart = Math.PI / 0.996;
					}
                }


					fill = settings.fillColor;

			  //animate foreground circle
			  function animate(current) {
				context.clearRect(0, 0, canvas.width, canvas.height);
				 
				context.beginPath();
				context.arc(x, y, radius, endAngle, startAngle, false);
				context.lineWidth = width - 1;
		
				// line color
				context.strokeStyle = bgcolor;
				context.stroke();

				if(fill) {
					context.fillStyle = fill;
					context.fill();
				}
				 
				context.beginPath();
				context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
				context.lineWidth = width;
				// line color
				context.strokeStyle = fgcolor;
				context.stroke();

				if (curPerc < endPercent) {
  				     curPerc += curStep;
					 requestAnimationFrame(function () {
						 animate(Math.min(curPerc, endPercent) / 100);
					 });
				}
				
			 }

			 animate(curPerc / 100);


        });
 
    };
 
}( jQuery ));
