/// <reference path='_all.ts' />

module exercises {



  export function animateRubber(): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).on("click", function() {
          $(this).addClass('remove-btn-animate').delay(200).queue(function(next: any) {
            $(this).removeClass('remove-btn-animate');
            next();
          });
        });
      }
    }
  };

  export function animateButton(): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).on("click", function() {
          $(this).addClass('nav-btn-animate').delay(200).queue(function(next: any) {
            $(this).removeClass('nav-btn-animate');
            next();
          });
        });
      }
    }
  };

  export function draggableObject($rootScope: any): ng.IDirective {
    return {
      link: ($scope: any, element: JQuery, attr: any) => {

        if ($scope.object.isDisabled) {
          return
        }

        var hideObject = function() {
          $scope.object.isDropped = false;
          $scope.object.isDisplayed = false;
          $(element).css($scope.object.getInitPlace());
        };

        $rootScope.$on('rubber.remove', (event: any, args: any) => {
          if (args.objectId == $scope.object.objectId) {
            hideObject();
          }
        })

        $(element).draggable({
          revert: "invalid",
          stop: function(event, ui) {
            $scope.object.setLargePosition($(this).position().top, $(this).position().left);
            $scope.object.setSmallPosition($(this).position().top / 3.67, $(this).position().left / 3.67);

            if (ui.helper.data('dropped-target') == true && $scope.object.isDropped != true) {
              $scope.object.isDropped = true;
              $(this).animate({
                height: attr.originalHeight
              }, 200);

              $rootScope.$emit('dropped', {
                objectId: $scope.object.objectId,
                parentId: $scope.object.parentId
              });
            }
            else if (ui.helper.data('dropped-origin') == true) {
              ui.helper.data('dropped-target', false);
              ui.helper.data('dropped-origin', false);
              hideObject();
            }
          }
        });

        // On Click event
        $(element).on("click", function() {
          if ($scope.object.isDropped == true) {
            hideObject();
          }
          else {
            $scope.object.isDropped = true;
            $(this).animate({
              height: attr.originalHeight,
              top: $scope.object.largePositionTop,
              left: $scope.object.largePositionLeft
            }, 200);
          }
          $rootScope.$emit('dropped', {
            objectId: $scope.object.objectId,
            parentId: $scope.object.parentId
          });
        });

      }
    }
  };

  draggableObject.$inject = ['$rootScope'];

  export function droppableObject(): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).droppable({
          drop: function(event, ui) {
            if (ui.draggable.data('dropped-target') != true) {
              ui.draggable.data('dropped-target', true);
              ui.draggable.data('already-dropped', false);
              ui.draggable.data('dropped-origin', false);
            }
          }
        });
      }
    }
  };

  export function droppableOrigin(): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).droppable({
          drop: function(event, ui) {
            ui.draggable.data('dropped-origin', true);
            ui.draggable.data('dropped-target', false);
          }
        });
      }
    }
  };

  // draggable directive for exercise 3
  export function draggableBall(): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).css({ cursor: 'pointer' });
        $(element).draggable({
          revert: "invalid",
          start: function(event, ui) {
            ui.helper.data('originalPosition', ui.position);
            ui.helper.data('iWasDroppedHere', ui.helper.data('iAmDroppedHere'));

            $(element).css({ boxShadow: "0px 3px 4px 1px rgba(0,0,0,0.50)" });
          },
          stop: function(event, ui) {
            if (ui.helper.data('iWasDroppedHere') != undefined &&
              ui.helper.data('iAmDroppedHere').attr('ball-value') != ui.helper.data('iWasDroppedHere').attr('ball-value')) {
              ui.helper.data('iWasDroppedHere').data('droppedBall', null);

              if (ui.helper.data('iAmDroppedHere').attr('ball-value') == '-99'){
                ui.helper.data('iAmDroppedHere', null);
                $(element).css({top:'364px', left: '561px'});
              }
            }
            if (ui.helper.data('iAmDroppedHere') != undefined && ui.helper.data('iAmDroppedHere').attr('ball-value') != '-99') {
              $(element).css({ boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)" });
            }
          }
        });
      }
    }
  };

  // droppable directive for exercise 3
  export function droppableBall($rootScope: any): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).droppable({
          accept: (draggable: any) => {
            if ($(element).data('droppedBall') != undefined && $(element).data('droppedBall') != $(draggable).attr('ball-value')) {
              return false;
            } else {
              return true;
            }
          },
          drop: function(event, ui) {
            $(element).data('droppedBall', $(ui.draggable).attr('ball-value'));
            ui.draggable.data('iAmDroppedHere', $(element));
            ui.draggable.css({top: $(element).position().top + "px", left: $(element).position().left + "px"});

            $rootScope.$emit('ball.dropped', {
              dropped: $(ui.draggable).attr('ball-value'),
              destination: attributes.ballValue,
              draggable: ui.draggable
            })
          }
        });
      }
    }
  };

  droppableBall.$inject = ['$rootScope'];

  // EXE3 droppable original place for the balls
  export function droppableBallContainer($rootScope: any): ng.IDirective {
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        $(element).droppable({
          accept: (draggable: any) => {
            if (draggable.data('iAmDroppedHere') == undefined) {
              return false;
            } else {
              return true;
            }
          },
          drop: (event: any, ui: any) => {
            ui.draggable.data('iAmDroppedHere', $(element));

            ui.draggable.css({ boxShadow: "0px 3px 4px 1px rgba(0,0,0,0.50)" });
            $rootScope.$emit('ball.removed', {
              removedBall: $(ui.draggable).attr('ball-value')
            });
          }
        })
      }
    };
  }
  droppableBallContainer.$inject = ['$rootScope'];



  export function focusIf($timeout:any) {
      function link($scope:any, $element:any, $attrs:any) {
          var dom = $element[0];
          if ($attrs.focusIf) {
              $scope.$watch($attrs.focusIf, focus);
          } else {
              focus(true);
          }
          function focus(condition:any) {
              if (condition) {
                  $timeout(function() {
                      dom.focus();
                  }, $scope.$eval($attrs.focusDelay) || 0);
              }
          }
      }
      return {
          restrict: 'A',
          link: link
      };
  }
  focusIf.$inject = ['$timeout'];



  export function getRotationDegrees(obj :any) {
      var matrix = obj.css("-webkit-transform") ||
      obj.css("-moz-transform")    ||
      obj.css("-ms-transform")     ||
      obj.css("-o-transform")      ||
      obj.css("transform");
      if(matrix !== 'none') {
          var values = matrix.split('(')[1].split(')')[0].split(',');
          var a = values[0];
          var b = values[1];
          var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
      } else { var angle = 0; }
      return (angle < 0) ? angle + 360 : angle;
  }

}
