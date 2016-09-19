BlueViewApp.directive('wordsCloud', function () {

  return {
         restrict: 'AE',
         replace: true,
         template: '<div id="chart"></div>',
         require: '^ngModel',
         scope: {
            ngModel: '='
         },
         link: function (scope, element, attrs,ngModel) {

          var fill = d3.scale.category20();

          scope.$watch("ngModel", function(data){
            var layout = d3.layout.cloud()
              .size([490, 290])
              .words(data)
              .padding(1)
              .rotate(function() { return ~~(Math.random() * 2) * 90; })
              .font("Impact")
              .fontSize(function(d) { return d.size; })
              .on("end", draw);

              function draw(words) {
                d3.select("#chart").append("svg")
                    .attr("width", layout.size()[0])
                    .attr("height", layout.size()[1])
                  .append("g")
                    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                  .selectAll("text")
                    .data(words)
                  .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) { return fill(i); })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) { return d.text; });
              }
              layout.start();
          });
         } 
      };
});