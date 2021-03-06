/**
 * @fileoverview Utilities for drawing geometrical objects to Surfaces. If you want to put images on
 * the screen see [gamejs.image](../image).
 *
 * ### Colors
 * There are several ways to specify colors. Whenever the docs says "valid #RGB string"
 * you can pass in any of those formats:
 *     "#ff00ff"
 *     "rgb(255, 0, 255)"
 *     "rgba(255,0, 255, 1)"
 */

// FIXME all draw functions must return a minimal rect containing the drawn shape

/**
 * @param {gamejs.Surface} surface the Surface to draw on
 * @param {String} a valid #RGB string, e.g., "#ff0000"
 * @param {Number[]} startPos x and y position of line start
 * @param {Number[]} endPos x and y position of line end
 * @param {Number} width of the line, defaults to 1
 */
exports.line = function(surface, color, startPos, endPos, width) {
   var ctx = surface.context;
   ctx.save();
   ctx.beginPath();
   ctx.strokeStyle = color;
   ctx.lineWidth = width || 1;
   ctx.moveTo(startPos[0], startPos[1]);
   ctx.lineTo(endPos[0], endPos[1]);
   ctx.stroke();
   ctx.restore();
   return;
};

/**
 * Draw connected lines. Use this instead of indiviudal line() calls for
 * better performance
 * @param {gamejs.Surface} surface the Surface to draw on
 * @param {String} color a valid #RGB string, "#ff0000"
 * @param {Boolean} closed if true the last and first point are connected
 * @param {Number[]} pointlist holding [x,y] arrays of points
 * @param {Number} width width of the lines, defaults to 1
 */
exports.lines = function(surface, color, closed, pointlist, width) {
   var closed = closed || false;
   var ctx = surface.context;
   ctx.save();
   ctx.beginPath();
   ctx.strokeStyle = ctx.fillStyle = color;
   ctx.lineWidth = width || 1;
   for (var i=0;i<pointlist.length;i++) {
      var point = pointlist[i];
      if (i === 0) {
         ctx.moveTo(point[0], point[1]);
      } else {
         ctx.lineTo(point[0], point[1]);
      }
   }
   if (closed) {
      ctx.lineTo(pointlist[0][0], pointlist[0][1]);
   }
   ctx.stroke();
   ctx.restore();
   return;
};

/**
 * Draw a circle on Surface
 * @param {gamejs.Surface} surface the Surface to draw on
 * @param {String} color a valid #RGB String, #ff00cc
 * @param {Number[]|Rect} pos x and y position of the circle center; Rect: top/left position is used
 * @param {Number} radious of the circle
 * @param {Number} width width of the circle, if not given or 0 the circle is filled
 */
exports.circle = function(surface, color, pos, radius, width) {
   if (!radius) throw new Error('[circle] radius required argument');
   if (!pos || !typeof(pos) === 'array') throw new Error('[circle] pos must be given & array' + pos);

   var ctx = surface.context;
   ctx.save();
   ctx.beginPath();
   ctx.strokeStyle = ctx.fillStyle = color;
   ctx.lineWidth = width || 1;
   ctx.arc(pos[0], pos[1], radius, 0, 2*Math.PI, true);
   if (width === undefined || width === 0) {
      ctx.fill();
   } else {
      ctx.stroke();
   }
   ctx.restore();
   return;
};

/**
 * @param {gamejs.Surface} surface the Surface to draw on
 * @param {String} color a valid #RGB String, #ff00cc
 * @param {gamejs.Rect} rect the position and dimension attributes of this Rect will be used
 * @param {Number} width the width of line drawing the Rect, if 0 or not given the Rect is filled.
 */
exports.rect = function(surface, color, rect, width) {
   var ctx =surface.context;
   ctx.save();
   ctx.strokeStyle = ctx.fillStyle = color;
   if (width === undefined || width === 0) {
      ctx.fillRect(rect.left, rect.top, rect.width, rect.height);
   } else {
      ctx.strokeRect(rect.left, rect.top, rect.width, rect.height);
   }
   ctx.restore();
};

exports.arc= function(surface, color, rect, startAngle, stopAngle, width) {
   var ctx = surface.context;
   ctx.save();
   ctx.strokeStyle = ctx.fillStyle = color;
   ctx.arc(rect.center[0], rect.center[1],
            rect.width/2,
            startAngle * (Math.PI/180), stopAngle * (Math.PI/180), false
         );
   if (width === undefined || width === 0) {
      ctx.fill();
   } else {
      ctx.stroke();
   }
   ctx.restore();
}
